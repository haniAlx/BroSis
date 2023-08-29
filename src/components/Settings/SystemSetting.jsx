import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

const SystemSetting = () => {
  const [show, setShow] = useState(false);
  const showSettingList = () => {
    setShow(!show);
    // const listSettingContainer = document.getElementById("show-setting");
    // listSettingContainer.style.maxHeight = "auto";
    // listSettingContainer.style.overflow = "auto";
    // console.log("setting");
  };
  return (
    <div className="setting-cards">
      <div
        className="setting-title-container"
        onClick={() => showSettingList()}
      >
        SystemSetting
        <MdKeyboardArrowDown size={20} />
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
