import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import SideBar from "./components/SideBar";
import Homepage from "./pages/homepage";
import SignIn from "./components/SignInPages/Signin";
import ForgatePass from "./components/SignInPages/ForgatePass";
import ConfirmPass from "./components/SignInPages/ConfirmPass";
import ErrorPage from "./pages/ErrorPage";
import Vehicle from "./pages/Vehicle/Vehicle";
import Drivers from "./pages/Driver/Drivers";
import DataLoadContext from "./components/context/DataLoadContext";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    const getUser = () => {
      setUser(localStorage.getItem("user"));
    };
    getUser();
  }, []);
  return (
    <>
      <DataLoadContext>
        <BrowserRouter>
          {user || null ? (
            <>
              <div>
                <Navigation />
                <div className="main-container">
                  <div className="container_mv">
                    <SideBar />
                    <Routes>
                      <Route path="/Dashboard" element={<Homepage />}></Route>
                      <Route path="/vehicle" element={<Vehicle />} />
                      <Route path="/driver" element={<Drivers />} />
                      <Route path="*" element={<ErrorPage />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Routes>
              <Route path="/" element={<SignIn />}></Route>
              <Route path="/ForgatePass" element={<ForgatePass />}></Route>
              <Route path="/ConfirmPass" element={<ConfirmPass />}></Route>
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          )}
        </BrowserRouter>
      </DataLoadContext>
    </>
  );
}

export default App;
