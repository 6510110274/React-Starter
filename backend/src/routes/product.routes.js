const express = require("express")
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await Product.find();
    console.log("Find All Products");
    console.log(req.authData);
    res.json({ rows: result });
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

router.get("/:_id", async (req, res) => {
  const id = req.params._id; 
  console.log("Find One Product by custom id", id);
  try {
    const result = await Product.findOne({ _id: id }); 
    res.json(result);
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

router.post("/", async (req, res) => {
  console.log("Create Product Body", req.body);
  const newProduct = new Product(req.body);
  const authData = req.authData;
  try {
    await newProduct.save({});
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ err: error });
  }
});


router.put("/:_id", async (req, res) => {
  try {
    const result = await Product.updateOne({ _id: req.params._id }, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

router.delete("/:_id",async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params._id });
    res.status(204).json(result);
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

module.exports = router;