const express = require("express");
const {
  createPizza,
  getPizza,
  deletePizza,
  updatePizza,
  pizzaAvailableStatus,
} = require("../../controllers/add-menu-items-controllers/Pizza");
const {
  createDonair,
  getDonairs,
  updateDonair,
  deleteDonair,
  donairAvailableStatus,
} = require("../../controllers/add-menu-items-controllers/Donair");
const { createWings, getWings, updateWings, deleteWings, wingsAvailableStatus } = require("../../controllers/add-menu-items-controllers/Wings");
const { createPoutine, updatePoutine, deletePoutine, poutineAvailableStatus, getPoutine } = require("../../controllers/add-menu-items-controllers/poutine");
const { createChicken, getChicken, updateChicken, deleteChicken, chickenAvailableStatus } = require("../../controllers/add-menu-items-controllers/Chicken");
const { createPanzarotti, getPanzarotti, updatePanzarotti, deletePanzarotti, panzarottiAvailableStatus } = require("../../controllers/add-menu-items-controllers/Panzarotti");

const _ = express.Router();

// pizza start
_.post("/pizza", createPizza);
_.get("/getpizza", getPizza);
_.post("/updatepizza", updatePizza);
_.post("/deletepizza", deletePizza);
_.post("/pizzastatus", pizzaAvailableStatus);
// pizza end

// donair  start
_.post("/donair", createDonair);
_.get("/getdonair", getDonairs);
_.post("/updatedonair", updateDonair);
_.post("/deletedonair", deleteDonair);
_.post("/donairstatus", donairAvailableStatus);
// donair end

// wings start
_.post("/wings", createWings);
_.get("/getwings", getWings);
_.post("/updatewings", updateWings);
_.post("/deletewings", deleteWings);
_.post("/wingsstatus", wingsAvailableStatus);
// wings end

// poutines start
_.post("/poutines", createPoutine);
_.get("/getpoutines", getPoutine);
_.post("/updatepoutine", updatePoutine);
_.post("/deletepoutine", deletePoutine);
_.post("/poutinestatus", poutineAvailableStatus);
// poutines end

// chickens start
_.post("/chickens", createChicken);
_.get("/getchickens", getChicken);
_.post("/updatechicken", updateChicken);
_.post("/deletechicken", deleteChicken);
_.post("/chickenstatus", chickenAvailableStatus);
// chickens end

// panzarotti routes
_.post("/panzarotti", createPanzarotti);
_.get("/getpanzarotti", getPanzarotti);
_.post("/updatepanzarotti", updatePanzarotti);
_.post("/deletepanzarotti", deletePanzarotti);
_.post("/panzarottistatus", panzarottiAvailableStatus);
// panzarotti routes end

module.exports = _;
