//the work of the home.js model is to define the structure and methods for the Home entity in the MongoDB database. It includes methods for saving, fetching, finding by ID, and deleting homes from the database.



const { ObjectId } = require('mongodb');
const { getDB } = require('../utils/databaseUtil');

//here we are exporting the Home class which contains the constructor and methods to interact with the MongoDB database.
module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, _id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    //this is present because when we are updating an existing home, we need to know its _id. or else while creating a new home, we don't have an _id yet.
    if (_id) {
      this._id = _id;
    }
  }


  save() {
    const db = getDB();
    if (this._id) { // update
      const updateFields = {
        houseName: this.houseName,
        price: this.price,
        location: this.location,
        rating: this.rating,
        photoUrl: this.photoUrl,
        description: this.description
      };

      //.updateOne is used to update an existing document in the 'homes' collection. It finds the document by its _id and sets the new values for the specified fields.
      //{_id: new ObjectId(String(this._id))} this part creates a filter to find the document with the matching _id. that is new ObjectId will convert the string representation of the _id back to an ObjectId type. 
      //{$set: updateFields} this part specifies the fields to be updated in the document.
      return db.collection('homes').updateOne({_id: new ObjectId(String(this._id))}, {$set: updateFields});
    } else { // insert
      return db.collection('homes').insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDB();
    return db.collection('homes').find().toArray();
  }

  static findById(homeId) {
    const db = getDB();
    return db.collection('homes').find({_id: new ObjectId(String(homeId))}).next();
  }

  static deleteById(homeId) {
    const db = getDB();
    return db.collection('homes').deleteOne({_id: new ObjectId(String(homeId))});
  }
};

