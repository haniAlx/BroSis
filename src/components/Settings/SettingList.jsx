import React from "react";
function SettingCards({
  title,
  data,
  handleCardChange,
  active,
  name,
}) {

  const activecard = document.querySelectorAll("active-card");
  activecard.forEach((element) => {
    element.classList.remove("active-card");
  });
  return (
    <div
      className={`List-container ${active === name ? "Listctive-card" : "listCard"}`}
      
      onClick={handleCardChange}
    >
      <div >
        <h4>{title}</h4>
      </div>
      
        
    </div>
  );
}

export default SettingCards;
