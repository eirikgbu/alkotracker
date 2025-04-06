import React from "react";

export default function StatTogglePanel({
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
}) {
    return (
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
    );
}
