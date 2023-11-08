import React from "react";
import { Link } from "react-router-dom";

class EditContact extends React.Component {
  constructor(props) {
    super(props);
    const location = window.location;
    const _id = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1,
    );
    const { name, email } = props.contacts.find(
      (contacts) => contacts._id === _id,
    );
    this.state = {
      _id: _id,
      name: name,
      email: email,
    };
  }
  update = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("All Field are Mandatory");
      return;
    }
    this.props.updateContactHandler(this.state);
    this.setState({ _id: "", name: "", email: "" });
  };
  render() {
    return (
      <div className="container-contact2">
        <Link to="/">
          <button className="btn3">{"<"}</button>
        </Link>
        <div className="wrap-contact2">
          <form className="contact2-form" onSubmit={this.update}>
            <span className="contact2-form-title">Edit Contact</span>
            <div className="wrap-input2">
              <input
                className="input2"
                placeholder="Name"
                type="text"
                name="name"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
              <span className="focus-input2" data-placeholder="NAME"></span>
            </div>
            <div className="wrap-input2">
              <input
                className="input2"
                placeholder="Email"
                type="email"
                name="email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
              <span className="focus-input2" data-placeholder="EMAIL"></span>
            </div>
            <button className="btn">Update</button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditContact;
