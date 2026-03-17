import React, { useRef } from "react";
import ContactCard from "./ContactCard";

const ContactList = ({
  contacts,
  term,
  searchKeyword,
  onAdd,
  onView,
  onEdit,
  onDelete,
}) => {
  const inputRef = useRef("");

  return (
    <div className="contact-list">
      <div className="contact-list-header">
        <div>
          <h1 className="contact-list-title">Contacts</h1>
          <span className="con-length">{contacts.length} contacts</span>
        </div>
        <button className="btn-add" onClick={onAdd}>
          <i className="fas fa-plus" /> Add
        </button>
      </div>

      <div className="con-search">
        <div className="con-search-input">
          <i className="fas fa-search" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search contacts..."
            className="Prompt"
            value={term}
            onChange={() => searchKeyword(inputRef.current.value)}
          />
        </div>
      </div>

      <div className="con-list">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <ContactCard
              key={contact._id}
              contact={contact}
              onView={() => onView(contact)}
              onEdit={() => onEdit(contact)}
              onDelete={() => onDelete(contact)}
            />
          ))
        ) : (
          <div className="con-list-empty">
            <i className="fas fa-address-book" />
            <p>No contacts found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;
