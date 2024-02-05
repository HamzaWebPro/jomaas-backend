const { StatusCodes } = require("http-status-codes");

const emailValidator = (res, email, fieldName) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: "Email Is Required", errorField: fieldName });
    return true;
  } else if (!emailPattern.test(email)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: "Valid Email Is Required", errorField: fieldName });
    return true;
  } else {
    return false;
  }
};

module.exports = emailValidator;
