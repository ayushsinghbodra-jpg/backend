const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
  });
};


exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  //this will check the query parameter in the URL and check if the editing part of the part is true or not . It is strictly checking.
  const editing = req.query.editing === 'true';

  Home.findById(homeId).then(home => {
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }

    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing: editing,
    });
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then(registeredHomes => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    })
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl, description);
  home.save().then(() => {
    console.log('Home Saved successfully');
  });

  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  //htis wil destructure the entire thing that was coming fromm the req.body.
  const { id, houseName, price, location, rating, photoUrl, description } = req.body;
  //this will create an new object containg the data that would be passed to the constructor in the other file.
  const home = new Home(houseName, price, location, rating, photoUrl, description, id);
  home.save().then(result => {
    console.log('Home updated ', result);
  });
  //to redirect the page after updating.
  res.redirect("/host/host-home-list");
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log('Came to delete ', homeId);
  Home.deleteById(homeId).then(() => {
    res.redirect("/host/host-home-list");
  }).catch(error => {
    console.log('Error while deleting ', error);
  })
};