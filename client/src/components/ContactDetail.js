import PropTypes from "prop-types";
import { getGradient } from "./gradients";

const ContactDetail = ({ contact, onEdit }) => {
  const initial = contact.name.charAt(0).toUpperCase();

  return (
    <div className="detail-view">
      <div className="detail-avatar" style={{ background: getGradient(contact.name) }}>
        {initial}
      </div>
      <h2 className="detail-name">{contact.name}</h2>
      <a className="detail-email" href={`mailto:${contact.email}`}>
        {contact.email}
      </a>
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
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ContactDetail;
