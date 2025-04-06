import React, { useState, useMemo } from "react";
import StatTable from "./StatTable";
import StatToggleDropdown from "./MainOverviewParts/StatToggleDropdown";
import useStatVisibility from "./MainOverviewParts/useStatVisibility";

export default function MainOverview({
  selectedPeople,
  statsPerPerson
}) {
  const [sortBy, setSortBy] = useState("total");
  const [sortDirection, setSortDirection] = useState("desc");

  const handleSortChange = (column) => {
    if (sortBy === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortDirection("desc");
    }
  };

  const {
    showTotal,
    setShowTotal,
    showAvg,
    setShowAvg,
    showWeeklyAvg,
    setShowWeeklyAvg,
    showMonthlyAvg,
    setShowMonthlyAvg,
    showYearlyAvg,
    setShowYearlyAvg,
    showSoberStreak,
    setShowSoberStreak
  } = useStatVisibility();

  const visibleStats = useMemo(() => {
    const filtered = selectedPeople.length
      ? statsPerPerson.filter((p) => selectedPeople.includes(p.name))
      : statsPerPerson;

    return filtered.sort((a, b) => {
      const aValue = parseFloat(a[sortBy]);
      const bValue = parseFloat(b[sortBy]);
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [selectedPeople, statsPerPerson, sortBy, sortDirection]);

  return (
    <>
      <StatToggleDropdown
        showTotal={showTotal}
        setShowTotal={setShowTotal}
        showAvg={showAvg}
        setShowAvg={setShowAvg}
        showWeeklyAvg={showWeeklyAvg}
        setShowWeeklyAvg={setShowWeeklyAvg}
        showMonthlyAvg={showMonthlyAvg}
        setShowMonthlyAvg={setShowMonthlyAvg}
        showYearlyAvg={showYearlyAvg}
        setShowYearlyAvg={setShowYearlyAvg}
        showSoberStreak={showSoberStreak}
        setShowSoberStreak={setShowSoberStreak}
      />

      <StatTable
        stats={visibleStats}
        showTotal={showTotal}
        showAvg={showAvg}
        showWeeklyAvg={showWeeklyAvg}
        showMonthlyAvg={showMonthlyAvg}
        showYearlyAvg={showYearlyAvg}
        showSoberStreak={showSoberStreak}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />
    </>
  );
}