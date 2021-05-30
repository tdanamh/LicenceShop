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
    required: true,
    default: true
  },
  privateBathroom: {
    type: Boolean,
    required: true,
    default: true
  },
  airConditioning: {
    type: Boolean,
    required: true,
    default: true
  },
  freeParking: {
    type: Boolean,
    required: true,
    default: true
  },
  breakfastIncluded: {
    type: Boolean,
    required: true,
    default: true
  },
  petsAllowed: {
    type: Boolean,
    required: true,
    default: true
  },
  distanceFromCenter: {
    type: Number,
    required: true
  },
  imagesPaths: [{
    type: String,
    required: false,
    default: ""
  }]
});
module.exports = Property = mongoose.model("property", PropertiesSchema);