const mongoose = require("mongoose");

const extraSchema = mongoose.Schema({
  title: {
    type: String,
  },
  unidad: {
    type: String,
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
  price: {
    type: Number,
  },
  img: {
    type: [String],
  },
  sub_type: {
    type: String,
  },
});

module.exports = mongoose.model("extra", extraSchema);
