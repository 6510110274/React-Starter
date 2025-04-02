const express = require("express")
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {

    try {
      const { name } = req.query; // รับค่าจาก query string
      if (name) {
        const result = await User.find({ name: { $regex: name, $options: "i" } });
        console.log("Find User by name", name);
        return res.json({ rows: result });
      }
      console.log("Find All Users");
      const result = await User.find();
      res.json({ rows: result });
    } catch (error) {
      res.status(404).json({ err: error });
    }
}); 

router.get("/:_id", async (req, res) => {
  const id = req.params._id; // แปลงเป็นตัวเลข
  console.log("Find One User by custom id", id);
  try {
    const result = await User.findOne({ _id: id }); // ใช้ id ที่คุณสร้างเอง
    res.json(result);
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

router.post("/", async (req, res) => {
  console.log("Create User Body", req.body);
  const newUser = new User(req.body);
  try {
    await newUser.save({});
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

router.put("/:_id", async (req, res) => {
  try {
    const result = await User.updateOne({ _id: req.params._id }, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

router.delete("/:_id",async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params._id });
    res.status(204).json(result);
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

module.exports = router;