const Sub = require("../../models/add-menu-items-models/subSchema");

// Controller function to save a sub item
const createSub = async (req, res) => {
  const emptySpace = /\S+/;
  try {
    const { name, description, image, servedWith, toppings, prices, branch } =
      req.body;

    // Check if required fields are empty
    if (!name || !description || !image || !servedWith || !prices || !branch) {
      return res.json({ message: "Please provide all required fields." });
    }
    // Check servedWith
    if (!servedWith || servedWith.length === 0) {
      return res.json({ message: "Please add at least one served with item." });
    }
    // if (!toppings || toppings.length === 0) {
    //   return res.json({ message: "Please add at least one topping." });
    // }
    // checking white space
    if (
      !emptySpace.test(name) ||
      !emptySpace.test(description) ||
      !emptySpace.test(image)
    ) {
      return res.json({ message: "Whitespace is not allowed" });
    }

    // Create a new Sub instance
    const sub = new Sub({
      name,
      description,
      image,
      servedWith,
      toppings,
      prices,
      branch,
    });

    // Save the sub item
    const savedSub = await sub.save();
    res.json({ message: "Your Sub Item Successfully Created!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read sub items
const getSubs = async (req, res) => {
  try {
    // Retrieve all sub items from the database
    const subs = await Sub.find();
    res.json(subs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update or edit sub item
const updateSub = async (req, res) => {
  try {
    const { id, updatedSub } = req.body;

    // Find the sub item by ID and update it
    const updatedSubItem = await Sub.findByIdAndUpdate(id, updatedSub, {
      new: true,
    });

    // If the sub item was not found, it will return null
    if (!updatedSubItem) {
      return res.status(404).json({ message: "Sub item not found" });
    }

    res.json({ message: "Your Sub Item Successfully Updated!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Is available showing
const subAvailableStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const updatedSub = await Sub.findByIdAndUpdate(
      id,
      { isAvailable: status },
      { new: true }
    );

    if (!updatedSub) {
      return res.status(404).json({ message: "Sub item not found" });
    }

    res.json({ message: "Your Sub Item Status Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete sub item
const deleteSub = async (req, res) => {
  try {
    const { id } = req.body;

    // Find the sub item by ID and delete it
    await Sub.findByIdAndDelete(id);

    res.json({ message: "Your Sub Item Successfully Deleted!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  subAvailableStatus,
  createSub,
  getSubs,
  deleteSub,
  updateSub,
};
