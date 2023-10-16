import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

const SystemSetting = () => {
  const [show, setShow] = useState(true);
  const showSettingList = () => {
    const listSettingContainer = document.getElementById("show-setting");
    const listarrow = document.getElementById("list-arrow");
    console.log(listSettingContainer);
    if (listSettingContainer.classList.contains("show-list")) {
      listSettingContainer.classList.remove("show-list");
    } else {
      listSettingContainer.classList.add("show-list");
    }
    if (listarrow.classList.contains("rotate")) {
      listarrow.classList.remove("rotate");
    } else listarrow.classList.add("rotate");
  };
  return (
    <div className="setting-cards">
      <div
        className="setting-title-container"
        onClick={() => showSettingList()}
      >
        SystemSetting
        <MdKeyboardArrowDown size={20} className="list-arrow" id="list-arrow" />
      </div>
      {show && (
        <div className="setting-list-container" id="show-setting">
          <ul className="setting-sublist">
            <li>Role Type</li>
            <li>Notification Type</li>
            <li>Status</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SystemSetting;
