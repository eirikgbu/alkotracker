import React from "react";
import StatTable from "./StatTable";

export default function MainOverview({
  data,
  selectedPeople,
  showTotal,
  showAvg,
  showWeeklyAvg,  // Legg til for ukentlig snitt
  showMonthlyAvg,  // Legg til for månedlig snitt
  showYearlyAvg,  // Legg til for årlig snitt
  sortBy,
  sortDirection,
  handleSortChange,
  setSelectedPeople,
  setShowTotal,
  setShowAvg,
  setShowWeeklyAvg,
  setShowMonthlyAvg,  // Legg til for månedlig snitt
  setShowYearlyAvg,  // Legg til for årlig snitt
  filtered,
  allStats
}) {
  return (
    <>
      {/* Velg personer */}
      <div>
        {data.names.map((name) => (
          <label key={name}>
            <input
              type="checkbox"
              checked={selectedPeople.includes(name)}
              onChange={() => {
                setSelectedPeople((prev) =>
                  prev.includes(name)
                    ? prev.filter((n) => n !== name)
                    : [...prev, name]
                );
              }}
            />
            {name}
          </label>
        ))}
        {selectedPeople.length !== data.names.length && (
          <button onClick={() => setSelectedPeople([...data.names])}>
            Velg alle
          </button>
        )}
      </div>

      {/* Velg visning og sortering */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={showTotal}
            onChange={() => setShowTotal(!showTotal)}
          />
          Vis totalt
        </label>
        <label>
          <input
            type="checkbox"
            checked={showAvg}
            onChange={() => setShowAvg(!showAvg)}
          />
          Vis snitt
        </label>
        <label>
          <input
            type="checkbox"
            checked={showWeeklyAvg}  // Legg til for ukentlig snitt
            onChange={() => setShowWeeklyAvg(!showWeeklyAvg)}
          />
          Vis ukentlig snitt
        </label>
        <label>
          <input
            type="checkbox"
            checked={showMonthlyAvg}  // Legg til for månedlig snitt
            onChange={() => setShowMonthlyAvg(!showMonthlyAvg)}
          />
          Vis månedlig snitt
        </label>
        <label>
          <input
            type="checkbox"
            checked={showYearlyAvg}  // Legg til for årlig snitt
            onChange={() => setShowYearlyAvg(!showYearlyAvg)}
          />
          Vis antatt antall pils i år
        </label>
      </div>

      {/* Tabell */}
      <StatTable
        stats={filtered}
        showTotal={showTotal}
        showAvg={showAvg}
        showWeeklyAvg={showWeeklyAvg}  // Send ukentlig snitt til tabellen
        showMonthlyAvg={showMonthlyAvg}  // Send månedlig snitt til tabellen
        showYearlyAvg={showYearlyAvg}  // Send årlig snitt til tabellen
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />
    </>
  );
}
