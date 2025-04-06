import React, { useState, useEffect, useMemo } from "react";
import useSheetsheetData from "./hooks/useSheetData";
import getStatsForAllPersons from "./utils/analyze/getStatsForAllPersons";
import Tabs from "./components/Tabs";
import WeeklyOverview from "./components/WeeklyOverview";
import MainOverview from "./components/MainOverview";
import logo from './images/logo.png';
import Topbar from "./components/TopBar/TopBar";

function App() {
  const sheetData = useSheetsheetData();

  const [selectedPeople, setSelectedPeople] = useState([]);
  const [activeTab, setActiveTab] = useState("daily");

  // Sett alle personer som valgt når sheetData er tilgjengelig
  useEffect(() => {
    if (sheetData?.names?.length && selectedPeople.length === 0) {
      setSelectedPeople(sheetData.names);
    }
  }, [sheetData, selectedPeople.length]);

  const statsPerPerson = useMemo(() => {
    return sheetData ? getStatsForAllPersons(sheetData) : [];
  }, [sheetData]);

  if (!sheetData) {
    return (
      <div className="loading-screen">
        <img src={logo} alt="Logo" className="loading-logo" />
        <div className="spinner"></div>
        <p>Henter alle pilsene du har loggført... bare vent litt din utålmodige alkis</p>
      </div>
    );
  }

  return (
    <div>
      <Topbar
        names={sheetData.names}
        selectedPeople={selectedPeople}
        setSelectedPeople={setSelectedPeople}
      />
      <div className="main-content">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "daily" && (
          <MainOverview
            sheetData={sheetData}
            selectedPeople={selectedPeople}
            setSelectedPeople={setSelectedPeople}
            statsPerPerson={statsPerPerson}
          />
        )}

        {activeTab === "weekly" && <WeeklyOverview />}
      </div>
    </div>
  );
}

export default App;