import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const AddContact = ({ addContactHandler }) => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    isFavorite: false,
    tags: []
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
            id="add-tags"
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
        Add Contact
      </button>
    </form>
  );
};

AddContact.propTypes = {
  addContactHandler: PropTypes.func.isRequired,
};

export default AddContact;
