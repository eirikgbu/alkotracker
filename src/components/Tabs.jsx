import React from "react";

export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="tab-container">
      <button
        className={`tab-button ${activeTab === "daily" ? "active" : ""}`}
        onClick={() => setActiveTab("daily")}
      >
        Hovedoversikt
      </button>
      <button
        className={`tab-button ${activeTab === "weekly" ? "active" : ""}`}
        onClick={() => setActiveTab("weekly")}
      >
        Ukentlig Oversikt
      </button>
    </div>
  );
}
