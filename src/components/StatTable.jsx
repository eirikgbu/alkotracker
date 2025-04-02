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

  const stickyStyle = {
    position: "sticky",
    left: 0,
    background: "#fff",
    zIndex: 2,
    textAlign: "center",
    verticalAlign: "middle",
  };

  return (
    <div style={{ overflowX: "auto", maxWidth: "100%" }}>
      <table style={{ borderCollapse: "collapse", minWidth: "600px" }}>
        <thead>
          <tr>
            <th style={{ ...stickyStyle, cursor: "default" }}></th>
            {stats.map((stat, index) => (
              <th key={index} style={{
                cursor: "default",
                textAlign: "center",
                verticalAlign: "middle",
              }}>
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
                style={{
                  ...stickyStyle,
                  cursor: "pointer",
                  fontWeight: "bold",
                  zIndex: 1,
                }}
                title="Klikk for å sortere"
              >
                {row.label}
                {sortBy === row.key ? (sortDirection === "asc" ? " ↑" : " ↓") : ""}
              </td>
              {stats.map((stat, index) => (
                <td key={index} style={{
                  textAlign: "center",
                  verticalAlign: "middle"
                }}>{stat[row.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
