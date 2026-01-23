const mongoose = require('mongoose');
//this schema defines the structure of user documents in the MongoDB collection
//it includes fields for first name, last name, email, password, user type, and an array of favourite homes
//the favourites field is an array of ObjectIds that reference the Home model, establishing a relationship between users and their favourite homes so that we can easily populate favourite homes when needed 
//this relationshipis necessary for implementing features like adding homes to favourites and retrieving a user's favourite homes because it allows us to link user documents to home documents in the database
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: String,
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  userType: {
    type: String,
    //this enum restricts the userType field to only accept 'guest' or 'host' values
    enum: ['guest', 'host'],
    default: 'guest'
  },
  favourites: [{
    //this field stores references to Home documents that the user has marked as favourites
    //field means each entry in the favourites array is an ObjectId that points to a document in the Home collection
    //mongoose.Schema.Types.ObjectId indicates that the type of each entry is an ObjectId
    //ref: 'Home' tells Mongoose which model to use when populating this field
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Home'
  }]
});

module.exports = mongoose.model('User', userSchema);
