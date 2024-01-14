const express = require('express');
const login = require("../../controllers/login");
const { adminCredential } = require('../../controllers/adminCredential');


const _ = express.Router()


_.post("/branchregister",adminCredential)
_.post("/login",login)



module.exports = _ ;