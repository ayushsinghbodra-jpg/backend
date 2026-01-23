const Favourite = require("../models/favourite");
const Home = require("../models/home");


//we need this to 
exports.getIndex = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

exports.getFavouriteList = (req, res, next) => {
  //fetch all the favourites first then fetch all the homes and filter the homes based on the favourites.
  Favourite.getFavourites().then(favourites => {
    //map will return a new array containing only the houseId from the favourites array of objects.
    favourites = favourites.map(fav => fav.houseId);
    //howe.fetchAll will return all the homes from the homes collection.
    Home.fetchAll().then(registeredHomes => {
      console.log(favourites, registeredHomes);
      //this will filter the homes based on the favourites array that we got earlier.
      const favouriteHomes = registeredHomes.filter((home) =>
        //we need to convert the home._id to string because favourites array contains string values.
        //includes method will return true if the home._id is present in the favourites array.
        favourites.includes(home._id.toString())
      );
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      });
    });
  });
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;
  const fav = new Favourite(homeId);
  //savemethod will handle both insert and update operation based on the presence of the id.
  //and then  the then block will be executed after the save operation is completed.
  fav.save().then(result => {
    console.log('Fav added: ', result);
    //catch block will handle any error that occurs during the save operation.
  }).catch(err => {
    console.log("Error while marking favourite: ", err);
    //finally block will be executed after the then or catch block is executed.
  }).finally(() => {
    res.redirect("/favourites");
  })
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId).then(result => {
    console.log('Fav Removed: ', result);
  }).catch(err => {
    console.log("Error while removing favourite: ", err);
  }).finally(() => {
    res.redirect("/favourites");
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "Home",
      });
    }
  });
};
