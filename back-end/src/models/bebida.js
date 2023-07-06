const mongoose = require("mongoose");

const bebidaSchema = mongoose.Schema({
  title: {
    type: String,
  },
  unidad: {
    type: String,
  },
  price: {
    type: Number,
  },
  img: {
    type: [String],
  },
  alcohol: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Bebida", bebidaSchema);
