const mongoose = require("mongoose");

// Define the schema
const productSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

// Create and export the model
module.exports = mongoose.model("Product", productSchema);
