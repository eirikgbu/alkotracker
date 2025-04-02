import React from "react";

export default function StatTable({
  stats,
  showTotal,
  showAvg,
  showWeeklyAvg,
  showMonthlyAvg,
  showYearlyAvg,
  sortBy,
  sortDirection,
  onSortChange
}) {
  const handleSort = (column) => {
    onSortChange(column);
  };

  const visibleRows = [
    showTotal && { key: "total", label: "Total" },
    showAvg && { key: "avg", label: "Daglig Snitt" },
    showWeeklyAvg && { key: "weeklyAvg", label: "Ukentlig Snitt" },
    showMonthlyAvg && { key: "monthlyAvg", label: "Månedlig Snitt" },
    showYearlyAvg && { key: "yearlyAvg", label: "Antatt antall pils i år" }
  ].filter(Boolean);

  return (
    <table>
      <thead>
        <tr>
          <th style={{ cursor: "default" }}>Måling</th>
          {stats.map((stat, index) => (
            <th key={index} style={{ cursor: "default" }}>
              {stat.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {visibleRows.map((row) => (
          <tr key={row.key}>
            <td
              onClick={() => handleSort(row.key)}
              style={{ cursor: "pointer", fontWeight: "bold" }}
              title="Klikk for å sortere"
            >
              {row.label}
              {sortBy === row.key ? (sortDirection === "asc" ? " ↑" : " ↓") : ""}
            </td>
            {stats.map((stat, index) => (
              <td key={index}>{stat[row.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
