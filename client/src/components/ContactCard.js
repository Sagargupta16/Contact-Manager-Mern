import React from "react";
import { Link } from "react-router-dom";

const ContactCard = (props) => {
  const { _id, name, email } = props.contact;

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      props.clickHandler(props.contact);
    }
  };

  return (
    <div className="item">
      <img
        className="image-avtar"
        src="https://www.gravatar.com/avatar/?d=mp"
        alt="user"
      />
      <Link to={`/contact/${_id}`}>
        <div className="content">
          <div className="item-name">{name}</div>
          <div className="item-mail">{email}</div>
        </div>
      </Link>
      <Link to={{ pathname: `/edit/${_id}`, id: _id }}>
        <i className="edit-icon fa fa-edit" />
      </Link>
      <button
        className="remove-icon fa fa-remove"
        onClick={handleDelete}
        style={{ border: "none", background: "transparent", cursor: "pointer" }}
        aria-label={`Delete ${name}`}
      />
    </div>
  );
};

export default ContactCard;
