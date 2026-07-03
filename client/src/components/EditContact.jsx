import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import TagInput from "./TagInput";

const EditContact = ({ contact: initialContact, updateContactHandler }) => {
  const [contact, setContact] = useState({
    ...initialContact,
    isFavorite: typeof initialContact.isFavorite === "boolean" ? initialContact.isFavorite : false,
    tags: Array.isArray(initialContact.tags) ? initialContact.tags : []
  });

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
      <div className="form-group">
        <label className="form-label" htmlFor="edit-phone">
          Phone
        </label>
        <input
          id="edit-phone"
          className="form-input"
          type="tel"
          placeholder="123-456-7890"
          value={contact.phone || ""}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label className="form-checkbox-label">
          <input
            type="checkbox"
            checked={contact.isFavorite}
            onChange={(e) => setContact({ ...contact, isFavorite: e.target.checked })}
          />
          <span>Add to Favorites</span>
        </label>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="edit-tags">
          Tags
        </label>
        <TagInput
          id="edit-tags"
          tags={contact.tags}
          onChange={(tags) => setContact({ ...contact, tags })}
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
    isFavorite: PropTypes.bool,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  updateContactHandler: PropTypes.func.isRequired,
};

export default EditContact;
