const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
    },

    // orders: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Order",
    //   },
    // ],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);