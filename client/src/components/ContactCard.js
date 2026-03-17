import React from "react";

const ContactCard = ({ contact, onView, onEdit, onDelete }) => {
  const { name, email } = contact;
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="item" onClick={onView}>
      <div className="avatar">{initial}</div>
      <div className="content">
        <div className="item-name">{name}</div>
        <div className="item-mail">{email}</div>
      </div>
      <div className="item-actions">
        <button
          className="icon-btn edit"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          aria-label={`Edit ${name}`}
        >
          <i className="fas fa-pen" />
        </button>
        <button
          className="icon-btn delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          aria-label={`Delete ${name}`}
        >
          <i className="fas fa-trash-alt" />
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
