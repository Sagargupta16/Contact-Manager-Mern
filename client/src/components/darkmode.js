import React, { useState, useEffect } from "react";

export default function DarkMode() {
  const [mode, setMode] = useState(["fas fa-moon"]);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || "light",
  );
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode === "dark") {
      document.body.classList.add("dark");
      setMode(["fas fa-sun"]);
    } else {
      document.body.classList.remove("dark");
      setMode(["fas fa-moon"]);
    }
  }, [darkMode]);
  return (
    <div className="style-switcher">
      <div className="day-night s-icon">
        <i
          className={mode}
          onClick={() => {
            if (document.body.classList.contains("dark")) {
              setMode("fas fa-sun");
              setDarkMode("light");
            } else {
              setMode("fas fa-moon");
              setDarkMode("dark");
            }
          }}
        ></i>
      </div>
    </div>
  );
}
