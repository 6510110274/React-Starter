const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  stock: Number,
});

const Product = mongoose.model("products", schema);

module.exports = Product;
