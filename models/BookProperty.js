const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BookPropertySchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  propertyId: {
    type: String,
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
