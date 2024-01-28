const Poutine = require("../../models/add-menu-items-models/poutineSchema");

// Controller function to save a Poutine item
const createPoutine = async (req, res) => {
  const emptySpace = /\S+/;
  try {
    const { name, description, image, prices, branch } = req.body;
    image;
    // Check if required fields are empty
    if (!name || !description || !prices || !image) {
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
    // Check if prices for different sizes are defined
    if (!prices.medium || !prices.large) {
      return res.json({
        message: "Please provide prices for all poutine sizes.",
      });
    }

    // Create a new Poutine instance
    const poutine = new Poutine({
      name,
      description,
      image,
      prices,
      branch,
    });

    // Save the Poutine item
    const savedPoutine = await poutine.save();
    res.json({ message: "Your Poutine Item Successfully Created!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read Poutine items
const getPoutine = async (req, res) => {
  try {
    // Retrieve all Poutine items from the database
    const poutines = await Poutine.find();
    res.json(poutines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update or edit Poutine
const updatePoutine = async (req, res) => {
  try {
    const { id, updatedPoutine } = req.body;

    // Find the Poutine item by ID and update it
    const updatedPoutineItem = await Poutine.findByIdAndUpdate(
      id,
      updatedPoutine,
      {
        new: true,
      }
    );

    // If the Poutine item was not found, it will return null

    res.json({ message: "Your Poutine Item Successfully Updated!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Is available showing
const poutineAvailableStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const updatedPoutine = await Poutine.findByIdAndUpdate(
      id,
      { isAvailable: status },
      { new: true }
    );

    if (!updatedPoutine) {
      return res.status(404).json({ message: "Poutine not found" });
    }

    res.json({ message: "Your Product Status Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Poutine
const deletePoutine = async (req, res) => {
  try {
    const { id } = req.body;

    // Find the Poutine item by ID and delete it
    await Poutine.findByIdAndDelete(id);

    res.json({ message: "Your Poutine Item Successfully Deleted!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  poutineAvailableStatus,
  createPoutine,
  getPoutine,
  deletePoutine,
  updatePoutine,
};
