import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//fetch single products
//access public
//route GET api/products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//fetch single products
//access public
//route GET api/products/:id
const getProductsById = asyncHandler(async (req, res) => {
  const productItem = await Product.findById(req.params.id);

  if (productItem) res.json(productItem);
  else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

export { getProducts, getProductsById };
