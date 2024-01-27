const Salad = require("../../models/add-menu-items-models/saladsSchema");

// Controller function to save a salad item
const createSalad = async (req, res) => {
  const emptySpace = /\S+/;
  try {
    const { name, description, image, servedWith, prices, branch } = req.body;

    // Check if required fields are empty
    if (!name || !description || !image || !servedWith || !prices || !branch) {
      return res.json({ message: "Please provide all required fields." });
    }
    if (!prices.medium || !prices.large) {
      return res.json({
        message: "Please provide prices for all salad items.",
      });
    }

    // Check servedWith
    if (!servedWith || servedWith.length === 0) {
      return res.json({ message: "Please add at least one served with item." });
    }

    // checking white space
    if (!emptySpace.test(name) || !emptySpace.test(description)) {
      return res.json({ message: "Whitespace is not allowed" });
    }

    // Create a new Salad instance
    const salad = new Salad({
      name,
      description,
      image,
      servedWith,
      prices,
      branch,
    });

    // Save the salad item
    const savedSalad = await salad.save();
    res.json({ message: "Your Salad Item Successfully Created!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read salad items
const getSalads = async (req, res) => {
  try {
    // Retrieve all salad items from the database
    const salads = await Salad.find();
    res.json(salads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update or edit salad item
const updateSalad = async (req, res) => {
  try {
    const { id, updatedSalad } = req.body;

    // Find the salad item by ID and update it
    const updatedSaladItem = await Salad.findByIdAndUpdate(id, updatedSalad, {
      new: true,
    });

    // If the salad item was not found, it will return null
    if (!updatedSaladItem) {
      return res.status(404).json({ message: "Salad item not found" });
    }

    res.json({ message: "Your Salad Item Successfully Updated!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Is available showing
const saladAvailableStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const updatedSalad = await Salad.findByIdAndUpdate(
      id,
      { isAvailable: status },
      { new: true }
    );

    if (!updatedSalad) {
      return res.status(404).json({ message: "Salad item not found" });
    }

    res.json({ message: "Your Salad Item Status Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete salad item
const deleteSalad = async (req, res) => {
  try {
    const { id } = req.body;

    // Find the salad item by ID and delete it
    await Salad.findByIdAndDelete(id);

    res.json({ message: "Your Salad Item Successfully Deleted!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  saladAvailableStatus,
  createSalad,
  getSalads,
  deleteSalad,
  updateSalad,
};
