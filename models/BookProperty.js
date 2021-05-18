const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BookPropertySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  }
});
module.exports = BookProperty = mongoose.model("bookProperty", BookPropertySchema);
