// Core Module
const path = require('path');

// External Module
const express = require('express');
//Session Module will store the session data in MongoDB
//session means a way to persist user data across multiple requests and responses
//express-session is a middleware that helps in managing sessions in Express applications by creating and handling session cookies for each user 
const session = require('express-session');
//connect-mongodb-session is a MongoDB-backed session store for Express and Connect which works with express-session to store session data in a MongoDB database and the (session) parameter will pass the express-session module to it i.e., it is a function that takes the session module as an argument and returns a MongoDBStore constructor
const MongoDBStore = require('connect-mongodb-session')(session);
//MongoDB connection string
const DB_PATH = "mongodb+srv://root:root@projects.gcju5uc.mongodb.net/?appName=projects"

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter = require("./routes/authRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
//{} we need it in this way because mongoose exports multiple things and default is one of them
const { default: mongoose } = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

//Creating a MongoDBStore instance to store session data in the 'sessions' collection of the specified MongoDB database
const store = new MongoDBStore({
  //uri means the connection string to connect to the MongoDB database
  uri: DB_PATH,
  //collection means the name of the collection where the session data will be stored
  collection: 'sessions'
});

app.use(express.urlencoded());
//session middleware configuration
app.use(session({
  //secret is used to sign the session ID cookie, ensuring its integrity and security
  secret: "KnowledgeGate AI with Complete Coding",
  //resave false means the session will not be saved back to the session store if it was not modified during the request
  resave: false,
  //ssaveUninitialized true means a session that is new but not modified will still be saved to the store
  saveUninitialized: true,
  //store is the session store instance where session data will be stored
  store
}));

app.use((req, res, next) => {
  //making isLoggedIn available in all the routes
  // isLoggedIn will be true if the user is logged in and false otherwise
  req.isLoggedIn = req.session.isLoggedIn
  next();
})

app.use(authRouter)
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

const PORT = 3000;

mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});


//the reason we all need session is that the HTTP protocol is stateless i.e., it does not remember anything between different requests from the same user and if we want to implement features like user authentication, shopping carts, or personalized user experiences, we need a way to remember user-specific data across multiple requests and sessions help us achieve that by storing user data on the server side and associating it with a unique session ID that is sent to the client via cookies.
//In this code, we are using express-session to manage sessions in our Express application and connect-mongodb-session to store session data in a MongoDB database. This allows us to persist user session data across multiple requests and ensures that the session data is stored securely in the database.


//cache are like temporary storage areas where frequently accessed data can be stored for quick retrieval. Caches help improve performance by reducing the need to repeatedly fetch data from slower storage mediums like databases or external APIs. In web applications, caching can be implemented at various levels, including browser caching, server-side caching, and database caching. Common caching strategies include in-memory caching (e.g., using Redis or Memcached), file-based caching, and HTTP caching headers that instruct browsers to cache certain resources. By effectively utilizing caches, applications can reduce latency, decrease server load, and enhance the overall user experience.//Sessions are a way to store data on the server side for individual users against a unique session ID. This session ID is usually stored in a cookie on the client side. Sessions are commonly used to maintain user state and data across multiple requests, such as keeping a user logged in as they navigate through different pages of a website. Unlike cookies, which store data on the client side and have size limitations, sessions can store larger amounts of data securely on the server. Sessions typically expire after a certain period of inactivity or when the user logs out.//In summary, caches are used to temporarily store frequently accessed data for performance optimization, while sessions are used to maintain user-specific data on the server side across multiple requests.//In this code, we are setting up session management in an Express application using the express-session middleware and storing session data in a MongoDB database using connect-mongodb-session. This allows us to maintain user sessions across multiple requests, enabling features like user authentication and personalized experiences.
