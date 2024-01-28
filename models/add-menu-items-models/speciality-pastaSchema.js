const mongoose = require("mongoose");

// Define the schema
const spacilityPastaSchema = new mongoose.Schema(
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
    prices: {
      medium: {
        type: Number,
        required: true,
      },
      large: {
        type: Number,
        required: true,
      },
    },
    isAvailable: {
      type: String,
      enum: ["not-available", "available"],
      default: "available",
    },

    branch: {
      type: String,
    },
    // Add any additional properties you may need for Poutines
  },
  {
    timestamps: true,
  }
);

// Create and export the model
module.exports = mongoose.model("SpacilityPasta", spacilityPastaSchema);
