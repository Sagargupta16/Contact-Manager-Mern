import React from "react";

// Generate a warm gradient pair from the contact name for avatar uniqueness
const GRADIENT_PAIRS = [
  ["#c2704e", "#d4a574"],
  ["#8b6d5c", "#b8977e"],
  ["#a85d3e", "#c98b6a"],
  ["#9b7653", "#c4a882"],
  ["#b5654a", "#dab894"],
  ["#7a6352", "#a89078"],
];

const getGradient = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.codePointAt(i) + ((hash << 5) - hash);
  }
  const pair = GRADIENT_PAIRS[Math.abs(hash) % GRADIENT_PAIRS.length];
  return `linear-gradient(135deg, ${pair[0]}, ${pair[1]})`;
};

const ContactCard = ({ contact, onView, onEdit, onDelete }) => {
  const { name, email } = contact;
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="item" onClick={onView}>
      <div className="avatar" style={{ background: getGradient(name) }}>
        {initial}
      </div>
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
