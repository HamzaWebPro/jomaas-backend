const Donair = require("../../models/add-menu-items-models/donairSchema")

// Controller function to create a Donair item
const createDonair = async (req, res) => {
  const emptySpace = /\S+/;
  try {
    const { name, description, image, toppings, prices, branch } = req.body;

    // Check if required fields are empty
    if (!name || !description || !image || !toppings || !prices) {
      return res.json({ message: "Please provide all required fields." });
    }
    // checking white space
    if (
      !emptySpace.test(name) ||
      !emptySpace.test(description) ||
      !emptySpace.test(image)
    ) {
      return res.json({ message: "Whitespace is not allowed" });
    }

    if (!toppings || toppings.length === 0) {
      return res.json({ message: "Please add at least one toppings." });
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
// is available showing
const donairAvailableStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const updatedDonair = await Donair.findByIdAndUpdate(id, { isAvailable: status }, { new: true });

    if (!updatedDonair) {
      return res.status(404).json({ message: "Donair not found" });
    }

    res.json({ message: "Your Product Status Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
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
  donairAvailableStatus
};
