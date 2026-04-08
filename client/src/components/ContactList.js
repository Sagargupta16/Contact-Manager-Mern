import { useRef } from "react";
import PropTypes from "prop-types";
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
          <span className="con-length">
            {contacts.length} {contacts.length === 1 ? "person" : "people"}
          </span>
        </div>
        <button className="btn-add" onClick={onAdd}>
          <i className="fas fa-plus" />
          {" New Contact"}
        </button>
      </div>

      <div className="con-search">
        <div className="con-search-input">
          <i className="fas fa-search" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by name or email..."
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
            <p>{term ? "No matches found" : "Your address book is empty"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
  ).isRequired,
  term: PropTypes.string.isRequired,
  searchKeyword: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactList;
