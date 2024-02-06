const { StatusCodes } = require("http-status-codes");

const nameValidator = (res, name, fieldName) => {
  const namePattern = /^[a-zA-Z][a-zA-Z0-9\s]*$/;
  const capitaizidedName =
    fieldName.charAt(0).toUpperCase() + fieldName.toLowerCase().slice(1);

  if (!name) {
    res.status(StatusCodes.BAD_REQUEST).send({
      error: `${capitaizidedName} is Required`,
      errorField: fieldName,
    });
    return true;
  } else if (!namePattern.test(name)) {
    res.status(StatusCodes.BAD_REQUEST).send({
      error: `Valid ${capitaizidedName} is Required`,
      errorField: fieldName,
    });
    return true;
  } else {
    return false;
  }
};

module.exports = nameValidator;
