const express = require("express");
const _ = express.Router();
const authRoutes = require("./auth.js");
const addMenuRoutes = require("./add-menu.js");
const orderRoute = require("./orderRoute.js");
// const deliveryManRoute = require("./deliveryManRoute.js");

_.use("/auth", authRoutes);
_.use("/add-menu", addMenuRoutes);
_.use("/order", orderRoute);
// _.use("/delivery", deliveryManRoute);

module.exports = _;
