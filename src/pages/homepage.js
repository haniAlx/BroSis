import React, { useEffect, useState } from "react";
import "./home.css";
import BarChar from "../components/Charts/BarChar";
import { Chart } from "chart.js/auto";
import DoughnutChart from "../components/Charts/DoughnutChart";
import CircularBar from "../components/circularBar/circularBar";
import { useLoadContext } from "../components/context/DataLoadContext";
const Homepage = () => {
  const [data, setData] = useState({
    labels: ["Vehicle", "User", "Driver", "Compony"],
    datasets: [{ label: "hello", data: [1, 2, 3, 4] }],
  });

  const { payload, loading } = useLoadContext();

  useEffect(() => {
    const populateDate = () => {
      setData({
        labels: ["Vehicle", "User", "Driver", "Compony"],
        datasets: [{ label: "Summary", data: [1, 2, 3, 4] }],
      });
      console.log("loading", loading);
      console.log("payload", payload);
    };
    populateDate();
  }, []);
  return (
    <div className="main-bar">
      <div>
        <h2 style={{}}>Driver Analysis</h2>
        <hr className="hr" />
        <div className="chart-container">
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <div>
              <CircularBar text="OnRoute" max={(8 / 13) * 100} color={""} />
              <CircularBar text="Assigned" max={(3 / 13) * 100} color={""} />
            </div>
            <div>
              <CircularBar text="UnAssigned" max={(2 / 13) * 100} color={""} />
              <CircularBar text="Permit" max={(0 / 13) * 100} color={""} />
            </div>
          </div>
          <div style={{ maxWidth: "400px", position: "relative" }}>
            <DoughnutChart chartData={data} />
          </div>
          <div
            style={{ maxWidth: "700px", position: "relative", height: "300px" }}
          >
            <BarChar chartData={data} />
          </div>
        </div>

        <h2 style={{ marginTop: "100px" }}>Market Analysis</h2>
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
      </div>
    </div>
  );
};

export default Homepage;
