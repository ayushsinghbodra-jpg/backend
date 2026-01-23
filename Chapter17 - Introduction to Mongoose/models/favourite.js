const mongoose = require('mongoose');

//this is a seopararte schema for favourite homes.
const favouriteSchema = mongoose.Schema({
  houseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Home',
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Favourite', favouriteSchema);
