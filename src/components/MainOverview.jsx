import React from "react";
import StatTable from "./StatTable";

export default function MainOverview({
  data,
  selectedPeople,
  showTotal,
  showAvg,
  showWeeklyAvg,
  showMonthlyAvg,
  showYearlyAvg,
  showSoberStreak, // 👈 NY
  sortBy,
  sortDirection,
  handleSortChange,
  setSelectedPeople,
  setShowTotal,
  setShowAvg,
  setShowWeeklyAvg,
  setShowMonthlyAvg,
  setShowYearlyAvg,
  setShowSoberStreak, // 👈 NY
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
            checked={showWeeklyAvg}
            onChange={() => setShowWeeklyAvg(!showWeeklyAvg)}
          />
          Vis ukentlig snitt
        </label>
        <label>
          <input
            type="checkbox"
            checked={showMonthlyAvg}
            onChange={() => setShowMonthlyAvg(!showMonthlyAvg)}
          />
          Vis månedlig snitt
        </label>
        <label>
          <input
            type="checkbox"
            checked={showYearlyAvg}
            onChange={() => setShowYearlyAvg(!showYearlyAvg)}
          />
          Vis antatt antall pils i år
        </label>
        <label>
          <input
            type="checkbox"
            checked={showSoberStreak}
            onChange={() => setShowSoberStreak(!showSoberStreak)}
          />
          Vis lengste edru-periode
        </label>
      </div>

      {/* Tabell */}
      <StatTable
        stats={filtered}
        showTotal={showTotal}
        showAvg={showAvg}
        showWeeklyAvg={showWeeklyAvg}
        showMonthlyAvg={showMonthlyAvg}
        showYearlyAvg={showYearlyAvg}
        showSoberStreak={showSoberStreak} // 👈 NY
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />
    </>
  );
}

