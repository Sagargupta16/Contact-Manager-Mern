import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Toast.css";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact.js";
import EditContact from "./EditContact.js";
import ContactList from "./ContactList.js";
import DarkMode from "./darkmode.js";
import ContactDetail from "./ContactDetail";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");
      setContacts(res.data);
    } catch (err) {
      console.log("Error from ContactList", err);
      toast.error("Failed to fetch contacts!");
    }
  };

  const addContactHandler = async (contact) => {
    setIsLoading(true);
    try {
      await axios.post("/api/contacts", contact);
      getContacts();
      toast.success("Contact added successfully!");
    } catch (err) {
      console.log("Error from AddContact", err);
      toast.error("Failed to add contact!");
    } finally {
      setIsLoading(false);
    }
  };

  const updateContactHandler = async (contact) => {
    setIsLoading(true);
    try {
      await axios.put("/api/contacts/" + contact._id, contact);
      getContacts();
      toast.success("Contact updated successfully!");
    } catch (err) {
      console.log("Error from UpdateContactInfo", err);
      toast.error("Failed to update contact!");
    } finally {
      setIsLoading(false);
    }
  };

  const removeContactHandler = async (contact) => {
    setIsLoading(true);
    try {
      const response = await axios.delete("/api/contacts/" + contact._id);
      console.log("Delete successful:", response.data);
      getContacts();
      toast.success("Contact deleted successfully!");
    } catch (err) {
      console.error("Error from RemoveContact:", err);
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
      }
      toast.error("Failed to delete contact!");
    } finally {
      setIsLoading(false);
    }
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm.length > 0) {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact.name + " " + contact.email)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);
  return (
    <div className="App-container">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ContactList
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                getContactID={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            }
          />
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route
            path="/edit/:id"
            element={
              <EditContact
                contacts={contacts}
                updateContactHandler={updateContactHandler}
              />
            }
          />
          <Route
            path="/contact/:id"
            element={<ContactDetail contacts={contacts} />}
          />
        </Routes>
        <DarkMode />
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        progressClassName="custom-progress-bar"
        transition={undefined}
      />
    </div>
  );
}

export default App;
