const express = require("express");
const _ = express.Router();
const authRoutes = require("./auth.js");
const addMenuRoutes = require("./add-menu.js")
const productsRoutes = require("./products.js");
const orderRoutes = require("./order.js");

_.use("/auth", authRoutes);
_.use("/add-menu", addMenuRoutes);
_.use("/products", productsRoutes);
_.use("/order", orderRoutes);

module.exports = _;
