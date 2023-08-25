import React, { useState } from "react";
import {
  MdBusinessCenter,
  MdDashboard,
  MdDirectionsCar,
  MdOutlineManageAccounts,
  MdPeople,
  MdOutlineAppRegistration
} from "react-icons/md";
import {AiFillSetting} from 'react-icons/ai'
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import NewMarkets from "../pages/Market/NewMarkets";
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
      <NewMarkets/>
      <div className="sidebar-container">
        <div className="sidebar-items">
          <ul className="sidebar-list">
            <li onClick={() => changeRoute("dashboard")}>
              <MdDashboard
                color={`${current.dashboard ? "rgb(8, 80, 170)" : "rgb(112, 167, 255)"}`}
                size={35}
              />
              <p>Home</p>
            </li>
            <li onClick={() => changeRoute("vehicle")}>
              <MdDirectionsCar
                color={`${current.vehicle ? "rgb(8, 80, 170)" : "rgb(112, 167, 255)"}`}
                size={35}
              />
              <p>Vehicle</p>
            </li>
            <li onClick={() => changeRoute("driver")}>
              <MdOutlineManageAccounts
                color={`${current.driver ? "rgb(8, 80, 170)" : "rgb(112, 167, 255)"}`}
                size={35}
              />
              <p>Driver</p>
            </li>
            <li onClick={() => changeRoute("users")}>
              <MdPeople
                color={`${current.users ? "rgb(8, 80, 170)" : "rgb(112, 167, 255)"}`}
                size={35}
              />
              <p>Users</p>
            </li>
            <li onClick={() => changeRoute("market")}>
              <MdBusinessCenter
                color={`${current.market ? "rgb(8, 80, 170)" : "rgb(112, 167, 255)"}`}
                size={35}
              />
              <p>Market</p>
            </li>
            <li onClick={() => changeRoute("companyOwnerRegister")}>
              <MdOutlineAppRegistration
                color={`${current.companyOwnerRegister ? "rgb(8, 80, 170)" : "rgb(112, 167, 255)"}`}
                size={35}
              />
              <p>Registration</p>
            </li>
            <li onClick={() => changeRoute("settings")}>
              <AiFillSetting
                color={`${current.setting ? "rgb(8, 80, 170)" : "rgb(112, 167, 255)"}`}
                size={35}
              />
              <p>Settings</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
