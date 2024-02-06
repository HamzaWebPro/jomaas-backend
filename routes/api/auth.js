const express = require("express");
const _ = express.Router();
const login = require("../../controllers/login");
const { adminCredential } = require("../../controllers/adminCredential");
const {
  userSignupController,
  userVerificationController,
  userLoginController,
  userForgotPasswordController,
  matchUserOtpController,
  resetUserPasswordController,
  allUsersController,
} = require("../../controllers/userAuthControllers/userAuthControllers");

// admin credential start
_.post("/branchregister", adminCredential);
_.post("/login", login);
// admin credential end

// user credential start
_.post("/usersignup", userSignupController);
_.post("/userverify", userVerificationController);
_.post("/userlogin", userLoginController);
_.post("/userforgotpassword", userForgotPasswordController);
_.post("/usermatchotp", matchUserOtpController);
_.post("/userresetpassword", resetUserPasswordController);
_.get("/allusers", allUsersController);
// user credential end

module.exports = _;
