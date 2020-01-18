const mongoose = require("mongoose");

const Schema = mongoose.Schema;

function toLower(str) {
  return str.toLowerCase();
}

const UserSchema = new Schema({
  name: { type: String, required: true, min: 6, max: 255 },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    set: toLower,
    unique: true
  },
  password: { type: String, required: true, min: 6, max: 1024 },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
