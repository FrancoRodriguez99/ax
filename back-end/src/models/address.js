const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    tel: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

module.exports = mongoose.model("address", addressSchema);
