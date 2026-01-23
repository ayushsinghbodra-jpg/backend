//here we are going to handle login and logout 
//the exports object is used to define functions that can be used in other files and getLogin is imported from authRouter.js
//this get function renders the login page when a GET request is made to the /login route
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false
  });
};

exports.postLogin = (req, res, next) => {
  console.log(req.body);
  req.session.isLoggedIn = true;
  //res.cookie("isLoggedIn", true);
  //req.isLoggedIn = true;
  res.redirect("/");
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  })
}
