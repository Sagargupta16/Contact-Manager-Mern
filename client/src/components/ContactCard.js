import PropTypes from "prop-types";
import { getGradient } from "./gradients";

const ContactCard = ({ contact, onView, onEdit, onDelete }) => {
  const { name, email } = contact;
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="item">
      <button
        className="item-link"
        onClick={onView}
        aria-label={`View ${name}`}
      />
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
          onClick={onEdit}
          aria-label={`Edit ${name}`}
        >
          <i className="fas fa-pen" />
        </button>
        <button
          className="icon-btn delete"
          onClick={onDelete}
          aria-label={`Delete ${name}`}
        >
          <i className="fas fa-trash-alt" />
        </button>
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactCard;
