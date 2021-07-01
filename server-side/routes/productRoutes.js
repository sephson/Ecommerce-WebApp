import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
const router = express.Router();

//fetch single products
//access public
//route GET api/products
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

//fetch single products
//access public
//route GET api/products/:id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const productItem = await Product.findById(req.params.id);

    if (productItem) res.json(productItem);
    else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  })
);

export default router;
