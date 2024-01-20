const Pizza = require("../../models/add-menu-items-models/pizzaSchema");

// Controller function to save a pizza item
const createPizza = async (req, res) => {
  try {
    const { name, description, image, toppings, prices, branch } = req.body;

    // Check if required fields are empty
    if (!name || !description || !image || !toppings || !prices) {
      return res.json({ message: "Please provide all required fields." });
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

    // Check if at least one topping is provided
    if (!toppings || toppings.length === 0) {
      return res.json({ message: "Please add at least one topping." });
    }

    // Create a new Pizza instance
    const pizza = new Pizza({
      name,
      description,
      image,
      toppings,
      prices,
      branch,
    });

    // Save the pizza item
    const savedPizza = await pizza.save();
    res.json({ message: "Your Pizza Item Successfully Created!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// read pizza items
const getPizza = async (req, res) => {
  try {
    // Retrieve all pizza items from the database
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update or edit
const updatePizza = async (req, res) => {
  try {
    const { id, updatedPizza } = req.body;

    // Find the pizza item by ID and update it
    const updatedPizzaItem = await Pizza.findByIdAndUpdate(id, updatedPizza, {
      new: true,
    });

    // If the pizza item was not found, it will return null

    res.json({ message: "Your Pizza Item Successfully Updated!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// is available showing
const pizzaAvailableStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const updatedPizza = await Pizza.findByIdAndUpdate(id, { isAvailable: status }, { new: true });

    if (!updatedPizza) {
      return res.status(404).json({ message: "Pizza not found" });
    }

    res.json({ message: "Your Product Status Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//   delete pizza
const deletePizza = async (req, res) => {
  try {
    const { id } = req.body;

    // Find the pizza item by ID and delete it
    await Pizza.findByIdAndDelete(id);

    res.json({ message: "Your Pizza Item Successfully Deleted!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  pizzaAvailableStatus,
  createPizza,
  getPizza,
  deletePizza,
  updatePizza,
};
