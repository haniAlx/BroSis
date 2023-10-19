import React from "react";
import "./navigation.css";
import { useNavigate } from "react-router-dom";
import {
  MdMenu,
  MdNotificationsNone,
  MdOutlineAccountCircle,
} from "react-icons/md";


const Navigation = () => {

  
  const navigate = useNavigate();
  
    const handleLogout = () => {
      // Perform logout operations here, e.g., clearing authentication token or user session.
  
      // For example, if using localStorage to store a token:
      localStorage.removeItem('jwt');
  
      // Redirect the user to the login page or any other desired action.
      navigate('/'); // Replace '/login' with the appropriate route.
  
      // Alternatively, you can use window.location.replace('/login') to force a full page reload.
    }
  const handleProfile= () =>{
    return <div>
                  
           </div>
  }
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
                <MdMenu color="black" size={25} />
              </li>
              <li>
                <MdNotificationsNone color="black" size={25} />
              </li>
              <li>
                <MdOutlineAccountCircle onClick={handleProfile} color="red" size={25} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
