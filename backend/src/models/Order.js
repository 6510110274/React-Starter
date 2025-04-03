const mongoose = require("mongoose");

const Order = new mongoose.Schema(
  {
    date:Date,
    product: [
      {
        product: {type:mongoose.Schema.Types.ObjectId, ref:"Product"},
        quantity: Number,
      },
    ],
  },
  {
    timestamps: true,
  },
);


module.exports = mongoose.model("oders", Order);