const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: [String],
    default: [],
  },
});

const Contact = mongoose.model("contact", ContactSchema);
module.exports = Contact;
