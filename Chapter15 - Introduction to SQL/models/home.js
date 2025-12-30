// Core Modules
const db = require("../utils/databaseUtil");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    this.id = id;
  }


  save() {
    if (this.id) { // update
      //db.execute will return a promise to the caller and the caller can use then and catch to handle the result or error
      // we are using parameterized query to prevent sql injection attacks
      //this promise will resolve when the query is executed successfully and will reject if there is any error it is being called in the controller
      return db.execute('UPDATE homes SET houseName=?, price=?, location=?, rating=?, photoUrl=?, description=? WHERE id=?', [this.houseName, this.price, this.location, this.rating, this.photoUrl, this.description, this.id]);

    } else { // insert
      return db.execute('INSERT INTO homes (houseName, price, location, rating, photoUrl, description) VALUES (?, ?, ?, ?, ?, ?)', [this.houseName, this.price, this.location, this.rating, this.photoUrl, this.description]);
    }
  }

  static fetchAll() {
    return db.execute('SELECT * FROM homes');
  }

  static findById(homeId) {
    return db.execute('SELECT * FROM homes WHERE id=?', [homeId]);
  }

  static deleteById(homeId) {
    return db.execute('DELETE FROM homes WHERE id=?', [homeId]);
  }
};
