const mongoose = require("mongoose");

const twoForOnePizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
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
    branch: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: String,
      default: "available",
      enum: ["available", "not-available"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TwoForOnePizza", twoForOnePizzaSchema);