const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  avatar: { type: String, required: true, default: "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg" },
  address: [
    {
      type: mongoose.Types.ObjectId,
      ref: "address",
    },
  ],
  bills: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Bill",
    },
  ],
  admin: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
