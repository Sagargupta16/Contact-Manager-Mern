import { useState, useEffect, useCallback } from "react";
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

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [modal, setModal] = useState({ type: null, contact: null });

  const openModal = (type, contact = null) => setModal({ type, contact });
  const closeModal = () => setModal({ type: null, contact: null });

  const getContacts = useCallback(async () => {
    try {
      const res = await axios.get(API_URL + "/api/contacts");
      if (Array.isArray(res.data)) {
        setContacts(res.data);
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
    if (term.length > 0) {
      setSearchResults(
        contacts.filter((c) =>
          (c.name + " " + c.email).toLowerCase().includes(term.toLowerCase()),
        ),
      );
    } else {
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const displayedContacts = searchTerm.length > 0 ? searchResults : contacts;

  return (
    <div className="App-container">
      <Header />
      <ContactList
        contacts={displayedContacts}
        term={searchTerm}
        searchKeyword={searchHandler}
        onAdd={() => openModal("add")}
        onView={(contact) => openModal("detail", contact)}
        onEdit={(contact) => openModal("edit", contact)}
        onDelete={removeContactHandler}
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
