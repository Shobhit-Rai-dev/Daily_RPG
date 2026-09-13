import React from "react";

export default function XPBar({ current, max, color = "purple" }) {
  const percentage = max > 0 ? Math.min(100, Math.max(0, Math.round((current / max) * 100))) : 0;

  return (
    <div className="progress-track">
      <div
        className={`progress-fill ${color !== "purple" ? `${color}-fill` : ""}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
