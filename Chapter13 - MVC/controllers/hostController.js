//The difference betweeen hostController and storeController is that hostController handles the requests related to the host like adding a home and viewing the list of homes added by the host whereas storeController handles the requests related to the store like viewing the list of products and adding a product to the cart

const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    })
  );
};

exports.postAddHome = (req, res, next) => {
  //req.body contains data submitted via a POST form.
  //Destructuring extracts the individual fields (houseName, price, etc.) from the request
  const { houseName, price, location, rating, photoUrl } = req.body;
  //Home is a model class representing a home.
  // Creates a new home instance with the data submitted from the form.
  const home = new Home(houseName, price, location, rating, photoUrl);
  //Calls the save method in the Home class.
  //save writes the new home into homes.json so it is persisted on the server.
  home.save();

  res.render("host/home-added", {
    pageTitle: "Home Added Successfully",
    currentPage: "homeAdded",
  });
};
