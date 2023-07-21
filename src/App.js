import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import SideBar from "./components/SideBar";
import Homepage from "./pages/homepage";
import SignIn from "./components/SignInPages/Signin";
import ForgatePass from "./components/SignInPages/ForgatePass";
import ConfirmPass from "./components/SignInPages/ConfirmPass";
import ErrorPage from "./pages/ErrorPage";

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
    </>
  );
}

export default App;
