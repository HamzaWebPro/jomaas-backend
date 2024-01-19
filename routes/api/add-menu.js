const express = require("express");
const { createPizza, getPizza, deletePizza, updatePizza } = require("../../controllers/add-menu-items-controllers/Pizza");

const _ = express.Router();


// pizza start
_.post("/pizza", createPizza);
_.get("/getpizza", getPizza);
_.post("/updatepizza", updatePizza);
_.post("/deletepizza", deletePizza);
// pizza end

module.exports = _;
