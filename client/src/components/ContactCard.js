import React from "react";
import { Link } from "react-router-dom";

const ContactCard = (props) => {
  const { _id, name, email } = props.contact;
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
      <i
        className="remove-icon fa fa-remove"
        onClick={() => props.clickHandler(props.contact)}
      />
    </div>
  );
};

export default ContactCard;
