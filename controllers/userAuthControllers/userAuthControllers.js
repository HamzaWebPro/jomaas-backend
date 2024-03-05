const UserModel = require("../../models/userAuthModel/userRegisterModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");
const nameValidator = require("../../utils/nameValidator");
const emailValidator = require("../../utils/emailValidator");
const passwordValidator = require("../../utils/passwordValidator");
const tokenCreator = require("../../utils/tokenCreator");
const emailSend = require("../../utils/emailSend");
const verificationTemplate = require("../../templates/verificationTemplate");
const otpTemplate = require("../../templates/otpTemplate");
const {
  noSpaceValidator,
  emptySpaceValidator,
} = require("../../utils/spaceValidator");

const userSignupController = (req, res) => {
  const { userName, email, password, confirmedPassword } = req.body;
  if (nameValidator(res, userName, "userName")) {
    return;
  } else if (emailValidator(res, email, "email")) {
    return;
  } else if (passwordValidator(res, password, "password")) {
    return;
  } else if (password.length < 8) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      error: "Password Length Must Be Over 7 Char",
      errorField: "password",
    });
  } else if (confirmedPassword !== password) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      error: "Confirmed Password Does Not Matched",
      errorField: "confirmedPassword",
    });
  }

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Unknown Error Occured" });

    try {
      const existUser = await UserModel.findOne({ email });
      if (!existUser) {
        const user = new UserModel({
          userName,
          email,
          password: hash,
        });

        const token = tokenCreator({ email: user.email }, "secret", "1h");
        emailSend(
          user.email,
          "Account Verification",
          verificationTemplate(token)
        );

        await user.save().then(() =>
          res.status(StatusCodes.CREATED).send({
            message: "Registration Successful!, Please Check Your Email!",
            userName: user.userName,
            email: user.email,
          })
        );
      } else {
        return res
          .status(StatusCodes.CONFLICT)
          .send({ error: "User Already Exist", errorField: "email" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Internal Server Error" });
    }
  });
};

const userVerificationController = async (req, res) => {
  const { token } = req.body;
  try {
    if (!token) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "Credential Error Occurred" });
    } else if (noSpaceValidator(res, token, "token")) {
      return;
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, "secret");
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .send({ error: "Token Has Expired" });
      }

      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ error: "Invalid Token" });
    }

    const { email } = decodedToken;
    const user = await UserModel.findOneAndUpdate(
      { email },
      { verified: true },
      { new: true }
    );

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ error: "Unknown Error Occured" });
    }

    return res
      .status(StatusCodes.OK)
      .send({ message: "Account Verified Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Internal Server Error" });
  }
};

const userLoginController = async (req, res) => {
  const { email, password, branch } = req.body;
  if (emailValidator(res, email, "email")) {
    return;
  } else if (passwordValidator(res, password, "password")) {
    return;
  } else if (emptySpaceValidator(res, branch, "branch")) {
    return;
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ error: "User Not Found", errorField: "email" });
    }

    const match = await bcrypt.compare(password, existingUser.password);
    if (match) {
      return res.status(StatusCodes.OK).send({
        message: "Successfully Logged In",
        userData: {
          userId: existingUser._id,
          userName: existingUser.userName,
          email: existingUser.email,
          verified: existingUser.verified,
          branch: branch,
        },
      });
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "Crediential Error", errorField: "password" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Internal Server Error" });
  }
};

const userForgotPasswordController = async (req, res) => {
  const { email } = req.body;
  if (emailValidator(res, email, "email")) return;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(StatusCodes.NOT_FOUND).send({
        error: "User Not Found",
        errorField: "email",
      });
    }

    const { uInt32 } = aleaRNGFactory(Date.now());
    const randomOtp = uInt32().toString().substring(0, 4);

    await UserModel.findOneAndUpdate(
      { email },
      { $set: { otp: randomOtp } },
      { new: true }
    );

    emailSend(email, "Forgot Password?", otpTemplate(randomOtp));

    return res
      .status(StatusCodes.OK)
      .send({ message: "An OTP Code Sent To Your Email Address", email });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: "Internal Server Error",
      errorField: "email",
    });
  }
};

const matchUserOtpController = async (req, res) => {
  const { otp, email } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ error: "Untracked Email Error Occured", errorField: "otp" });
    }

    if (existingUser.otp !== otp) {
      return res
        .status(StatusCodes.CONFLICT)
        .send({ error: "OTP Does Not Matched", errorField: "otp" });
    }

    await UserModel.updateOne({ email }, { $unset: { otp: "" } })
      .then(() => {
        return res
          .status(StatusCodes.OK)
          .send({ message: "OTP Matched Successfully" });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Internal Server Error", errorField: "otp" });
  }
};

const resetUserPasswordController = async (req, res) => {
  const { email, newPassword } = req.body;
  if (passwordValidator(res, newPassword, "resetPassword")) {
    return;
  } else if (newPassword.length < 8) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      error: "At Lest 8 Char Required",
      errorField: "resetPassword",
    });
  } else if (!email) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      error: "Untracked Email Error Occured",
      errorField: "resetPassword",
    });
  }

  try {
    const hash = await bcrypt.hash(newPassword, 10);
    await UserModel.findOneAndUpdate({ email }, { password: hash }).then(() => {
      return res
        .status(StatusCodes.OK)
        .send({ message: "New Password Added Successfully" });
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: "Internal Server Error",
      errorField: "resetPassword",
    });
  }
};

const allUsersController = async (req, res) => {
  try {
    const allUsers = await UserModel.find({}).select({ password: 0 });
    return res.status(StatusCodes.OK).send(allUsers);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Internal Server Errror" });
  }
};

module.exports = {
  userSignupController,
  userVerificationController,
  userLoginController,
  userForgotPasswordController,
  matchUserOtpController,
  resetUserPasswordController,
  allUsersController,
};
