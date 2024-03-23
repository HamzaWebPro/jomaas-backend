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
