const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    service: {
      type: String,
      required: true,
      enum: ["pickup", "delivery"],
    },

    orderNumber: Number,

    orderType: {
      type: String,
      required: true,
      enum: ["now", "later"],
    },

    orderTime: String,

    storeAddress: String,

    orderPrice: {
      type: String,
      required: true,
    },

    orderLocation: String,
    userName: {
      type: String,
      required: true,
    },

    email: String,
    phone: {
      type: String,
      required: true,
    },
    orderNote: String,
    payment: {
      type: String,
      required: true,
    },
    orderDetails: {
      type: Array,
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    deliveryMan: {
      type: Schema.Types.ObjectId,
      ref: "DeliveryMan",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", orderSchema);
