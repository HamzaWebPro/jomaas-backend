const Donair = require("../../models/add-menu-items-models/donairSchema")

// Controller function to create a Donair item
const createDonair = async (req, res) => {
  try {
    const { name, description, image, toppings, prices, branch } = req.body;

    // Check if required fields are empty
    if (!name || !description || !image || !toppings || !prices) {
      return res.json({ message: "Please provide all required fields." });
    }

    // Create a new Donair instance
    const donair = new Donair({
      name,
      description,
      image,
      toppings,
      prices,
      branch,
    });

    // Save the Donair item
    const savedDonair = await donair.save();
    res.json({ message: "Your Donair Item Successfully Created!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to update a Donair item
const updateDonair = async (req, res) => {
  try {
    const { id, updatedDonair } = req.body;

    // Find the Donair item by ID and update it
    const updatedDonairItem = await Donair.findByIdAndUpdate(
      id,
      updatedDonair,
      { new: true }
    );

    // If the Donair item was not found, it will return null
    if (!updatedDonairItem) {
      return res.json({
        message: "Donair item not found with the provided ID.",
      });
    }

    res.json({
      message: "Your Donair Item Successfully Updated!!",
      updatedDonairItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to get all Donair items
const getDonairs = async (req, res) => {
  try {
    // Retrieve all Donair items from the database
    const donairs = await Donair.find();
    res.json(donairs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to delete a Donair item
const deleteDonair = async (req, res) => {
  try {
    const { id } = req.body;

    // Find the Donair item by ID and delete it
    await Donair.findByIdAndDelete(id);

    res.json({ message: "Your Donair Item Successfully Deleted!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createDonair,
  updateDonair,
  getDonairs,
  deleteDonair,
};
