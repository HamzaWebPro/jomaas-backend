// Import necessary libraries and modules
const mongoose = require("mongoose");

// Define the SauceSchema schema
const sauceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  prices: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: String,
    enum: ["not-available", "available"],
    default: "available",
  },
});

// Create the SauceSchema model
const Sauce = mongoose.model("Sauce", sauceSchema);

module.exports = Sauce;
