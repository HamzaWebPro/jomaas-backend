const mongoose = require("mongoose");

// Define the schema
const PizzaSchema = new mongoose.Schema({
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
    small: {
      type: Number,
      required: true,
    },
    medium: {
      type: Number,
      required: true,
    },
    large: {
      type: Number,
      required: true,
    },
    extralarge: {
        type: Number,
        required: true,
      },
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
module.exports = mongoose.model("Pizza", PizzaSchema);