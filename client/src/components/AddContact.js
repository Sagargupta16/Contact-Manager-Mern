import React from "react";
import { Link } from "react-router-dom";

class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
  };
  add = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("All Field are Mandatory");
      return;
    }
    this.props.addContactHandler(this.state);
    this.setState({ name: "", email: "" });
  };
  render() {
    return (
      <div className="container-contact2">
        <Link to="/">
          <button className="btn3">{"<"}</button>
        </Link>
        <div className="wrap-contact2">
          <form className="contact2-form" onSubmit={this.add}>
            <span className="contact2-form-title">Add Contact</span>
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
            <button className="btn">Add</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddContact;
