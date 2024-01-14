const express = require("express");
const {
  createproduct,
  allproducts,
  deleteProducts,
  editProduct,
} = require("../../controllers/prodectControllers");
const _ = express.Router();

_.post("/createproducts", createproduct);

_.get("/allproducts", allproducts);

_.post("/editproducts", editProduct);
_.post("/deleteproducts", deleteProducts);
module.exports = _;
