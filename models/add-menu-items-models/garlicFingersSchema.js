const mongoose = require("mongoose");

const GarlicFingersSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    comesWith: [
      {
        type: String,
        required: true,
      },
    ],
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

module.exports = mongoose.model("GarlicFingers", GarlicFingersSchema);
