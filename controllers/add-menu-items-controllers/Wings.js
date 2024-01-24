const Wings = require("../../models/add-menu-items-models/wingsSchema");

// Controller function to save a wings item
const createWings = async (req, res) => {
  try {
    const { name, description, image, tossedIn, prices,branch } = req.body;
    // Check if required fields are empty
    if (!name || !description || !image || !tossedIn || !prices) {
      return res.json({ message: "Please provide all required fields." });
    }

    // Create a new Wings instance
    const wings = new Wings({
      name,
      description,
      image,
      tossedIn,
      prices,
      branch
    });

    // Save the wings item
    const savedWings = await wings.save();
    res.json({ message: "Your Wings Item Successfully Created!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read wings items
const getWings = async (req, res) => {
  try {
    // Retrieve all wings items from the database
    const wings = await Wings.find();
    res.json(wings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update or edit wings item
const updateWings = async (req, res) => {
  try {
    const { id, updatedWings } = req.body;

    // Find the wings item by ID and update it
    const updatedWingsItem = await Wings.findByIdAndUpdate(id, updatedWings, {
      new: true,
    });

    // If the wings item was not found, it will return null
    if (!updatedWingsItem) {
      return res.status(404).json({ message: "Wings item not found" });
    }

    res.json({ message: "Your Wings Item Successfully Updated!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Is available showing
const wingsAvailableStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const updatedWings = await Wings.findByIdAndUpdate(
      id,
      { isAvailable: status },
      { new: true }
    );

    if (!updatedWings) {
      return res.status(404).json({ message: "Wings item not found" });
    }

    res.json({ message: "Your Wings Item Status Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete wings item
const deleteWings = async (req, res) => {
  try {
    const { id } = req.body;

    // Find the wings item by ID and delete it
    await Wings.findByIdAndDelete(id);

    res.json({ message: "Your Wings Item Successfully Deleted!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  wingsAvailableStatus,
  createWings,
  getWings,
  deleteWings,
  updateWings,
};
