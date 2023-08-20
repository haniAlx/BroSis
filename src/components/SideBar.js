import React, { useState } from "react";
import {
  MdBusinessCenter,
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
    market: false,
  });
  const navigator = useNavigate();
  const changeRoute = (val) => {
    setCurrent({
      dashboard: false,
      vehicle: false,
      driver: false,
      users: false,
      market: false,
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
            <li onClick={() => changeRoute("market")}>
              <MdBusinessCenter
                color={`${current.market ? "Yellow" : "black"}`}
                size={25}
              />
              <p>Market</p>
            </li>
            <li onClick={() => changeRoute("companyOwnerRegister")}>
              <MdBusinessCenter
                color={`${current.companyOwnerRegister ? "Yellow" : "black"}`}
                size={25}
              />
              <p>Registration</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
