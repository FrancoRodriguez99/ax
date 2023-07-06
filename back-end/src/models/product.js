const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
  },
  unidad: {
    type: String,
  },
  price: {
    type: [Number],
  },
  extras: [
    {
      type: mongoose.Types.ObjectId,
      ref: "extra",
    },
  ],
  img: {
    type: [String],
  },
});

module.exports = mongoose.model("Product", productSchema);
