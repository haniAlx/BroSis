import React from "react";
import { MdDashboard, MdDirectionsCar, MdPeople } from "react-icons/md";
import "./sidebar.css";
const SideBar = () => {
  return (
    <div>
      <div className="sidebar-container">
        <div className="sidebar-items">
          <ul className="sidebar-list">
            <li>
              <MdDashboard color="yellow" size={25} />
              <p>Home</p>
            </li>
            <li>
              <MdDirectionsCar color="black" size={25} />
              <p>Vehicle</p>
            </li>
            <li>
              <MdPeople color="black" size={25} />
              <p>Users</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
