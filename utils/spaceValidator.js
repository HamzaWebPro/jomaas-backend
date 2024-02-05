const { StatusCodes } = require("http-status-codes");

const noSpaceValidator = (res, name, fieldName) => {
  const noSpace = /^\S*$/;
  const renamedField =
    fieldName.charAt(0).toUpperCase() + fieldName.slice(1).toLowerCase();

  if (!name) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: `${renamedField} Is Required`, errorField: fieldName });
    return true;
  } else if (!noSpace.test(name)) {
    res.status(StatusCodes.BAD_REQUEST).send({
      error: `Valid ${renamedField} Is Required`,
      errorField: fieldName,
    });
    return true;
  } else {
    return false;
  }
};

const emptySpaceValidator = (res, name, fieldName) => {
  const emptySpace = /\S+/;
  const renamedField =
    fieldName.charAt(0).toUpperCase() + fieldName.slice(1).toLowerCase();

  if (!name) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: `${renamedField} Is Required`, errorField: fieldName });
    return true;
  } else if (!emptySpace.test(name)) {
    res.status(StatusCodes.BAD_REQUEST).send({
      error: `Valid ${renamedField} Is Required`,
      errorField: fieldName,
    });
    return true;
  } else {
    return false;
  }
};

module.exports = { noSpaceValidator, emptySpaceValidator };
