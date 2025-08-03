import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditContact = ({ contacts, updateContactHandler }) => {
  const [contact, setContact] = useState({
    _id: "",
    name: "",
    email: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const currentContact = contacts.find((contact) => contact._id === id);
    if (currentContact) {
      setContact(currentContact);
    }
  }, [id, contacts]);

  const update = async (e) => {
    e.preventDefault();
    if (contact.name === "" || contact.email === "") {
      toast.error("All fields are mandatory!");
      return;
    }
    try {
      await updateContactHandler(contact);
      setContact({ _id: "", name: "", email: "" });
      navigate("/");
    } catch (error) {
      // Error toast is handled in App.js
      console.log("Error in EditContact:", error);
    }
  };

  return (
    <div className="container-contact2">
      <Link to="/">
        <button className="btn3">{"<"}</button>
      </Link>
      <div className="wrap-contact2">
        <form className="contact2-form" onSubmit={update}>
          <span className="contact2-form-title">Edit Contact</span>
          <div className="wrap-input2">
            <input
              className="input2"
              placeholder="Name"
              type="text"
              name="name"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
            />
            <span className="focus-input2" data-placeholder="NAME"></span>
          </div>
          <div className="wrap-input2">
            <input
              className="input2"
              placeholder="Email"
              type="email"
              name="email"
              value={contact.email}
              onChange={(e) =>
                setContact({ ...contact, email: e.target.value })
              }
            />
            <span className="focus-input2" data-placeholder="EMAIL"></span>
          </div>
          <button className="btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditContact;
