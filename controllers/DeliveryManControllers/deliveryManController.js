const { StatusCodes } = require("http-status-codes");
const DeliveryMan = require("./../../models/deliveryManModel/deliveryManSchema");
const nameValidator = require("../../utils/nameValidator");
const phoneNumberValidator = require("../../utils/phoneNumberValidator");

const createDeliveryManController = async (req, res) => {
  const { name, phone, branch } = req.body;
  if (nameValidator(res, name, "name")) {
    return;
  } else if (phoneNumberValidator(res, phone)) {
    return;
  } else if (!branch) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Branch name is required" });
  }

  try {
    const newDeliveryMan = new DeliveryMan({ name, phone, branch });
    await newDeliveryMan.save();

    res.status(StatusCodes.OK).json({
      message: "Delivery man create successfully",
      data: newDeliveryMan,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

const getAllDeliveryManController = async (req, res) => {
  try {
    const allDeliveryMan = await DeliveryMan.find({}).select("-__v");
    return res.status(StatusCodes.OK).json(allDeliveryMan);
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

const getADeliveryManController = async (req, res) => {
  const { id } = req.params;
  try {
    const deliveryMan = await DeliveryMan.findOne({ _id: id }).select("-__v");
    return res.status(StatusCodes.OK).json(deliveryMan);
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

const updateDeliveryManController = async (req, res) => {
  const { id } = req.params;
  try {
    const deliveryMan = await DeliveryMan.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(StatusCodes.OK).json({
      message: "Delivary man has been updated successfully",
      deliveryMan,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

const deleteDeliveryManController = async (req, res) => {
  const { id } = req.params;
  try {
    await DeliveryMan.findOneAndDelete({ _id: id });
    res.status(StatusCodes.NO_CONTENT).json({
      message: "Delivary man has been deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

module.exports = {
  createDeliveryManController,
  getAllDeliveryManController,
  getADeliveryManController,
  updateDeliveryManController,
  deleteDeliveryManController,
};
