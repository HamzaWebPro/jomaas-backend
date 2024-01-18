const express = require("express");
const { createPizza, getPizza, deletePizza } = require("../../controllers/add-menu-items-controllers/Pizza");

const _ = express.Router();

_.post("/pizza", createPizza);
_.get("/getpizza", getPizza);
_.post("/deletepizza", deletePizza);

module.exports = _;
