const SpecialtyPasta = require("../../models/add-menu-items-models/specialtyPastaSchema");

// Controller function to save a specialty pasta item
const createSpecialtyPasta = async (req, res) => {
  const emptySpace = /\S+/;
  try {
    const { name, description, image, servedWith, prices, branch } = req.body;

    // Check if required fields are empty
    if (!name || !description || !image || !servedWith || !prices || !branch) {
      return res.json({ message: "Please provide all required fields." });
    }
    if (!prices.medium || !prices.large) {
      return res.json({
        message: "Please provide prices for all specialty pasta items.",
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

    // Create a new SpecialtyPasta instance
    const specialtyPasta = new SpecialtyPasta({
      name,
      description,
      image,
      servedWith,
      prices,
      branch,
    });

    // Save the specialty pasta item
    const savedSpecialtyPasta = await specialtyPasta.save();
    res.json({ message: "Your Specialty Pasta Item Successfully Created!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read specialty pasta items
const getSpecialtyPastas = async (req, res) => {
  try {
    // Retrieve all specialty pasta items from the database
    const specialtyPastas = await SpecialtyPasta.find();
    res.json(specialtyPastas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update or edit specialty pasta item
const updateSpecialtyPasta = async (req, res) => {
  try {
    const { id, updatedSpecialtyPasta } = req.body;

    // Find the specialty pasta item by ID and update it
    const updatedItem = await SpecialtyPasta.findByIdAndUpdate(id, updatedSpecialtyPasta, {
      new: true,
    });

    // If the specialty pasta item was not found, it will return null
    if (!updatedItem) {
      return res.status(404).json({ message: "Specialty pasta item not found" });
    }

    res.json({ message: "Your Specialty Pasta Item Successfully Updated!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Is available showing
const changeSpecialtyPastaStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const updatedSpecialtyPasta = await SpecialtyPasta.findByIdAndUpdate(
      id,
      { isAvailable: status },
      { new: true }
    );

    if (!updatedSpecialtyPasta) {
      return res.status(404).json({ message: "Specialty pasta item not found" });
    }

    res.json({ message: "Your Specialty Pasta Item Status Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete specialty pasta item
const deleteSpecialtyPasta = async (req, res) => {
  try {
    const { id } = req.body;

    // Find the specialty pasta item by ID and delete it
    await SpecialtyPasta.findByIdAndDelete(id);

    res.json({ message: "Your Specialty Pasta Item Successfully Deleted!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createSpecialtyPasta,
  getSpecialtyPastas,
  updateSpecialtyPasta,
  changeSpecialtyPastaStatus,
  deleteSpecialtyPasta,
};
