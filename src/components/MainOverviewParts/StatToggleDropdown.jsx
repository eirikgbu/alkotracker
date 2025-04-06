import React, { useState, useRef, useEffect } from "react";

export default function StatToggleDropdown(props) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    const toggle = (key) => {
        props[`set${key}`]((prev) => !prev);
    };

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="stat-dropdown" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="selector-toggle">
                📊 Velg statistikk
            </button>

            {isOpen && (
                <div className="selector-dropdown">
                    <label><input type="checkbox" checked={props.showTotal} onChange={() => toggle("ShowTotal")} /> Vis totalt</label>
                    <label><input type="checkbox" checked={props.showAvg} onChange={() => toggle("ShowAvg")} /> Vis snitt</label>
                    <label><input type="checkbox" checked={props.showWeeklyAvg} onChange={() => toggle("ShowWeeklyAvg")} /> Vis ukentlig snitt</label>
                    <label><input type="checkbox" checked={props.showMonthlyAvg} onChange={() => toggle("ShowMonthlyAvg")} /> Vis månedlig snitt</label>
                    <label><input type="checkbox" checked={props.showYearlyAvg} onChange={() => toggle("ShowYearlyAvg")} /> Vis antatt antall pils i år</label>
                    <label><input type="checkbox" checked={props.showSoberStreak} onChange={() => toggle("ShowSoberStreak")} /> Vis lengste edru-periode</label>
                    <label><input type="checkbox" checked={props.showDrinkingStreak} onChange={() => toggle("ShowDrinkingStreak")} /> Vis lengste ikke-edru-periode</label>
                </div>
            )}
        </div>
    );
}
