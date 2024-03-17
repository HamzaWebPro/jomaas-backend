const TwoForOnePizza = require("../../models/add-menu-items-models/twoforoneSchema");

// Controller function to save a two-for-one pizza item
const createTwoForOnePizza = async (req, res) => {
  const emptySpace = /\S+/;
  try {
    const { name, prices, branch } = req.body;

    // Check if required fields are empty
    if (!name || !prices) {
      return res.json({ message: "Please provide all required fields." });
    }
    
    // Check if name and branch have white space
    if (!emptySpace.test(name) || !emptySpace.test(branch)) {
      return res.json({ message: "Whitespace is not allowed" });
    }

    // Check if prices for different sizes are defined
    if (
      !prices.small ||
      !prices.medium ||
      !prices.large ||
      !prices.extralarge
    ) {
      return res.json({
        message: "Please provide prices for all pizza sizes.",
      });
    }

    // Create a new TwoForOnePizza instance
    const twoForOnePizza = new TwoForOnePizza({
      name,
      prices,
      branch,
    });

    // Save the two-for-one pizza item
    const savedTwoForOnePizza = await twoForOnePizza.save();
    res.json({ message: "Your Two-for-One Pizza Item Successfully Created!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read two-for-one pizza items
const getTwoForOnePizza = async (req, res) => {
  try {
    // Retrieve all two-for-one pizza items from the database
    const twoForOnePizzas = await TwoForOnePizza.find();
    res.json(twoForOnePizzas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update or edit two-for-one pizza
const updateTwoForOnePizza = async (req, res) => {
  try {
    const { id, updatedTwoForOnePizza } = req.body;

    // Find the two-for-one pizza item by ID and update it
    const updatedTwoForOnePizzaItem = await TwoForOnePizza.findByIdAndUpdate(id, updatedTwoForOnePizza, {
      new: true,
    });

    // If the two-for-one pizza item was not found, it will return null

    res.json({ message: "Your Two-for-One Pizza Item Successfully Updated!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Available status for two-for-one pizza
const twoForOnePizzaAvailableStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const updatedTwoForOnePizza = await TwoForOnePizza.findByIdAndUpdate(
      id,
      { isAvailable: status },
      { new: true }
    );

    if (!updatedTwoForOnePizza) {
      return res.status(404).json({ message: "Two-for-One Pizza not found" });
    }

    res.json({ message: "Your Two-for-One Pizza Status Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete two-for-one pizza
const deleteTwoForOnePizza = async (req, res) => {
  try {
    const { id } = req.body;

    // Find the two-for-one pizza item by ID and delete it
    await TwoForOnePizza.findByIdAndDelete(id);

    res.json({ message: "Your Two-for-One Pizza Item Successfully Deleted!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  twoForOnePizzaAvailableStatus,
  createTwoForOnePizza,
  getTwoForOnePizza,
  deleteTwoForOnePizza,
  updateTwoForOnePizza,
};
