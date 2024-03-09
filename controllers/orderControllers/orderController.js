const Order = require("../../models/orderModel/orderSchema");
const User = require("../../models/userAuthModel/userRegisterModel");

const createOrderController = async (req, res) => {
  const {
    service,
    orderNow,
    foods,
    orderDate,
    orderTime,
    deliveryAddress,
    user,
  } = req.body;

  if (!service) {
    return res.status(400).json({ error: "Service is required" });
  } else if (!user) {
    return res.status(400).json({ error: "User is required" });
  }

  try {
    const newOrder = new Order({
      service,
      orderNow,
      foods,
      orderDate,
      orderTime,
      deliveryAddress,
      user,
    });

    await newOrder.save();

    await User.findOneAndUpdate(
      { _id: user },
      { $push: { orders: newOrder } },
      { new: true }
    );

    return res.status(200).json({
      success: "Order created successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports = { createOrderController };
