const Product = require("../models/productSchema");

async function createproduct(req, res, discount) {
  let { name, description, image, price } = req.body;

  if (!name) {
    return res.send({ error: "name is not define" });
  }
  if (!image) {
    return res.send({ error: "image is not define" });
  }
  if (!description) {
    return res.send({ error: "description is not define" });
  }
  if (!price) {
    return res.send({ error: "price is not define" });
  }

  let product = new Product({
    name,
    description,
    image,
    price,
  });

  await product.save();

  return res.send({ error: "product upload successfully" });
}

// get all products
async function allproducts(req, res) {
   const  authorizationHeader = await req.headers["authorization"];
  let productKey = process.env.GET_PRODUCT_KEY;

  if(authorizationHeader === productKey){
    let data = await Product.find({});
    return res.send(data);

  }else{
    return res.send({ error: "cannot get any product" })
  }

}

// update product

let editProduct = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      image,
      price
    } = req.body; // Get the ID and other update data from the request body

    // Find the product by ID and update it
    const updateProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        image,
        price
      },
      { new: true }
    );

    if (!updateProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Send the updated blog as a response
    res.status(200).json(updateProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};




// delete product
async function deleteProducts(req, res) {
  let { id } = req.body;
  let data = await Product.findByIdAndDelete(id);
  res.send({error: "product delete successfully"});
}

module.exports = { createproduct, allproducts, deleteProducts,editProduct };
