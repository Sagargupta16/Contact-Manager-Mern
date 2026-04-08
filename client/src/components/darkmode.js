import React, { useState, useEffect } from "react";

export default function DarkMode() {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || "light",
  );

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const toggle = () => {
    setDarkMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="style-switcher">
      <button className="day-night s-icon" onClick={toggle} aria-label="Toggle dark mode">
        <i className={darkMode === "dark" ? "fas fa-sun" : "fas fa-moon"} />
      </button>
    </div>
  );
}
