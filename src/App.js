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
import DriverDetail from "./pages/Driver/DriverDetail";
import Users from "./pages/User/Users";
import UserDetail from "./pages/User/UserDetail";
import AddVehicle from "./pages/User/AddVehicle";
import AddDriver from "./pages/User/AddDriver";
import ChangeDriver from "./pages/Vehicle/ChangeDriver";
import Market from "./pages/Market/Market";
import MarketDetail from "./pages/Market/MarketDetail";
import CompanyOwnerRegistration from "./Registration/CompanyOwnerRegistration";
import IndividualRegistration from "./Registration/IndividualRegistration";
import CargoOwnerRegistration from "./Registration/CargoOwnerRegistration";
import CargoDetail from "./pages/User/CargoDetail";
import Settings from "./components/Settings/Settings";
import SettingsUpdate from "./components/Settings/SettingsUpdate";
import Alerts from './components/Alerts/Alerts'
import AlertsHistory from "./components/Alerts/AlertHistory";
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
                      <Route path="/users" element={<Users />} />
                      <Route
                        path="/companyOwnerRegister"
                        element={<CompanyOwnerRegistration />}
                      />
                      <Route
                        path="/IndividualRegister"
                        element={<IndividualRegistration />}
                      />
                      <Route
                        path="/cargoOwnerRegister"
                        element={<CargoOwnerRegistration />}
                      />
                      <Route
                        path="/cargoOwnerDetail/:id"
                        element={<CargoDetail />}
                      />
                      <Route path="/users/:role/:id" element={<UserDetail />} />
                      <Route path="/settings" element={<SettingsUpdate />} />
                      <Route
                        path="/settingsUpdate"
                        element={<SettingsUpdate />}
                      />
                      <Route
                        path="/users/addDriver/:ownerPhone"
                        element={<AddDriver />}
                      />
                      <Route
                        path="/users/addVehicle/:ownerPhone"
                        element={<AddVehicle />}
                      />
                      <Route
                        path="/vehicle/detail/:vehicleId"
                        element={<VehicleDetail />}
                      />
                      <Route
                        path="/driver/detail/:driverId"
                        element={<DriverDetail />}
                      />
                      <Route
                        path="/vehicle/changeAssign/:ownerId/:plateNumber"
                        element={<ChangeDriver />}
                      />
                      <Route
                        path="/vehicle/changeAssign/:ownerId/:plateNumber/:state"
                        element={<ChangeDriver />}
                      />
                      <Route path="/market" element={<Market />} />
                      <Route
                        path="/market/marketDetail/:id"
                        element={<MarketDetail />}
                      />
                      <Route
                        path="/alerts"
                        element={<Alerts />}
                      />
                       <Route
                        path="/alerthistory"
                        element={<AlertsHistory />}
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
