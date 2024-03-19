const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const deliveryManSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required for a delivery man"],
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },

    branch: {
      type: String,
      enum: {
        values: [
          "edmonton",
          "thickwood",
          "downtown",
          "beacon hill",
          "timberlea",
        ],
        message: "{VALUE} is not supported, Enter a valid branch name.",
      },
      required: [true, "Branch name is required"],
    },

    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("DeliveryMan", deliveryManSchema);
