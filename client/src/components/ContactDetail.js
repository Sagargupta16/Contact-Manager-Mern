import React from "react";
import { Link, useLocation } from "react-router-dom";

const ContactDetail = (props) => {
  const location = useLocation();
  const _id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1,
  );
  const { name, email } = props.contacts.find((contact) => contact._id === _id);
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
          <div className="card-content-header">{name}</div>
          <div className="card-content-email">{email}</div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
