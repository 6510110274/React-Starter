const express = require("express")
const Order = require("../models/Order");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await Order.find().populate("product.product"); // ใช้ populate
    console.log("Find All Orders");
    console.log(result);
    res.json({ rows: result });
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

router.get("/:_id", async (req, res) => {
  const id = req.params._id; // แปลงเป็นตัวเลข
  console.log("Find One Order by custom id", id);
  try {
    const result = await Order.findOne({ _id: id }).populate("product.product"); // ใช้ populate
    if (!result) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(404).json({ err: error });
  }
});

router.post("/", async (req, res) => {
  console.log("Create Order Body", req.body);
  const newOrder = new Order(req.body);
  try {
    await newOrder.save({});
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(400).json({ err: error });
  }
});


router.put("/:_id", async (req, res) => {
  try {
    const result = await Order.updateOne({ _id: req.params._id }, req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(404).json({ err: error });
  }
});

router.delete("/:_id",async (req, res) => {
  try {
    const result = await Order.deleteOne({ _id: req.params._id });
    res.status(204).json(result);
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(404).json({ err: error });
  }
});

module.exports = router;