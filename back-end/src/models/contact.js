const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactData: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
