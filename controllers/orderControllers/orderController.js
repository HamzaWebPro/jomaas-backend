const Order = require("../../models/orderModel/orderSchema");
const User = require("../../models/userAuthModel/userRegisterModel");

const createOrderController = async (req, res) => {
  const {
    service,
    orderType,
    orderPriceTax,
    orderTime,
    storeAddress,
    orderPrice,
    orderLocation,
    userName,
    email,
    phone,
    orderNote,
    payment,
    orderDetails,
    user,
  } = req.body;

  if (service == "delivery" && orderType == "now") {
    const newOrder = new Order({
      service,
      orderType,
      storeAddress,
      orderPrice,
      orderPriceTax,
      orderLocation,
      userName,
      email,
      phone,
      orderNote,
      payment,
      orderDetails,
      user,
    });

    newOrder.save();

    res.send({
      success: "Order Created Successfull.",
    });
  } else if (service == "delivery" && orderType == "later") {
    const newOrder = new Order({
      service,
      orderType,
      orderTime,
      storeAddress,
      orderPrice,
      orderPriceTax,
      orderLocation,
      userName,
      email,
      phone,
      orderNote,
      payment,
      orderDetails,
      user,
    });

    newOrder.save();

    res.send({
      success: "Order Created Successfull.",
    });
  } else if (service == "pickup" && orderType == "now") {
    const newOrder = new Order({
      service,
      orderType,
      storeAddress,
      orderPrice,
      orderPriceTax,
      orderLocation,
      userName,
      email,
      phone,
      orderNote,
      payment,
      orderDetails,
      user,
    });

    newOrder.save();

    res.send({
      success: "Order Created Successfull.",
    });
  } else if (service == "pickup" && orderType == "later") {
    const newOrder = new Order({
      service,
      orderType,
      orderTime,
      storeAddress,
      orderPrice,
      orderPriceTax,
      orderLocation,
      userName,
      email,
      phone,
      orderNote,
      payment,
      orderDetails,
      user,
    });

    newOrder.save();

    res.send({
      success: "Order Created Successfull.",
    });
  } else {
    res.send({
      error: "Order Created Failed.",
    });
  }
};

const allOrderController = async (req, res) => { 

  const allOrder = await Order.find({});

  res.send({
    data: allOrder
  })

 }

module.exports = { createOrderController, allOrderController };
