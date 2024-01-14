const Order = require("../models/orderSchema");
const axios = require("axios");

const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      customerAddress,
      totalAllProductAmount,
      orderedProducts,
      insideCity,
      onlinePay,
      outsideCity,
    } = req.body;

    // Validate required fields
    if (
      !customerName ||
      !customerPhone ||
      !customerAddress ||
      !totalAllProductAmount ||
      !orderedProducts ||
      orderedProducts.length === 0
    ) {
      return res
        .status(400)
        .json({ error: "Some required fields are missing." });
    }

    // Validate orderedProducts array
    for (const product of orderedProducts) {
      if (!product.name || !product.quantity || !product.totalAmount) {
        return res.status(400).json({
          error:
            "Each ordered product should have name, quantity, productImageUrl, and totalAmount defined.",
        });
      }
    }

    let savedOrder;

    if (onlinePay) {
      const options = {
        method: "POST",
        url: "https://sandbox.uddoktapay.com/api/checkout-v2",
        headers: {
          accept: "application/json",
          "RT-UDDOKTAPAY-API-KEY": "982d381360a69d419689740d9f2e26ce36fb7a50",
          "content-type": "application/json",
        },
        data: {
          full_name: customerName,
          email: customerEmail,
          amount: totalAllProductAmount,
          metadata: {
            customerName,
            customerPhone,
            customerEmail,
            customerAddress,
            totalAllProductAmount,
            orderedProducts,
            insideCity,
            onlinePay,
            outsideCity,
          },
          redirect_url: "https://landing-page-beta-topaz.vercel.app",
          cancel_url: "https://landing-page-beta-topaz.vercel.app",
        },
      };

      try {
        const response = await axios.request(options);

        const newOrder = new Order({
          customerName,
          customerPhone,
          customerEmail,
          customerAddress,
          totalAllProductAmount,
          orderedProducts,
          insideCity,
          onlinePay,
          outsideCity,
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();

        // Send the response after saving the order
        res
          .status(201)
          .json({ order: savedOrder, paymentResponse: response.data });
        // Do not use return here
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      // Create the order
      const newOrder = new Order({
        customerName,
        customerPhone,
        customerEmail,
        customerAddress,
        totalAllProductAmount,
        orderedProducts,
        insideCity,
        onlinePay,
        outsideCity,
      });

      // Save the order to the database
      savedOrder = await newOrder.save();

      return res.status(201).json(savedOrder);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// get all products
async function allOrders(req, res) {
  try {
    let data = await Order.find({});
    return res.send(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  createOrder,
  allOrders,
};
