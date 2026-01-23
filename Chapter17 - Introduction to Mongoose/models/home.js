const mongoose = require('mongoose');
const favourite = require('./favourite');

// Define the schema for the Home model so that Mongoose knows how to structure Home documents in MongoDB
//After all the task will be to export the model based on this schema
const homeSchema = mongoose.Schema({
  houseName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  photoUrl: String,
  description: String,
});

// homeSchema.pre(...)
// → Registers a pre middleware (hook) on the homeSchema.

// 'findOneAndDelete'
// → This hook runs BEFORE Home.findOneAndDelete() is executed.

// async function(next)
// → The function is:

// async → so we can use await

// next → a callback that tells Mongoose “I’m done, continue now”
homeSchema.pre('findOneAndDelete', async function(next) {
  console.log('Came to pre hook while deleting a home');
  const homeId = this.getQuery()._id;
  await favourite.deleteMany({houseId: homeId});
  next();
});
//there is a need for async nexx in the above function because  the middleware needs to wait for the asynchronous operation of deleting related favourites to complete before proceeding with the deletion of the home itself. By using async, we can utilize await to pause the execution of the middleware until the deleteMany operation is finished. The next callback is then called to signal that the middleware has completed its task and Mongoose can continue with the original findOneAndDelete operation. Without calling next, Mongoose would not know when to proceed, potentially leading to hanging operations or incomplete deletions.
module.exports = mongoose.model('Home', homeSchema);
