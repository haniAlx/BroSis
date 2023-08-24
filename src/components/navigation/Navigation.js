import React from "react";
import "./navigation.css";
import {
  MdMenu,
  MdNotificationsNone,
  MdOutlineAccountCircle,
} from "react-icons/md";
const Navigation = () => {
  return (
    <div>
      <div className="nav-container">
        <div className="nav-items">
          <div className="nav-logo">
            <p className="logo">Bazra-Tracker</p>
          </div>
          <div className="navigations">
            <ul className="nav-list">
              <li>
                <MdMenu color="white" size={25} />
              </li>
              <li>
                <MdNotificationsNone color="white" size={25} />
              </li>
              <li>
                <MdOutlineAccountCircle color="white" size={25} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
