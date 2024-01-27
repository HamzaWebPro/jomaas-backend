const Panzarotti = require("../../models/add-menu-items-models/panzarottiSchema");

// Controller function to save a panzarotti item
const createPanzarotti = async (req, res) => {
  const emptySpace = /\S+/;
  try {
    const { description, image, toppings, comesWith, prices, branch } = req.body;

    // Check if required fields are empty
    if (!description || !image || !toppings || !comesWith || !prices || !branch) {
      return res.json({ message: "Please provide all required fields." });
    }
   // check comes with
   if (!comesWith || comesWith.length === 0) {
    return res.json({ message: "Please add at least one comes with item." });
  }
   // check comes with
   if (!toppings || toppings.length === 0) {
    return res.json({ message: "Please add at least one toppings." });
  }


    // checking white space
    if (
      !emptySpace.test(description) ||
      !emptySpace.test(image)
    ) {
      return res.json({ message: "Whitespace is not allowed" });
    }

    // Create a new Panzarotti instance
    const panzarotti = new Panzarotti({
      description,
      image,
      toppings,
      comesWith,
      prices,
      branch
    });

    // Save the panzarotti item
    const savedPanzarotti = await panzarotti.save();
    res.json({ message: "Your Panzarotti Item Successfully Created!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read panzarotti items
const getPanzarotti = async (req, res) => {
  try {
    // Retrieve all panzarotti items from the database
    const panzarottis = await Panzarotti.find();
    res.json(panzarottis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update or edit panzarotti item
const updatePanzarotti = async (req, res) => {
  try {
    const { id, updatedPanzarotti } = req.body;

    // Find the panzarotti item by ID and update it
    const updatedPanzarottiItem = await Panzarotti.findByIdAndUpdate(id, updatedPanzarotti, {
      new: true,
    });

    // If the panzarotti item was not found, it will return null
    if (!updatedPanzarottiItem) {
      return res.status(404).json({ message: "Panzarotti item not found" });
    }

    res.json({ message: "Your Panzarotti Item Successfully Updated!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Is available showing
const panzarottiAvailableStatus = async (req, res) => {
  
  try {
    const { id, status } = req.body;
    const updatedPanzarotti = await Panzarotti.findByIdAndUpdate(
      id,
      { isAvailable: status },
      { new: true }
    );

    if (!updatedPanzarotti) {
      return res.status(404).json({ message: "Panzarotti item not found" });
    }

    res.json({ message: "Your Panzarotti Item Status Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete panzarotti item
const deletePanzarotti = async (req, res) => {
  try {
    const { id } = req.body;

    // Find the panzarotti item by ID and delete it
    await Panzarotti.findByIdAndDelete(id);

    res.json({ message: "Your Panzarotti Item Successfully Deleted!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  panzarottiAvailableStatus,
  createPanzarotti,
  getPanzarotti,
  deletePanzarotti,
  updatePanzarotti,
};
