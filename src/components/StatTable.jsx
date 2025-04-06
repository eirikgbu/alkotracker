export default function StatTable({
  stats,
  showTotal,
  showAvg,
  showWeeklyAvg,
  showMonthlyAvg,
  showYearlyAvg,
  showSoberStreak, // 👈 Ny prop
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
    showYearlyAvg && { key: "yearlyAvg", label: "Antatt antall pils i år" },
    showSoberStreak && { key: "longestSoberStreak", label: "Lengst edru (d)" }
  ].filter(Boolean);

  return (
    <div className="stat-table-container">
      <table className="stat-table">
        <thead>
          <tr>
            <th className="sticky-cell">&nbsp;</th>
            {stats.map((stat, index) => (
              <th key={index} className="stat-table-header">
                {stat.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((row) => (
            <tr key={row.key}>
              <td
                className="sticky-cell stat-label clickable"
                onClick={() => handleSort(row.key)}
                title="Klikk for å sortere"
              >
                {row.label}
                {sortBy === row.key ? (sortDirection === "asc" ? " ↑" : " ↓") : ""}
              </td>
              {stats.map((stat, index) => (
                <td key={index} className="stat-table-cell">
                  {stat[row.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
