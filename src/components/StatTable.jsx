import React from "react";

export default function StatTable({
  stats,
  showTotal,
  showAvg,
  showWeeklyAvg,  // Nytt flagg for ukentlig snitt
  sortBy,
  sortDirection,
  onSortChange
}) {
  // Funksjon for å rendre hver kolonne
  const renderColumn = (column, value) => {
    return <td>{value}</td>;
  };

  const handleSort = (column) => {
    onSortChange(column); // Kall på sorteringsfunksjonen fra App.js
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort("name")}>Navn</th>
          {showTotal && (
            <th onClick={() => handleSort("total")}>
              Total {sortBy === "total" ? (sortDirection === "asc" ? "↑" : "↓") : ""}
            </th>
          )}
          {showAvg && (
            <th onClick={() => handleSort("avg")}>
              Daglig Snitt {sortBy === "avg" ? (sortDirection === "asc" ? "↑" : "↓") : ""}
            </th>
          )}
          {showWeeklyAvg && (
            <th onClick={() => handleSort("weeklyAvg")}>
              Ukentlig Snitt {sortBy === "weeklyAvg" ? (sortDirection === "asc" ? "↑" : "↓") : ""}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {stats.map((stat, index) => (
          <tr key={index}>
            <td>{stat.name}</td>
            {showTotal && renderColumn("total", stat.total)}
            {showAvg && renderColumn("avg", stat.avg)}
            {showWeeklyAvg && renderColumn("weeklyAvg", stat.weeklyAvg)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
