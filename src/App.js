import React from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import SideBar from "./components/SideBar";
import Homepage from "./pages/homepage";

function App() {
  return (
    <>
      <Navigation />
      <div className="main-container">
        <div className="container_mv">
          <SideBar />
          <Homepage />
        </div>
      </div>
    </>
  );
}

export default App;
