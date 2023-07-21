import React, { useEffect, useState } from "react";
import "./home.css";
import BarChar from "../components/BarChar";
import { Chart } from "chart.js/auto";
import DoughnutChart from "../components/DoughnutChart";
const Homepage = () => {
  const [data, setData] = useState({
    labels: ["Vehicle", "User", "Driver", "Compony"],
    datasets: [{ label: "hello", data: [1, 2, 3, 4] }],
  });
  useEffect(() => {
    const populateDate = () => {
      setData({
        labels: ["Vehicle", "User", "Driver", "Compony"],
        datasets: [{ label: "Summary", data: [1, 2, 3, 4] }],
      });
    };
    populateDate();
  }, []);
  return (
    <div className="main-bar">
      <div>
        <h2 style={{}}>Analysis</h2>
        <hr className="hr" />
        <div className="chart-container">
          <div style={{ maxWidth: "400px", position: "relative" }}>
            <DoughnutChart chartData={data} />
          </div>
          <div
            style={{ maxWidth: "700px", position: "relative", height: "300px" }}
          >
            <BarChar chartData={data} />
          </div>
        </div>
        <h2 style={{ marginTop: "100px" }}>NewJob availabel</h2>
        <hr className="hr" />
      </div>
    </div>
  );
};

export default Homepage;
