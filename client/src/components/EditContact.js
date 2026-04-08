import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const EditContact = ({ contact: initialContact, updateContactHandler }) => {
  const [contact, setContact] = useState({ ...initialContact });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contact.name === "" || contact.email === "") {
      toast.error("All fields are mandatory!");
      return;
    }
    await updateContactHandler(contact);
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="edit-name">
          Name
        </label>
        <input
          id="edit-name"
          className="form-input"
          type="text"
          placeholder="John Doe"
          value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="edit-email">
          Email
        </label>
        <input
          id="edit-email"
          className="form-input"
          type="email"
          placeholder="john@example.com"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
        />
      </div>
      <button className="btn-primary" type="submit">
        Save Changes
      </button>
    </form>
  );
};

EditContact.propTypes = {
  contact: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  updateContactHandler: PropTypes.func.isRequired,
};

export default EditContact;
