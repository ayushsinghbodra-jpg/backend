//the check, validationResult are imported from express-validator to do validation
//this module contains all the auth related controllers like getLogin, getSignup, postLogin, postSignup, postLogout
//we are using bcryptjs to hash the password before saving to database and to compare the password during login
//bcryptjs is a library to hash and compare passwords securely in Node.js applications.
const { check, validationResult } = require("express-validator");
//importing User model to interact with users collection in mongoDB
const User = require("../models/user");
//the bcrypt module provides functions to hash passwords and compare hashed passwords
const bcrypt = require("bcryptjs");

//
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    //we are normally setting isLoggedIn to false because if user is trying to access login page then he is not logged in
    isLoggedIn: false,
    //errors array will contain the validation errors if any and then later used by ejs template to show the errors to userto show the errors to user
    errors: [],
    //oldInput object will contain the previous input values entered by user to show them again in case of validation errors
    oldInput: {email: ""},
    //Similarly user object will be empty because user is not logged in which will be used by ejs template to show user details if logged in
    user: {},
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    currentPage: "signup",
    isLoggedIn: false,
    errors: [],
    oldInput: {firstName: "", lastName: "", email: "", userType: ""},
    user: {},
  });
};

//we are writing this entire post req in [] to use array of middlewares for validation because if you will use{} then it will consider only single middleware function
exports.postSignup = [
  //check functions are used to validate the input fields
  check("firstName")
  //trim is used to remove extra spaces from start and end of the string
  .trim()
  //isLength is used to check the length of the string
  .isLength({min: 2})
  //withMessage is used to set the error message if validation fails
  .withMessage("First Name should be atleast 2 characters long")
  //matches is used to check the string against a regex pattern
  .matches(/^[A-Za-z\s]+$/)
  //withMessage is used to set the error message if validation fails
  .withMessage("First Name should contain only alphabets"),
  //after this midddleware next middleware will be called in the array by express itself
  check("lastName")
  .matches(/^[A-Za-z\s]*$/)
  .withMessage("Last Name should contain only alphabets"),

  check("email")
  //isEmail is used to check if the string is a valid email format which should contain a format likelocal-part@domain.extension , this is basic validation for email format
  .isEmail()
  //after isEmailit is .withMessage which will set the error message if validation fails if it is correct then it will move to next middleware in the array
  //withMessage is used to set the error message if validation fails
  .withMessage("Please enter a valid email")
  //normalizeEmail is used to normalize the email address by removing dots, converting to lowercase etc.
  .normalizeEmail(),

  check("password")
  .isLength({min: 8})
  .withMessage("Password should be atleast 8 characters long")
  .matches(/[A-Z]/)
  .withMessage("Password should contain atleast one uppercase letter")
  .matches(/[a-z]/)
  .withMessage("Password should contain atleast one lowercase letter")
  .matches(/[0-9]/)
  .withMessage("Password should contain atleast one number")
  .matches(/[!@&]/)
  .withMessage("Password should contain atleast one special character")
  .trim(),

  check("confirmPassword")
  .trim()
  //.custom is used to define custom validation logic it is given two parameters value and {req} object which contains the entire request object
  //value is the value of the confirmPassword field
  //{req} is destructured from the second parameter to access the request object
  .custom((value, {req}) => {
    //this is like the value that we recived from confirmPassword field should be same as password field otherwise throw error
    if (value !== req.body.password) {
      //throw new Error is used to throw custom error message if validation fails
      //we are using new in this because Error is a built-in class in JavaScript
      throw new Error("Passwords do not match");
    }
    //if validation is successful
    return true;
  }),

  check("userType")
  .notEmpty()
  .withMessage("Please select a user type")
  //isIn is used to check if the value is in the given array
  .isIn(['guest', 'host'])
  .withMessage("Invalid user type"),

  check("terms")
  .notEmpty()
  .withMessage("Please accept the terms and conditions")
  //this will check that the value of terms checkbox is "on" which means it is checked
  .custom((value, {req}) => {
    if (value !== "on") {
      throw new Error("Please accept the terms and conditions");
    }
    return true;
  }),
  
//the value that are we giving everytime is getting its required data from req.body object which is coming from the form submission
//after all the validation middlewares are executed this final middleware will be called to check for validation errors and to save the user to database if there are no errors
  (req, res, next) => {
    //destructuring the req.body to get the input values
    const {firstName, lastName, email, password, userType} = req.body;
    //validationResult(req) is used to get the validation errors from the request object.
    //validationResult is a function from express-validator which will check the request object for any validation errors that were set by the previous check() middlewares.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        currentPage: "signup",
        isLoggedIn: false,
        //errors array will contain the validation errors if any and then later used by ejs template to show the errors to userto show the errors to user
        //we are mapping the errors array to get only the error messages from the array of error objects

        //errors.array() will give array of error objects like [{msg: "error message 1"}, {msg: "error message 2"}]
        //.map(err => err.msg) will give array of error messages like ["error message 1", "error message 2"]
        errors: errors.array().map(err => err.msg),
        oldInput: {firstName, lastName, email, password, userType},
        user: {},
      });
    }

    bcrypt.hash(password, 12)
    .then(hashedPassword => {
      const user = new User({firstName, lastName, email, password: hashedPassword, userType});
      return user.save();
    })
    .then(() => {
      res.redirect("/login");
    }).catch(err => {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        currentPage: "signup",
        isLoggedIn: false,
        errors: [err.message],
        oldInput: {firstName, lastName, email, userType},
        user: {},
      });
    });
  }
]

//above we created an array of middlewares for postSignup route because we needed to do validation using express-validator
//first we defined all the validation rules using check() function and then in the last middleware we checked for validation errors using validationResult() function
//if there are errors we re-rendered the signup page with error messages and old input values
//if there are no errors we hashed the password using bcrypt and saved the user to database

//they all will be called in sequence for the postSignup route and they will call next() to move to the next middleware in the array
//they are beinng called in the order they are defined in the array by express itself when a request is made to the postSignup route


exports.postLogin = async (req, res, next) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if (!user) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
      errors: ["User does not exist"],
      oldInput: {email},
      user: {},
    });
  }
  
  //await is used to wait for the promise to resolve and get the result
  //bycrypt.compare is used to compare the plain text password with the hashed password stored in database from user object
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    //aftter sending you to login page it will set the status to 422 unprocessable entity which means the request was well formed but there was a semantic error in the request like invalid password all the things in {} are used to re render the login page with old input values and error messages
    return res.status(422).render("auth/login", {
      pageTitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
      errors: ["Invalid Password"],
      oldInput: {email},
      user: {},
    });
  }

  //if user is found and password matches then we will create a session for the user
  req.session.isLoggedIn = true;
  //it will store the user object in the session so that we can access it later
  req.session.user = user;
  await req.session.save();

  res.redirect("/");
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  })
}
