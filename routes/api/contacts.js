// routes/api/contacts.js

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Contact = require("../../models/Contact");

const jsonParser = bodyParser.json();

// @route GET api/contacts/test
// @description tests contacts route
// @access Public
router.get("/test", (req, res) => res.send("Contact route testing!"));

// @route GET api/contacts
// @description Get all contacts
// @access Public
router.get("/", (req, res) => {
  Contact.find()
    .then((contacts) => res.json(contacts))
    .catch((err) =>
      res.status(404).json({ nocontactsfound: "No contacts found" }),
    );
});

// @route GET api/contacts/:id
// @description Get single Contact by id
// @access Public
router.get("/contact/:id", (req, res) => {
  Contact.findById(req.params.id)
    .then((Contact) => res.json(Contact))
    .catch((err) =>
      res.status(404).json({ nocontactsfound: "No Contact found" }),
    );
});

// @route GET api/contacts
// @description add/save Contact
// @access Public
router.post("/", jsonParser, function (req, res) {
  const { name, email, phone } = req.body;
  Contact.create({ name, email, phone })
    .then((contact) => res.json({ msg: "Contact added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this Contact" }),
    );
});

// @route GET api/contacts/:id
// @description Update Contact
// @access Public
router.put("/:id", jsonParser, function (req, res) {
  const { name, email, phone } = req.body;
  Contact.findByIdAndUpdate(req.params.id, { name, email, phone })
    .then((contact) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" }),
    );
});

// @route DELETE api/contacts/:id
// @description Delete Contact by id
// @access Public
router.delete("/:id", jsonParser, function (req, res) {
  const contactId = req.params.id;

  // Check if the provided ID is a valid MongoDB ObjectId
  if (!contactId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: "Invalid contact ID format" });
  }

  Contact.findByIdAndDelete(contactId)
    .then((contact) => {
      if (!contact) {
        return res.status(404).json({ error: "No such Contact found" });
      }
      res.json({ msg: "Contact entry deleted successfully" });
    })
    .catch((err) => {
      console.error("Delete error:", err);
      res.status(500).json({ error: "Unable to delete the Contact" });
    });
});

module.exports = router;
