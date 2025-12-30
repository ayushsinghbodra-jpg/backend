const Home = require("../models/home");


//getAddHome will render the edit-home ejs template with editing set to false
//editing is used to determine whether we are adding a new home or editing an existing home if editing is false we are adding a new home and if it is true we are editing an existing home
//
exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
  });
};

exports.getEditHome = (req, res, next) => {
  console.log("Came to edit home",req.params);
  console.log("Query query", req.query);
  console.log("Editing mode:", req.query.editing);
  console.log("Req", req);
  //req.params is used to get the dynamic parameters from the url
  //in this dynamic parameter homeId is defined in the route /host/edit-home/:homeId
  const homeId = req.params.homeId;
  //req.query is used to get the query parameters from the url
  const editing = req.query.editing === 'true';

  //difference between dynaminc parameters and query parameters
  //dynamic parameters are part of the url and are defined in the route like /host/edit-home/:homeId
  //query parameters are added to the url after the ? symbol and are not defined in the route like /host/edit-home/1?editing=true


  //findById is prsently being called from the Home model it will return a promise
  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];
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
  Home.fetchAll().then(([registeredHomes]) => {
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
  home.save();

  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl, description } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl, description, id);
  home.save();
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