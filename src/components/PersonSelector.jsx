import React, { useState, useRef, useEffect } from "react";

export default function PersonSelector({ names, selectedPeople, setSelectedPeople }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    const togglePerson = (name) => {
        setSelectedPeople((prev) =>
            prev.includes(name)
                ? prev.filter((n) => n !== name)
                : [...prev, name]
        );
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
        <div className="person-selector" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="selector-toggle">
                👥 Velg personer
            </button>

            {isOpen && (
                <div className="selector-dropdown">
                    {names.map((name) => (
                        <label key={name}>
                            <input
                                type="checkbox"
                                checked={selectedPeople.includes(name)}
                                onChange={() => togglePerson(name)}
                            />
                            {name}
                        </label>
                    ))}
                    {selectedPeople.length !== names.length && (
                        <button
                            className="select-all-btn"
                            onClick={() => setSelectedPeople([...names])}
                        >
                            Velg alle
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
