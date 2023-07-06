const Mensaje = require("../models/contact");
const mongoose = require("mongoose");

const contacto = async (req, res) => {
  try {
    const nuevomsg = new Mensaje({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      contactData: req.body.contactData,
      msg: req.body.msg,
    });
    await nuevomsg.save();
    res.status(201).json({ message: "ok" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

const getContacto = async (req, res) => {
  try {
    const nuevomsg = Mensaje.find();
    res.status(201).json({ nuevomsg });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = { contacto, getContacto };
