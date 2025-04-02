const express = require("express")
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
    console.log("Find All Users");
    try {
      const result = await User.find();
      res.json({ rows: result });
    } catch (error) {
      res.status(404).json({ err: error });
    }
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id); // แปลงเป็นตัวเลข
  console.log("Find One User by custom id", id);
  try {
    const result = await User.findOne({ id: id }); // ใช้ id ที่คุณสร้างเอง
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


module.exports = router;