import React from "react";
import "./App.css";
import {BrowserRouter, Routes,Route} from "react-router-dom";
import Navigation from "./components/Navigation";
import SideBar from "./components/SideBar";
import Homepage from "./pages/homepage";
import SignIn from "./components/SignInPages/Signin";
import ForgatePass from "./components/SignInPages/ForgatePass";
import ConfirmPass from "./components/SignInPages/ConfirmPass";

function App() {
  return (
    <>
      <BrowserRouter>
            <Routes>
                  <Route path='/' element={<SignIn />}></Route>  
                  <Route path='/ForgatePass' element={<ForgatePass />}></Route>  
                  <Route path='/ConfirmPass' element={<ConfirmPass />}></Route> 
                  <Route path='/Dashboard' element={
                    <div>
                    <Navigation />
                    <div className="main-container">
                      <div className="container_mv">
                        <SideBar />
                        <Homepage />
                      </div>
                    </div>
                    </div>
                  }></Route> 
            </Routes>
          </BrowserRouter>
    </>
  );
}

export default App;
