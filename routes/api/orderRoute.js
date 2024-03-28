const express = require("express");
const {
  createOrderController,
  allOrderController
} = require("../../controllers/orderControllers/orderController");

const _ = express.Router();

_.post("/createorder", createOrderController);
_.get("/allorder", allOrderController);
 
module.exports = _;
