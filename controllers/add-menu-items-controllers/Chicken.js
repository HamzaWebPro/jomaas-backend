const Chicken = require("../../models/add-menu-items-models/chickenSchema");

// Controller function to save a Chicken item
const createChicken = async (req, res) => {
  const emptySpace = /\S+/;
  try {
    const { name, description,image, pieces,comesWith, prices,branch } = req.body;

    // Check if required fields are empty
    if (!name || !description || !image || !pieces || !prices) {
      return res.json({ message: "Please provide all required fields." });
    }
    // Check if at least one topping is provided
    if (!comesWith || comesWith.length === 0) {
      return res.json({ message: "Please add at least one comes with item." });
    }

    // Checking white space
    if (!emptySpace.test(name) || !emptySpace.test(description)) {
      return res.json({ message: "Whitespace is not allowed" });
    }

    // Create a new Chicken instance
    const chicken = new Chicken({
      name,
      description,
      image,
      pieces,
      comesWith,
      prices,
      branch
    });

    // Save the Chicken item
    const savedChicken = await chicken.save();
    res.json({ message: "Your Chicken Item Successfully Created!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read Chicken items
const getChicken = async (req, res) => {
  try {
    // Retrieve all Chicken items from the database
    const chickens = await Chicken.find();
    res.json(chickens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update or edit Chicken
const updateChicken = async (req, res) => {
  try {
    const { id, updatedChicken } = req.body;

    // Find the Chicken item by ID and update it
    const updatedChickenItem = await Chicken.findByIdAndUpdate(
      id,
      updatedChicken,
      {
        new: true,
      }
    );

    // If the Chicken item was not found, it will return null
    if (!updatedChickenItem) {
      return res.status(404).json({ message: "Chicken item not found" });
    }

    res.json({ message: "Your Chicken Item Successfully Updated!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Is available showing
const chickenAvailableStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const updatedChicken = await Chicken.findByIdAndUpdate(
      id,
      { isAvailable: status },
      { new: true }
    );

    if (!updatedChicken) {
      return res.status(404).json({ message: "Chicken item not found" });
    }

    res.json({ message: "Your Chicken Item Status Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Chicken
const deleteChicken = async (req, res) => {
  try {
    const { id } = req.body;

    // Find the Chicken item by ID and delete it
    await Chicken.findByIdAndDelete(id);

    res.json({ message: "Your Chicken Item Successfully Deleted!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  chickenAvailableStatus,
  createChicken,
  getChicken,
  deleteChicken,
  updateChicken,
};
