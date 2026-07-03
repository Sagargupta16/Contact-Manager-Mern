import React, { useState, useEffect } from "react";

export default function DarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("darkMode")) || "light";
    } catch (e) {
      console.warn("Failed to load dark mode from localStorage:", e);
      return "light";
    }
  });

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
