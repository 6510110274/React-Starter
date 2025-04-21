const mongoose = require("mongoose");

const Order = new mongoose.Schema(
  {
    date:Date,
    product: [
      {
        product: {type:mongoose.Schema.Types.ObjectId, ref:"products"},
        quantity: Number,
      },
    ],
  },
  {
    timestamps: true,
  },
);


module.exports = mongoose.model("orders", Order);