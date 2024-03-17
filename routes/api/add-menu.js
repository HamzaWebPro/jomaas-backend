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
const {
  createWings,
  getWings,
  updateWings,
  deleteWings,
  wingsAvailableStatus,
} = require("../../controllers/add-menu-items-controllers/Wings");
const {
  createPoutine,
  updatePoutine,
  deletePoutine,
  poutineAvailableStatus,
  getPoutine,
} = require("../../controllers/add-menu-items-controllers/poutine");
const {
  createChicken,
  getChicken,
  updateChicken,
  deleteChicken,
  chickenAvailableStatus,
} = require("../../controllers/add-menu-items-controllers/Chicken");
const {
  createPanzarotti,
  getPanzarotti,
  updatePanzarotti,
  deletePanzarotti,
  panzarottiAvailableStatus,
} = require("../../controllers/add-menu-items-controllers/Panzarotti");
const {
  createGarlicFingers,
  getGarlicFingers,
  updateGarlicFingers,
  deleteGarlicFingers,
  garlicFingersAvailableStatus,
} = require("../../controllers/add-menu-items-controllers/garlicFingers");
const {
  createBurger,
  getBurger,
  updateBurger,
  deleteBurger,
  burgerAvailableStatus,
} = require("../../controllers/add-menu-items-controllers/burger");
const {
  createSalad,
  getSalads,
  updateSalad,
  deleteSalad,
  saladAvailableStatus,
} = require("../../controllers/add-menu-items-controllers/salads");
const {
  createSpecialtyPasta,
  getSpecialtyPastas,
  updateSpecialtyPasta,
  deleteSpecialtyPasta,
  changeSpecialtyPastaStatus,
} = require("../../controllers/add-menu-items-controllers/speciality-pasta");
const {
  createSub,
  getSubs,
  updateSub,
  deleteSub,
  subAvailableStatus,
} = require("../../controllers/add-menu-items-controllers/sub");
const {
  createTwoForOnePizza,
  getTwoForOnePizza,
  updateTwoForOnePizza,
  deleteTwoForOnePizza,
  twoForOnePizzaAvailableStatus,
} = require("../../controllers/add-menu-items-controllers/twoforonepizza");

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

// Garlic Fingers routes
_.post("/garlicfingers", createGarlicFingers);
_.get("/getgarlicfingers", getGarlicFingers);
_.post("/updategarlicfingers", updateGarlicFingers);
_.post("/deletegarlicfingers", deleteGarlicFingers);
_.post("/garlicfingersstatus", garlicFingersAvailableStatus);
// Garlic Fingers routes end

// Burger routes
_.post("/burger", createBurger);
_.get("/getburger", getBurger);
_.post("/updateburger", updateBurger);
_.post("/deleteburger", deleteBurger);
_.post("/burgerstatus", burgerAvailableStatus);
// Burger routes end

// Salad routes
_.post("/salad", createSalad);
_.get("/getsalads", getSalads);
_.post("/updatesalad", updateSalad);
_.post("/deletesalad", deleteSalad);
_.post("/saladstatus", saladAvailableStatus);
// Salad routes end

// Specialty Pasta routes
_.post("/specialtypasta", createSpecialtyPasta);
_.get("/getspecialtypastas", getSpecialtyPastas);
_.post("/updatespecialtypasta", updateSpecialtyPasta);
_.post("/deletespecialtypasta", deleteSpecialtyPasta);
_.post("/specialtypastastatus", changeSpecialtyPastaStatus);
// Specialty Pasta routes end

// Sub routes
_.post("/sub", createSub);
_.get("/getsubs", getSubs);
_.post("/updatesub", updateSub);
_.post("/deletesub", deleteSub);
_.post("/substatus", subAvailableStatus);
// Sub routes end

_.post("/twoforonepizza", createTwoForOnePizza);
_.get("/gettwoforonepizza", getTwoForOnePizza);
_.post("/updatetwoforonepizza", updateTwoForOnePizza);
_.post("/deletetwoforonepizza", deleteTwoForOnePizza);
_.post("/twoforonepizzastatus", twoForOnePizzaAvailableStatus);

module.exports = _;
