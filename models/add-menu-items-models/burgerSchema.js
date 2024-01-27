const mongoose = require("mongoose");

// Define the schema
const BurgerSchema = new mongoose.Schema(
  {
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
    toppings: [
      {
        type: String,
        required: true,
      },
    ],
    prices: {
      type: Number,
      required: true,
    },
    branch: {
      type: String,
    },
    isAvailable: {
      type: String,
      enum: ["not-available", "available"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
module.exports = mongoose.model("Burger", BurgerSchema);
