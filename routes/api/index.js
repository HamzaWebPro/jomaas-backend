const express = require("express");
const _ = express.Router();
const authRoutes = require("./auth.js");
const addMenuRoutes = require("./add-menu.js");

_.use("/auth", authRoutes);
_.use("/add-menu", addMenuRoutes);

module.exports = _;
