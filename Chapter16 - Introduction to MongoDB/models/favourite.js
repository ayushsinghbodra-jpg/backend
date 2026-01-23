
//the work of the favourite.js model is to define the structure and methods for the Favourite entity in the MongoDB database. It includes methods for saving, fetching, and deleting favourite homes from the database.

//importing a particular feature in utils/databaseUtil.js to get the database connection that is why it is written in {} brackets.
const { getDB } = require("../utils/databaseUtil");

//the Favourite class represents a favourite home entity with methods to save, fetch, and delete favourites in the MongoDB database.
module.exports = class Favourite {
  constructor(houseId) {
    this.houseId = houseId;
  }

  //this will give us the database connection and then we are checking if the favourite home already exists in the database by searching for a document with the same houseId. If it does not exist, we insert a new document representing the favourite home into the favourites collection. If it already exists, we simply return a resolved promise to avoid duplicate entries.
  save() {
    //getting the database connection
    const db = getDB();
    //this will return a promise that resolves when the save operation is complete.
    //.findOne() method is used to check if a fasvourite with the same houseId already exists in the collection.
    return db.collection('favourites').findOne({houseId: this.houseId}).then(existingFav => {
      if (!existingFav) {
        //this will insert a new document representing the favourite home into the favourites collection.
        return db.collection('favourites').insertOne(this);
      }
      //this is where we are going to release the promise without doing anything if the favourite already exists.
      return Promise.resolve();
    })
  }
//this static method fetches all favourite homes from the favourites collection in the database.
  static getFavourites() {
    const db = getDB();
    //db.colllection accesses the favourites collection in the database, .find() retrieves all documents from that collection, and .toArray() converts the result into an array of favourite home objects.
    return db.collection('favourites').find().toArray();
  }

  static deleteById(delHomeId) {
    const db = getDB();
    //.deleteOne() method is used to delete a single document from the favourites collection that matches the specified houseId.
    return db.collection('favourites').deleteOne({houseId: delHomeId});
  }
};
