const Sauce = require("../../models/add-menu-items-models/sauceSchema");

// Controller function to save a Sauce item
const createSauce = async (req, res) => {
  const emptySpace = /\S+/;
  try {
    const { name, description, image, prices, branch } = req.body;

    // Check if required fields are empty
    if (!name || !description || !image || !prices || !branch) {
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

    // Create a new Sauce instance
    const sauce = new Sauce({
      name,
      description,
      image,
      prices,
      branch,
    });

    // Save the Sauce item
    const savedSauce = await sauce.save();
    res.json({ message: "Your Sauce Item Successfully Created!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read Sauce items
const getSauces = async (req, res) => {
  try {
    // Retrieve all Sauce items from the database
    const sauces = await Sauce.find();
    res.json(sauces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update or edit Sauce
const updateSauce = async (req, res) => {
  try {
    const { id, updatedSauce } = req.body;

    // Find the Sauce item by ID and update it
    const updatedSauceItem = await Sauce.findByIdAndUpdate(id, updatedSauce, {
      new: true,
    });

    // If the Sauce item was not found, it will return null
    if (!updatedSauceItem) {
      return res.status(404).json({ message: "Sauce not found" });
    }

    res.json({ message: "Your Sauce Item Successfully Updated!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Sauce
const deleteSauce = async (req, res) => {
  try {
    const { id } = req.body;

    // Find the Sauce item by ID and delete it
    await Sauce.findByIdAndDelete(id);

    res.json({ message: "Your Sauce Item Successfully Deleted!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Status Change for Sauce
const sauceAvailableStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const updatedSauce = await Sauce.findByIdAndUpdate(
      id,
      { isAvailable: status },
      { new: true }
    );

    if (!updatedSauce) {
      return res.status(404).json({ message: "Sauce not found" });
    }

    res.json({ message: "Your Sauce Status Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createSauce,
  getSauces,
  updateSauce,
  deleteSauce,
  sauceAvailableStatus,
};
