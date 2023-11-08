import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
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
  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");
      setContacts(res.data);
    } catch (err) {
      console.log("Error from ContactList", err);
    }
  };

  const addContactHandler = async (contact) => {
    try {
      await axios.post("/api/contacts", contact);
      getContacts();
    } catch (err) {
      console.log("Error from AddContact", err);
    }
  };

  const updateContactHandler = async (contact) => {
    try {
      await axios.put("/api/contacts/" + contact._id, contact);
      getContacts();
    } catch (err) {
      console.log("Error from UpdateContactInfo", err);
    }
  };

  const removeContactHandler = async (contact) => {
    try {
      await axios.delete("/api/contacts/" + contact._id, contact);
      getContacts();
    } catch (err) {
      console.log("Error from RemoveContact", err);
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
    </div>
  );
}

export default App;
