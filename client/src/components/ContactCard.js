import PropTypes from "prop-types";
import { getGradient } from "./gradients";

const ContactCard = ({ contact, onView, onEdit, onDelete, onToggleFavorite }) => {
  const { name, email, isFavorite, tags } = contact;
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className={`item ${isFavorite ? "favorite" : ""}`}>
      <button
        className="item-link"
        onClick={onView}
        aria-label={`View ${name}`}
      />
      <div className="avatar" style={{ background: getGradient(name) }}>
        {initial}
      </div>
      <div className="content">
        <div className="item-name">
          {name}
          {isFavorite && <i className="fas fa-star favorite-icon" />}
        </div>
        <div className="item-mail">{email}</div>
        {tags && tags.length > 0 && (
          <div className="item-tags">
            {tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="item-tag">{tag}</span>
            ))}
            {tags.length > 3 && (
              <span className="item-tag-more">+{tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
      <div className="item-actions">
        <button
          className={`icon-btn favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite && onToggleFavorite(contact);
          }}
          aria-label={isFavorite ? `Unfavorite ${name}` : `Favorite ${name}`}
        >
          <i className={`${isFavorite ? "fas" : "far"} fa-star`} />
        </button>
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
    isFavorite: PropTypes.bool,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func,
};

export default ContactCard;
