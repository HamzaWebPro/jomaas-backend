const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const deliveryManSchema = new Schema(
  {
    name: {
      type: String,
    },

    phone: {
      type: Number,
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
