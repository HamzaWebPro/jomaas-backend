const express = require("express");
const { createPizza, getPizza, deletePizza, updatePizza, pizzaAvailableStatus } = require("../../controllers/add-menu-items-controllers/Pizza");
const { createDonair, getDonairs, updateDonair, deleteDonair } = require("../../controllers/add-menu-items-controllers/Donair");

const _ = express.Router();


// pizza start
_.post("/pizza", createPizza);
_.get("/getpizza", getPizza);
_.post("/updatepizza", updatePizza);
_.post("/deletepizza", deletePizza);
_.post("/pizzastatus",pizzaAvailableStatus)
// pizza end

// donair  start
_.post("/donair", createDonair);
_.get("/getdonair", getDonairs);
_.post("/updatedonair", updateDonair);
_.post("/deletedonair", deleteDonair);
// donair end

module.exports = _;
