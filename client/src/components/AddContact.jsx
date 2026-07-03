import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import TagInput from "./TagInput";

const AddContact = ({ addContactHandler }) => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    isFavorite: false,
    tags: []
  });

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
      <div className="form-group">
        <label className="form-label" htmlFor="add-phone">
          Phone
        </label>
        <input
          id="add-phone"
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
        <label className="form-label" htmlFor="add-tags">
          Tags
        </label>
        <TagInput
          id="add-tags"
          tags={contact.tags}
          onChange={(tags) => setContact({ ...contact, tags })}
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
