const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HerbSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  goesWith: { type: String, required: false, max: 300 },
  state: { type: String, required: true, max: 20 },
  inStock: {
    type: String,
    required: true,
    enum: ["Auf Lager", "Bestellbar", "Ausverkauft"],
    default: "Bestellbar"
  },
  thumbnail: {
    type: String,
    required: true
  }
});

// Virtual for Herb's URL
HerbSchema.virtual("url").get(function() {
  return "/produkte/gewuerz/" + this._id;
});

//export model
module.exports = mongoose.model("Herb", HerbSchema);
