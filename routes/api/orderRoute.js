const express = require("express");
const {
  createOrderController,
} = require("../../controllers/orderControllers/orderController");

const _ = express.Router();

_.post("/createorder", createOrderController);

module.exports = _;
