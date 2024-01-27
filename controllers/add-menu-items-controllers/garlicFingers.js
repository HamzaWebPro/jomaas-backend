// Import the GarlicFingers model
const GarlicFingers = require("../../models/add-menu-items-models/garlicFingersSchema");

// Controller function to save a Garlic Fingers item
const createGarlicFingers = async (req, res) => {
  const emptySpace = /\S+/;
  try {
    const { description, image, comesWith, prices, branch } = req.body;
    // Check if required fields are empty
    if (!description || !image || !comesWith || !branch) {
      return res.json({ message: "Please provide all required fields." });
    }
    // Check if description and image URL are not empty and contain no white spaces
    if (!emptySpace.test(description) || !emptySpace.test(image)) {
      return res.json({
        message: "White Space not allowed!",
      });
    }
    // check comes with
    if (!comesWith || comesWith.length === 0) {
        return res.json({ message: "Please add at least one comes with item." });
      }

    // Check if prices for different sizes are defined
    if (
      !prices.small ||
      !prices.medium ||
      !prices.large ||
      !prices.extralarge
    ) {
      return res.json({
        message: "Please provide prices for all Garlic Fingers sizes.",
      });
    }

    // Create a new GarlicFingers instance
    const garlicFingers = new GarlicFingers({
      description,
      image,
      comesWith,
      prices,
      branch,
    });

    // Save the Garlic Fingers item
    const savedGarlicFingers = await garlicFingers.save();
    res.json({ message: "Your Garlic Fingers Item Successfully Created!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read Garlic Fingers items
const getGarlicFingers = async (req, res) => {
  try {
    // Retrieve all Garlic Fingers items from the database
    const garlicFingers = await GarlicFingers.find();
    res.json(garlicFingers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update or edit Garlic Fingers item
const updateGarlicFingers = async (req, res) => {
  try {
    const { id, updatedGarlicFingers } = req.body;

    // Find the Garlic Fingers item by ID and update it
    const updatedGarlicFingersItem = await GarlicFingers.findByIdAndUpdate(
      id,
      updatedGarlicFingers,
      { new: true }
    );

    // If the Garlic Fingers item was not found, return an error
    if (!updatedGarlicFingersItem) {
      return res.status(404).json({ message: "Garlic Fingers item not found" });
    }

    res.json({ message: "Your Garlic Fingers Item Successfully Updated!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Is available showing
const garlicFingersAvailableStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const updatedGarlicFingers = await GarlicFingers.findByIdAndUpdate(
      id,
      { isAvailable: status },
      { new: true }
    );

    if (!updatedGarlicFingers) {
      return res.status(404).json({ message: "Garlic Fingers item not found" });
    }

    res.json({ message: "Your Garlic Fingers Item Status Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Garlic Fingers item
const deleteGarlicFingers = async (req, res) => {
  try {
    const { id } = req.body;

    // Find the Garlic Fingers item by ID and delete it
    await GarlicFingers.findByIdAndDelete(id);

    res.json({ message: "Your Garlic Fingers Item Successfully Deleted!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  garlicFingersAvailableStatus,
  createGarlicFingers,
  getGarlicFingers,
  deleteGarlicFingers,
  updateGarlicFingers,
};
