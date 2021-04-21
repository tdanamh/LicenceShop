const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UsersSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: false
  }
});
module.exports = User = mongoose.model("user", UsersSchema);