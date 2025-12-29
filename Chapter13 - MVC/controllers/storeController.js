const Home = require("../models/home");

//getIndex controller to render the home page with the list of registered homes
exports.getIndex = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
  );
};
//fetchAll is a static method of Home class which fetches all the homes from the homes.json file
//the first registerHOmes is the key in the ejs file to access the data and the second registeredHomes is the array fetched from the Home model
exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    })
  );
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  })
};

exports.getFavouriteList = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/favourite-list", {
      registeredHomes: registeredHomes,
      pageTitle: "My Favourites",
      currentPage: "favourites",
    })
  );
};
