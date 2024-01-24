const mongoose = require("mongoose");

// Define the schema
const WingsSchema = new mongoose.Schema({
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
  tossedIn: [
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

  // Add any additional properties you may need for wings
},{
  timestamps:true
});

// Create and export the model
module.exports = mongoose.model("Wings", WingsSchema);
