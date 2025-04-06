import { getGradientColor, getMinMaxPerRow } from "../utils/statColoring";

export default function StatTable({
  stats,
  showTotal,
  showAvg,
  showWeeklyAvg,
  showMonthlyAvg,
  showYearlyAvg,
  showSoberStreak,
  showDrinkingStreak,
  showMaxUnitsInOneDay,
  showMaxUnitsInOneDayDates,
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
    showSoberStreak && { key: "longestSoberStreak", label: "Lengst edru (d)" },
    showDrinkingStreak && { key: "longestDrinkingStreak", label: "Flest dager på rad" },
    showMaxUnitsInOneDay && { key: "maxUnitsInOneDay", label: "Flest enheter på en dag" },
    showMaxUnitsInOneDayDates && { key: "maxUnitsInOneDayDates", label: "Dato(er) for rekord" }
  ].filter(Boolean);

  const rowMinMax = getMinMaxPerRow(stats, visibleRows);
  const invertedStats = ["longestSoberStreak"];


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
              {stats.map((stat, index) => {
                const rawValue = stat[row.key];
                let value = rawValue;
                if (typeof rawValue === "number") {
                  value = rawValue;
                } else if (typeof rawValue === "string") {
                  value = rawValue;
                } else if (Array.isArray(rawValue)) {
                  value = rawValue.join(", ");
                } else {
                  value = "";
                }
                const { min, max } = rowMinMax[row.key] || {};
                const backgroundColor = !isNaN(value)
                  ? getGradientColor(value, min, max, invertedStats.includes(row.key))
                  : "#e0e0e0";
                return (
                  <td
                    key={index}
                    className="stat-table-cell"
                    style={{
                      backgroundColor,
                      color: "#000"
                    }}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
