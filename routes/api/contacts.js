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
  Contact.create(req.body)
    .then((contact) => res.json({ msg: "Contact added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this Contact" }),
    );
});

// @route GET api/contacts/:id
// @description Update Contact
// @access Public
router.put("/:id", jsonParser, function (req, res) {
  Contact.findByIdAndUpdate(req.params.id, req.body)
    .then((contact) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" }),
    );
});

// @route GET api/contacts/:id
// @description Delete Contact by id
// @access Public
router.delete("/:id", jsonParser, function (req, res) {
  Contact.findByIdAndRemove(req.params.id, req.body)
    .then((Contact) => res.json({ mgs: "Contact entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a Contact" }));
});

module.exports = router;
