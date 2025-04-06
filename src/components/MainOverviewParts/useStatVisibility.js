import { useState } from "react";

export default function useStatVisibility() {
    const [showTotal, setShowTotal] = useState(true);
    const [showAvg, setShowAvg] = useState(true);
    const [showWeeklyAvg, setShowWeeklyAvg] = useState(true);
    const [showMonthlyAvg, setShowMonthlyAvg] = useState(true);
    const [showYearlyAvg, setShowYearlyAvg] = useState(true);
    const [showSoberStreak, setShowSoberStreak] = useState(true);
    const [showDrinkingStreak, setShowDrinkingStreak] = useState(true);
    const [showMaxUnitsInOneDay, setShowMaxUnitsInOneDay] = useState(true);

    return {
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
        setShowSoberStreak,
        showDrinkingStreak,
        setShowDrinkingStreak,
        showMaxUnitsInOneDay,
        setShowMaxUnitsInOneDay
    };
}
