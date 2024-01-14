const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, "Customer name is required"],
  },
  customerPhone: {
    type: String,
    required: [true, "Customer phone number is required"],
  },
  onlinePay: {
    type: Boolean,
    default:false
  },
  customerEmail: {
    type: String,

    // You may add additional email validation if needed
  },
  customerAddress: {
    type: String,
    required: [true, "Customer address is required"],
  },
  orderStatus: {
    type: String,
    enum: ["pending", "confirmed"],
    default: "pending",
  },
  totalAllProductAmount: {
    type: Number,
    required: [true, "Total product amount is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  insideCity: { type: Boolean, default: true },
  outsideCity: { type: Boolean, default: false },
  orderedProducts: [
    {
      name: {
        type: String,
        required: [true, "Product name is required"],
      },
      quantity: {
        type: Number,
        required: [true, "Product quantity is required"],
      },
      productImageUrl: {
        type: String,
     
      },
      totalAmount: {
        type: Number,
        required: [true, "Total amount for the product is required"],
      },
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
