const phonePattern = /^\S+$/;

const phoneNumberValidator = (res, telephone) => {
  if (!telephone) {
    res.send({ error: "Phone number is required", errorField: "phone" });
    return true;
  } else if (!phonePattern.test(telephone)) {
    res.send({ error: "Field can't be empty", errorField: "phone" });
    return true;
  } else if (telephone.length !== 11) {
    res.send({ error: "Enter valid phone number", errorField: "phone" });
    return true;
  } else {
    return false;
  }
};

module.exports = phoneNumberValidator;
