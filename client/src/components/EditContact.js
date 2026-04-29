import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const EditContact = ({ contact: initialContact, updateContactHandler }) => {
  const [contact, setContact] = useState({
    ...initialContact,
    isFavorite: initialContact.isFavorite || false,
    tags: initialContact.tags || []
  });
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagInput.trim().replace(",", "");
      if (newTag && !contact.tags.includes(newTag)) {
        setContact({ ...contact, tags: [...contact.tags, newTag] });
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setContact({
      ...contact,
      tags: contact.tags.filter(tag => tag !== tagToRemove)
    });
  };

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
        <div className="tags-container">
          {contact.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
              <button
                type="button"
                className="tag-remove"
                onClick={() => handleRemoveTag(tag)}
              >
                &times;
              </button>
            </span>
          ))}
          <input
            id="edit-tags"
            className="tag-input"
            type="text"
            placeholder="Enter tag and press Enter"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
          />
        </div>
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
