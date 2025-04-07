import React, { useState, useEffect } from "react";
import PersonSelector from "./../PersonSelector";
import "./topbar.css";  // Importer CSS-filen for topbaren

const Topbar = ({ names, selectedPeople, setSelectedPeople }) => {
  const [rainbowMode, setRainbowMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("rainbow-mode", rainbowMode);
  }, [rainbowMode]);

  return (
    <div className="topbar">
      <div className="logo">Alkotracker 🍻</div>

      <div className="topbar-buttons">
        <button onClick={() => setRainbowMode(prev => !prev)}>
          {rainbowMode ? "🧘 Slå av bjaenemodus" : "🌈 Bjarnemodus"}
        </button>
      </div>

      {/* PersonSelector i topbaren */}
      <div className="topbar-personselector">
        <PersonSelector
          names={names}
          selectedPeople={selectedPeople}
          setSelectedPeople={setSelectedPeople}
        />
      </div>
    </div>
  );
};

export default Topbar;