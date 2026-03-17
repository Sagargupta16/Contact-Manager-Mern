import React from "react";
import { Link, useParams } from "react-router-dom";

const ContactDetail = ({ contacts }) => {
  const { id } = useParams();
  const contact = contacts.find((c) => c._id === id);

  if (!contact) {
    return (
      <div className="main">
        <Link to="/">
          <button className="btn3">{"<"}</button>
        </Link>
        <div className="card">
          <div className="card-content">Contact not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      <Link to="/">
        <button className="btn3">{"<"}</button>
      </Link>
      <div className="card">
        <div className="card-image">
          <img src="https://www.gravatar.com/avatar/?d=mp" alt="user" />
        </div>
        <div className="card-content">
          <div className="card-content-header">{contact.name}</div>
          <div className="card-content-email">{contact.email}</div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
