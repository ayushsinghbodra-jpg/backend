// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const Favourite = require("./favourite");

const homeDataPath = path.join(rootDir, "data", "homes.json");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    Home.fetchAll((registeredHomes) => {
      if (this.id) { // edit home case
        //map function will create a new array with updated home
        registeredHomes = registeredHomes.map(home => 
          home.id === this.id ? this : home);
      } else { // add home case
        // create a random id for new home
        this.id = Math.random().toString();
        registeredHomes.push(this);
      }
      //file was written asynchronously
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
        console.log("File Writing Concluded", error);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(homeDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  
  //not used in this example but useful for future reference
  static findById(homeId, callback) {
    this.fetchAll(homes => {
      const homeFound = homes.find(home => home.id === homeId);
      callback(homeFound);
    })
  }

  static deleteById(homeId, callback) {
    this.fetchAll(homes => {
      //filter function will create a new array without deleted home
      //it will keep all the  home for which the condition is true
      homes = homes.filter(home => home.id !== homeId);
      //this will overwrite the homes.json file means all the files rewritten except deleted home
      fs.writeFile(homeDataPath, JSON.stringify(homes), error => {
        console.log("Home Deleted", error);
        //we are using Favourite model to delete the home from favourite list as well
        Favourite.deleteById(homeId, callback);
      });
    })
  }
};
