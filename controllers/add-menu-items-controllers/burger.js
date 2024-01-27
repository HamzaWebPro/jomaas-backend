// Import the Burger model
const Burger = require("../../models/add-menu-items-models/burgerSchema");

// Controller function to save a burger item
const createBurger = async (req, res) => {
  const emptySpace = /\S+/;
  try {
    const { name, description, image, toppings, price, branch } = req.body;

    // Check if required fields are empty
    if (!name || !description || !image || !toppings || !price) {
      return res.json({ message: "Please provide all required fields." });
    }

    // Check if toppings array is not empty
    if (!toppings || toppings.length === 0) {
      return res.json({ message: "Please add at least one topping." });
    }

    // Check if name, description, and image URL contain no white spaces
    if (
      !emptySpace.test(name) ||
      !emptySpace.test(description) ||
      !emptySpace.test(image)
    ) {
      return res.json({ message: "Whitespace is not allowed" });
    }

    // Create a new Burger instance
    const burger = new Burger({
      name,
      description,
      image,
      toppings,
      price,
      branch
    });

    // Save the burger item
    const savedBurger = await burger.save();
    res.json({ message: "Your Burger Item Successfully Created!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read burger items
const getBurger = async (req, res) => {
  try {
    // Retrieve all burger items from the database
    const burgers = await Burger.find();
    res.json(burgers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update or edit burger item
const updateBurger = async (req, res) => {
  try {
    const { id, updatedBurger } = req.body;

    // Find the burger item by ID and update it
    const updatedBurgerItem = await Burger.findByIdAndUpdate(id, updatedBurger, {
      new: true,
    });

    // If the burger item was not found, it will return null
    if (!updatedBurgerItem) {
      return res.status(404).json({ message: "Burger item not found" });
    }

    res.json({ message: "Your Burger Item Successfully Updated!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Is available showing
const burgerAvailableStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const updatedBurger = await Burger.findByIdAndUpdate(
      id,
      { isAvailable: status },
      { new: true }
    );

    if (!updatedBurger) {
      return res.status(404).json({ message: "Burger item not found" });
    }

    res.json({ message: "Your Burger Item Status Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete burger item
const deleteBurger = async (req, res) => {
  try {
    const { id } = req.body;

    // Find the burger item by ID and delete it
    await Burger.findByIdAndDelete(id);

    res.json({ message: "Your Burger Item Successfully Deleted!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  burgerAvailableStatus,
  createBurger,
  getBurger,
  deleteBurger,
  updateBurger,
};
