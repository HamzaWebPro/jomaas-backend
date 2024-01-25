const mongoose = require("mongoose");

// Define the schema
const PanzarottiSchema = new mongoose.Schema(
  {
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
    comesWith: [
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
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },

    // Add any additional properties you may need for pizza items
  },
  {
    timestamps: true,
  }
);

// Create and export the model
module.exports = mongoose.model("Panzarotti",  PanzarottiSchema  );
