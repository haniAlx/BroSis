import React, { useState } from "react";
import {
  MdDashboard,
  MdDirectionsCar,
  MdOutlineManageAccounts,
  MdPeople,
} from "react-icons/md";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
const SideBar = () => {
  const [current, setCurrent] = useState({
    dashboard: true,
    vehicle: false,
    driver: false,
    users: false,
  });
  const navigator = useNavigate();
  const changeRoute = (val) => {
    setCurrent({
      dashboard: false,
      vehicle: false,
      driver: false,
      users: false,
      [val]: true,
    });
    navigator(`/${val}`);
  };
  return (
    <div>
      <div className="sidebar-container">
        <div className="sidebar-items">
          <ul className="sidebar-list">
            <li onClick={() => changeRoute("dashboard")}>
              <MdDashboard
                color={`${current.dashboard ? "Yellow" : "black"}`}
                size={25}
              />
              <p>Home</p>
            </li>
            <li onClick={() => changeRoute("vehicle")}>
              <MdDirectionsCar
                color={`${current.vehicle ? "Yellow" : "black"}`}
                size={25}
              />
              <p>Vehicle</p>
            </li>
            <li onClick={() => changeRoute("driver")}>
              <MdOutlineManageAccounts
                color={`${current.driver ? "Yellow" : "black"}`}
                size={25}
              />
              <p>Driver</p>
            </li>
            <li onClick={() => changeRoute("users")}>
              <MdPeople
                color={`${current.users ? "Yellow" : "black"}`}
                size={25}
              />
              <p>Users</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
