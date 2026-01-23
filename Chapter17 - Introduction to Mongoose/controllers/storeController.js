const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
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
  //.find will fetch all favourite documents from the Favourite collection.
  Favourite.find()
  //.populate('houseId') will replace the houseId field in each favourite document with the actual Home document it references.
  .populate('houseId')
  //.then processes the array of favourite documents retrieved from the database.
  .then((favourites) => {
    const favouriteHomes = favourites.map((fav) => fav.houseId);
    res.render("store/favourite-list", {
      favouriteHomes: favouriteHomes,
      pageTitle: "My Favourites",
      currentPage: "favourites",
    });
  });
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;
  //.findOne is used to check if a favourite document with the specified houseId already exists in the Favourite collection.
  Favourite.findOne({houseId: homeId}).then((fav) => {
    if (fav) { 
      console.log("Already marked as favourite");
    } else {
      fav = new Favourite({houseId: homeId});
      fav.save().then((result) => {
        console.log("Fav added: ", result);
      });
    }
    res.redirect("/favourites");
  }).catch(err => {
    console.log("Error while marking favourite: ", err);
  });
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete({houseId: homeId})
    .then((result) => {
      console.log("Fav Removed: ", result);
    })
    .catch((err) => {
      console.log("Error while removing favourite: ", err);
    })
    .finally(() => {
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
