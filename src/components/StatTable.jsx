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
    showMaxUnitsInOneDay && { key: "maxUnitsInOneDay", label: "Flest enheter på en dag" }
  ].filter(Boolean);

  // 👇 Helper: get min/max for each row
  const getMinMaxPerRow = () => {
    const result = {};
    visibleRows.forEach(({ key }) => {
      const values = stats
        .map((s) => parseFloat(s[key]))
        .filter((v) => !isNaN(v));
      const min = Math.min(...values);
      const max = Math.max(...values);
      result[key] = { min, max };
    });
    return result;
  };

  const rowMinMax = getMinMaxPerRow();

  // 👇 Helper: color from red (0) → green (120) using HSL
  const getGradientColor = (value, min, max) => {
    if (max === min) return "#ffffff"; // avoid div by 0
    const ratio = (value - min) / (max - min);
    const hue = 120 * ratio; // 0 = red, 120 = green
    return `hsl(${hue}, 75%, 75%)`;
  };

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
                const value = parseFloat(rawValue);
                const { min, max } = rowMinMax[row.key] || {};
                const backgroundColor = !isNaN(value)
                  ? getGradientColor(value, min, max)
                  : undefined;
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
