const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chickenSchema = new Schema(
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
    pieces: {
      type: Number,
      required: true,
    },
    prices: {
      type: Number,
      required: true,
    },
    comesWith: [
      {
        type: String,
        required: true,
      },
    ],
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

const Chicken = mongoose.model("Chicken", chickenSchema);

module.exports = Chicken;
