import React from "react";
import "./topCard.css";
function TopCards({ title, icon, data, color, handleCardChange }) {
  const Icon = icon;
  return (
    <div
      className="topcard-container"
      style={{ backgroundColor: color }}
      onClick={handleCardChange}
    >
      <div className="card-title">
        <h4>{title}</h4>
      </div>
      <div className="card-data">
        <div className="card-val">{data}</div>
        <div className="card-icon">
          <Icon size={20} color="white" />
        </div>
      </div>
    </div>
  );
}

export default TopCards;
