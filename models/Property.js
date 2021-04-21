const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PropertiesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  pricePerNight: {
    type: Number,
    required: true
  },
  adultsNumber: {
    type: Number,
    required: true
  },
  roomsNumber: {
    type:Number,
    required: true
  },
  dimmension: {
    type: Number,
    required: true
  },
  balcony: {
    type: Boolean,
    required: true
  },
  privateBathroom: {
    type: Boolean,
    required: true
  },
  airConditioning: {
    type: Boolean,
    required: true
  },
  freeParking: {
    type: Boolean,
    required: true
  },
  breakfastIncluded: {
    type: Boolean,
    required: true
  },
  petsAllowed: {
    type: Boolean,
    required: true
  },
  distanceFromCenter: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  imagesPaths: [{
    type: String,
    required: false
  }]
});
module.exports = Property = mongoose.model("property", PropertiesSchema);