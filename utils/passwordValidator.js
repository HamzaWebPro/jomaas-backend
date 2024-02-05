const { StatusCodes } = require("http-status-codes");

const passwordValidator = (res, password, fieldName) => {
  const passwordPattern = /^\S+$/;
  if (!password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: "Password Is Required", errorField: fieldName });
    return true;
  } else if (!passwordPattern.test(password)) {
    res.status(StatusCodes.BAD_REQUEST).send({
      error: "Space Is Not Allowed In Password",
      errorField: fieldName,
    });
    return true;
  } else {
    return false;
  }
};

module.exports = passwordValidator;
