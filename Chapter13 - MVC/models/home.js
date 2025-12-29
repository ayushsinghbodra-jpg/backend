// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

//we are using class here to create Home objects and save them to homes.json file and also fetch all the homes from the homes.json file


// making class is like telling that i'm creatinbg a blueprint of an object which will have certain properties and methods through constructor and other methods
module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    //this keyword is used to refer to the current object being created
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }


  //save function is used to save the home object to homes.json file
  save() {
    //fetchAll method is called to get the existing homes from the homes.json file
    //create a function registeredHomes which will be called when the fetchAll method is done fetching the homes from the homes.json file and then we will push the current home object to the registeredHomes array and then write the updated array back to the homes.json file 
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
      const homeDataPath = path.join(rootDir, "data", "homes.json");
      //in this writeFile there are 3 parameters first is the path of the file to be written second is the data to be written and third is the callback function which will be called when the file writing is done
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
        console.log("File Writing Concluded", error);
      });
    });
  }

  //fetchAll function is used to fetch all the homes from homes.json file
  //and it should be static bescause we are calling it without creating an object of the Home class whereas in case of save method we are calling it on the object of the Home class
  static fetchAll(callback) {
    //homeDataPath is the path to the homes.json file
    const homeDataPath = path.join(rootDir, "data", "homes.json");
    //read the homes.json fileand send the parsed data to the callback function
    fs.readFile(homeDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
};
