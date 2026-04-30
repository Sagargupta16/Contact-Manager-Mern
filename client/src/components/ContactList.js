import { useRef } from "react";
import PropTypes from "prop-types";
import ContactCard from "./ContactCard";

const ContactList = ({
  contacts,
  term,
  searchKeyword,
  filterFavorite,
  toggleFavoriteFilter,
  filterTags,
  allTags,
  toggleTagFilter,
  hasActiveFilters,
  resetFilters,
  onAdd,
  onView,
  onEdit,
  onDelete,
  onToggleFavorite,
}) => {
  const inputRef = useRef("");

  return (
    <div className="contact-list">
      <div className="contact-list-header">
        <div>
          <h1 className="contact-list-title">Contacts</h1>
          <span className="con-length">
            {contacts.length} {contacts.length === 1 ? "person" : "people"}
            {hasActiveFilters && " (filtered)"}
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
            placeholder="Search by name, email or tags..."
            className="Prompt"
            value={term}
            onChange={() => searchKeyword(inputRef.current.value)}
          />
        </div>
      </div>

      <div className="con-filter">
        <div className="filter-section">
          <span className="filter-label">Filter</span>
          <button
            className={`filter-toggle ${filterFavorite ? "active" : ""}`}
            onClick={toggleFavoriteFilter}
          >
            <i className="fas fa-star" />
            <span>Favorites</span>
          </button>
        </div>

        {allTags.length > 0 && (
          <div className="filter-section">
            <span className="filter-label">Tags</span>
            <div className="filter-tags">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`filter-tag ${filterTags.includes(tag) ? "active" : ""}`}
                  onClick={() => toggleTagFilter(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {hasActiveFilters && (
          <button className="filter-reset" onClick={resetFilters}>
            <i className="fas fa-times" />
            <span>Reset</span>
          </button>
        )}
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
              onToggleFavorite={onToggleFavorite}
            />
          ))
        ) : (
          <div className="con-list-empty">
            <i className="fas fa-address-book" />
            <p>
              {hasActiveFilters
                ? "No matches found for current filters"
                : term
                ? "No matches found"
                : "Your address book is empty"}
            </p>
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
      isFavorite: PropTypes.bool,
      tags: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  term: PropTypes.string.isRequired,
  searchKeyword: PropTypes.func.isRequired,
  filterFavorite: PropTypes.bool.isRequired,
  toggleFavoriteFilter: PropTypes.func.isRequired,
  filterTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  allTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleTagFilter: PropTypes.func.isRequired,
  hasActiveFilters: PropTypes.bool.isRequired,
  resetFilters: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func,
};

export default ContactList;
