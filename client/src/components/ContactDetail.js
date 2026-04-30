import PropTypes from "prop-types";
import { getGradient } from "./gradients";

const ContactDetail = ({ contact, onEdit }) => {
  const initial = contact.name.charAt(0).toUpperCase();
  const { isFavorite, tags, phone } = contact;

  return (
    <div className="detail-view">
      <div className="detail-avatar" style={{ background: getGradient(contact.name) }}>
        {initial}
      </div>
      <h2 className="detail-name">
        {contact.name}
        {isFavorite && <i className="fas fa-star favorite-icon" />}
      </h2>
      <a className="detail-email" href={`mailto:${contact.email}`}>
        {contact.email}
      </a>
      {phone && <div className="detail-phone">{phone}</div>}
      {tags && tags.length > 0 && (
        <div className="detail-tags">
          {tags.map((tag, index) => (
            <span key={index} className="detail-tag">{tag}</span>
          ))}
        </div>
      )}
      <button className="btn-secondary" onClick={() => onEdit(contact)}>
        <i className="fas fa-pen" />
        {" Edit Contact"}
      </button>
    </div>
  );
};

ContactDetail.propTypes = {
  contact: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string,
    isFavorite: PropTypes.bool,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ContactDetail;
