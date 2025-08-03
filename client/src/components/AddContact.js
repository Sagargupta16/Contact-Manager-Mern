import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddContact = ({ addContactHandler }) => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();

  const add = async (e) => {
    e.preventDefault();
    if (contact.name === "" || contact.email === "") {
      toast.error("All fields are mandatory!");
      return;
    }
    try {
      await addContactHandler(contact);
      setContact({ name: "", email: "" });
      navigate("/");
    } catch (error) {
      // Error toast is handled in App.js
      console.log("Error in AddContact:", error);
    }
  };

  return (
    <div className="container-contact2">
      <Link to="/">
        <button className="btn3">{"<"}</button>
      </Link>
      <div className="wrap-contact2">
        <form className="contact2-form" onSubmit={add}>
          <span className="contact2-form-title">Add Contact</span>
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
          <button className="btn">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
