import React, { useState} from "react";
import useSheetData from "./hooks/useSheetData";
import getStatsForAllPersons from "./utils/analyze/getStatsForAllPersons";
import Tabs from "./components/Tabs";
import WeeklyOverview from "./components/WeeklyOverview";
import MainOverview from "./components/MainOverview";
import logo from './images/logo1.png';  // Her importerer vi logoen
import Topbar from "./components/TopBar/TopBar";

function App() {
  const data = useSheetData();

  // State for valgt person og visning
  const [selectedPeople, setSelectedPeople] = useState(data?.names || []);
  const [showTotal, setShowTotal] = useState(true);
  const [showAvg, setShowAvg] = useState(true);
  const [showWeeklyAvg, setShowWeeklyAvg] = useState(true);  // Ny state for ukentlig snitt
  const [showMonthlyAvg, setShowMonthlyAvg] = useState(true);  // Ny state for månedlig snitt
  const [showYearlyAvg, setShowYearlyAvg] = useState(true);  // Ny state for årlig snitt
  const [sortBy, setSortBy] = useState("total");
  const [sortDirection, setSortDirection] = useState("desc");
  const [activeTab, setActiveTab] = useState("daily");

  // Sorteringslogikk
  function handleSortChange(column) {
    if (sortBy === column) {
      setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortDirection("desc"); // reset på ny kolonne
    }
  }

  if (!data) {
    // Lastesymbol og logo mens dataene hentes
    return (
      <div className="loading-screen">
        <img src={logo} alt="Logo" className="loading-logo" />
        <div className="spinner"></div>
        <p>Henter alle pilsene du har loggført... bare vent litt din utålmodige alkis</p>
      </div>
    );
  }

  const allStats = getStatsForAllPersons(data);
  const filtered = selectedPeople.length
    ? allStats.filter(p => selectedPeople.includes(p.name))
    : allStats;

  // Sorter statistikken etter den valgte kolonnen og retningen
  const sortedStats = filtered.sort((a, b) => {
    const aValue = parseFloat(a[sortBy]); // Konverter til tall
    const bValue = parseFloat(b[sortBy]); // Konverter til tall

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const mainContentStyle = {
    marginTop: "70px", // Juster dette etter høyden på topbaren
    padding: "20px", // Ekstra padding for bedre plassering
  };

  return (
    <div>
      <Topbar />
      {/* Tab navigation */}
      <div style={mainContentStyle}>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />


        {/* Daglig Oversikt (Main) */}
        {activeTab === "daily" && (
          <MainOverview
            data={data}
            selectedPeople={selectedPeople}
            showTotal={showTotal}
            showAvg={showAvg}
            showWeeklyAvg={showWeeklyAvg}  // Send ukentlig snitt til MainOverview
            showMonthlyAvg={showMonthlyAvg}  // Send månedlig snitt til MainOverview
            showYearlyAvg={showYearlyAvg}  // Send årlig snitt til MainOverview
            sortBy={sortBy}
            sortDirection={sortDirection}
            handleSortChange={handleSortChange}
            setSelectedPeople={setSelectedPeople}
            setShowTotal={setShowTotal}
            setShowAvg={setShowAvg}
            setShowWeeklyAvg={setShowWeeklyAvg}  // Sette ukentlig snitt
            setShowMonthlyAvg={setShowMonthlyAvg}  // Sette månedlig snitt
            setShowYearlyAvg={setShowYearlyAvg}  // Sette årlig snitt
            filtered={sortedStats} 
            allStats={allStats}
          />
        )}

        {/* Ukentlig Oversikt */}
        {activeTab === "weekly" && <WeeklyOverview />}
      </div>
    </div>
  );
}

export default App;
