const express = require("express");
const { createOrder, allOrders } = require("../../controllers/orderController");

const _ = express.Router();


_.post("/createorder", createOrder);
_.get("/allorder", allOrders);
module.exports = _;