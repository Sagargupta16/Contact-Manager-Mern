import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const AddContact = ({ addContactHandler }) => {
  const [contact, setContact] = useState({ name: "", email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contact.name === "" || contact.email === "") {
      toast.error("All fields are mandatory!");
      return;
    }
    await addContactHandler(contact);
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="add-name">
          Name
        </label>
        <input
          id="add-name"
          className="form-input"
          type="text"
          placeholder="John Doe"
          value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="add-email">
          Email
        </label>
        <input
          id="add-email"
          className="form-input"
          type="email"
          placeholder="john@example.com"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
        />
      </div>
      <button className="btn-primary" type="submit">
        Add Contact
      </button>
    </form>
  );
};

AddContact.propTypes = {
  addContactHandler: PropTypes.func.isRequired,
};

export default AddContact;
