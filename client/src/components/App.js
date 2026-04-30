import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Toast.css";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import Modal from "./Modal";
import DarkMode from "./darkmode";

const API_URL = process.env.REACT_APP_API_URL || "";
const STORAGE_KEY = "contact_filter_state";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFavorite, setFilterFavorite] = useState(false);
  const [filterTags, setFilterTags] = useState([]);
  const [modal, setModal] = useState({ type: null, contact: null });

  const openModal = (type, contact = null) => setModal({ type, contact });
  const closeModal = () => setModal({ type: null, contact: null });

  const normalizeContact = (contact) => ({
    ...contact,
    isFavorite: typeof contact.isFavorite === "boolean" ? contact.isFavorite : false,
    tags: Array.isArray(contact.tags) ? contact.tags : [],
  });

  const getContacts = useCallback(async () => {
    try {
      const res = await axios.get(API_URL + "/api/contacts");
      if (Array.isArray(res.data)) {
        const normalizedContacts = res.data.map(normalizeContact);
        setContacts(normalizedContacts);
      }
    } catch {
      toast.error("Failed to fetch contacts!");
    }
  }, []);

  const addContactHandler = async (contact) => {
    try {
      await axios.post(API_URL + "/api/contacts", contact);
      getContacts();
      closeModal();
      toast.success("Contact added successfully!");
    } catch {
      toast.error("Failed to add contact!");
    }
  };

  const updateContactHandler = async (contact) => {
    try {
      await axios.put(API_URL + "/api/contacts/" + contact._id, contact);
      getContacts();
      closeModal();
      toast.success("Contact updated successfully!");
    } catch {
      toast.error("Failed to update contact!");
    }
  };

  const toggleFavoriteHandler = async (contact) => {
    try {
      const updatedContact = { ...contact, isFavorite: !contact.isFavorite };
      await axios.put(API_URL + "/api/contacts/" + contact._id, updatedContact);
      getContacts();
      toast.success(
        updatedContact.isFavorite
          ? `${contact.name} added to favorites!`
          : `${contact.name} removed from favorites!`
      );
    } catch {
      toast.error("Failed to update favorite status!");
    }
  };

  const removeContactHandler = async (contact) => {
    if (!window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      return;
    }
    try {
      await axios.delete(API_URL + "/api/contacts/" + contact._id);
      getContacts();
      toast.success("Contact deleted successfully!");
    } catch {
      toast.error("Failed to delete contact!");
    }
  };

  const searchHandler = (term) => {
    setSearchTerm(term);
    saveFilterState({ searchTerm: term, filterFavorite, filterTags });
  };

  const toggleFavoriteFilter = () => {
    const newFilterFavorite = !filterFavorite;
    setFilterFavorite(newFilterFavorite);
    saveFilterState({ searchTerm, filterFavorite: newFilterFavorite, filterTags });
  };

  const toggleTagFilter = (tag) => {
    const newFilterTags = filterTags.includes(tag)
      ? filterTags.filter((t) => t !== tag)
      : [...filterTags, tag];
    setFilterTags(newFilterTags);
    saveFilterState({ searchTerm, filterFavorite, filterTags: newFilterTags });
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilterFavorite(false);
    setFilterTags([]);
    clearFilterState();
    toast.success("Filters reset!");
  };

  const saveFilterState = (state) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Failed to save filter state to localStorage:", e);
    }
  };

  const loadFilterState = useCallback(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const state = JSON.parse(saved);
        if (state.searchTerm !== undefined) setSearchTerm(state.searchTerm);
        if (state.filterFavorite !== undefined) setFilterFavorite(state.filterFavorite);
        if (state.filterTags !== undefined && Array.isArray(state.filterTags)) {
          setFilterTags(state.filterTags);
        }
      }
    } catch (e) {
      console.warn("Failed to load filter state from localStorage:", e);
    }
  }, []);

  const clearFilterState = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Failed to clear filter state from localStorage:", e);
    }
  };

  const allTags = useMemo(() => {
    const tags = new Set();
    contacts.forEach((c) => {
      if (c.tags && Array.isArray(c.tags)) {
        c.tags.forEach((tag) => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, [contacts]);

  const displayedContacts = useMemo(() => {
    return contacts.filter((c) => {
      const matchesSearch = searchTerm.length === 0 ||
        (c.name + " " + c.email + " " + (c.tags || []).join(" "))
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesFavorite = !filterFavorite || (c.isFavorite === true);

      const matchesTags = filterTags.length === 0 ||
        filterTags.every((tag) => c.tags && c.tags.includes(tag));

      return matchesSearch && matchesFavorite && matchesTags;
    });
  }, [contacts, searchTerm, filterFavorite, filterTags]);

  useEffect(() => {
    loadFilterState();
    getContacts();
  }, [loadFilterState, getContacts]);

  const hasActiveFilters = searchTerm.length > 0 || filterFavorite || filterTags.length > 0;

  return (
    <div className="App-container">
      <Header />
      <ContactList
        contacts={displayedContacts}
        term={searchTerm}
        searchKeyword={searchHandler}
        filterFavorite={filterFavorite}
        toggleFavoriteFilter={toggleFavoriteFilter}
        filterTags={filterTags}
        allTags={allTags}
        toggleTagFilter={toggleTagFilter}
        hasActiveFilters={hasActiveFilters}
        resetFilters={resetFilters}
        onAdd={() => openModal("add")}
        onView={(contact) => openModal("detail", contact)}
        onEdit={(contact) => openModal("edit", contact)}
        onDelete={removeContactHandler}
        onToggleFavorite={toggleFavoriteHandler}
      />
      <DarkMode />

      {modal.type === "add" && (
        <Modal onClose={closeModal} title="Add Contact">
          <AddContact
            addContactHandler={addContactHandler}
            onClose={closeModal}
          />
        </Modal>
      )}

      {modal.type === "edit" && modal.contact && (
        <Modal onClose={closeModal} title="Edit Contact">
          <EditContact
            contact={modal.contact}
            updateContactHandler={updateContactHandler}
            onClose={closeModal}
          />
        </Modal>
      )}

      {modal.type === "detail" && modal.contact && (
        <Modal onClose={closeModal} title="Contact Details">
          <ContactDetail
            contact={modal.contact}
            onEdit={(contact) => openModal("edit", contact)}
          />
        </Modal>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        progressClassName="custom-progress-bar"
      />
    </div>
  );
}

export default App;
