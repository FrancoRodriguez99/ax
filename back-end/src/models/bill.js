const mongoose = require("mongoose");

const billSchema = mongoose.Schema({
  fecha: {
    type: Date,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  total: {
    type: Number,
  },
  items: {
    productos: [
      {
        producto: { type: mongoose.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    extra: [
      {
        extra: { type: mongoose.Types.ObjectId, ref: "extra" },
        quantity: Number,
      },
    ],
    bebida: [
      {
        bebida: { type: mongoose.Types.ObjectId, ref: "Bebida" },
        quantity: Number,
      },
    ],
  },
  address: {
    type: mongoose.Types.ObjectId,
    ref: "address",
    required: true,
  },
  pagado: {
    type: Boolean,
    default: false,
  },
  entregado: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: null,
  },
  mpid: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("Bill", billSchema);
