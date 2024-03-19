const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    service: {
      type: String,
      required: true,
      enum: ["pickup", "delivery"],
    },

    orderNow: {
      type: Boolean,
      default: false,
    },

    orderDate: Date,

    orderTime: String,

    deliveryAddress: String,

    foods: Array,

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

// MIDDLEWARES
orderSchema.pre("save", function (next) {
  if (this.service === "pickup") {
    this.deliveryAddress = undefined;
    if (this.orderNow === true) {
      this.orderDate = Date.now();
      this.orderTime = "now";
    }
  } else if (this.service === "delivery") {
    if (this.orderNow === true) {
      this.orderDate = Date.now();
      this.orderTime = "now";
    }
  }

  next();
});

module.exports = model("Order", orderSchema);
