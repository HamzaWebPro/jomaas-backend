const mongoose = require("mongoose");

// Define the schema
const  DonairSchema = new mongoose.Schema({
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
  toppings: [{
    type: String,
    required: true,
  }],
  prices: {
    type: Number,
      required: true,
  },
  branch:{
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
 
  // Add any additional properties you may need for pizza items
});

// Create and export the model
module.exports = mongoose.model("Donair", DonairSchema);