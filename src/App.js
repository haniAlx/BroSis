import React, { useEffect } from "react";
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
import { useUserContext } from "./components/context/UserContext";
import VehicleDetail from "./pages/Vehicle/VehicleDetail";

function App() {
  const { currentUser } = useUserContext();

  return (
    <>
      <BrowserRouter>
        <DataLoadContext>
          {currentUser || null ? (
            <>
              <div>
                <Navigation />
                <div className="main-container">
                  <div className="container_mv">
                    <SideBar />
                    <Routes>
                      <Route path="/" element={<Homepage />} />
                      <Route path="/dashboard" element={<Homepage />}></Route>
                      <Route path="/vehicle" element={<Vehicle />} />
                      <Route path="/driver" element={<Drivers />} />
                      <Route
                        path="/vehicle/detail/:vehicleId"
                        element={<VehicleDetail />}
                      />
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
              <Route path="*" element={<SignIn />} />
            </Routes>
          )}
        </DataLoadContext>
      </BrowserRouter>
    </>
  );
}

export default App;
