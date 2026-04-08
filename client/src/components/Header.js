import React from "react";

const Header = () => {
  return (
    <div className="header">
      <div className="Header-container">
        <h2>
          <i className="fas fa-book-open" style={{ color: "var(--accent)", marginRight: 10, fontSize: 16 }} />
          {"Contact Manager"}
        </h2>
      </div>
    </div>
  );
};

export default Header;
