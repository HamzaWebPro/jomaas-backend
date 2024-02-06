const mongoose = require("mongoose");

const subSchema = new mongoose.Schema(
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
    },
    servedWith: [
      {
        type: String,
        required: true,
      },
    ],
    toppings: [
      {
        type: String,
      },
    ],
    prices: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: String,
      enum: ["not-available", "available"],
      default: "available",
    },
    branch: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sub", subSchema);
