import React, { useState, useEffect } from "react";
import "./topbar.css";  // Importer CSS-filen for topbaren

const Topbar = () => {
  // Dark Mode: lagre i localStorage
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [rainbowMode, setRainbowMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    document.body.classList.toggle("rainbow-mode", rainbowMode);
  }, [rainbowMode]);

  return (
    <div className="topbar">
      <div className="logo">Alkotracker 🍻</div>
      
      <div className="topbar-buttons">
        <button onClick={() => setDarkMode(prev => !prev)}>
          {darkMode ? "☀️ Lys modus" : "🌙 Mørk modus"}
        </button>
        <button onClick={() => setRainbowMode(prev => !prev)}>
          {rainbowMode ? "🧘 Slå av rainbow mode" : "🌈 Bjarnemodus"}
        </button>

        {/* Ny knapp for regnearket */}
        <button 
          onClick={() => window.open("https://docs.google.com/spreadsheets/d/1ftksoHSA3AMyiKtpzCHwnfQV9pXO7ja-VN5nes1hOUk/edit?usp=sharing", "_blank")}
          className="topbar-buttons-button"
        >
          📊 Regnearket
        </button>
      </div>
    </div>
  );
};

export default Topbar;
