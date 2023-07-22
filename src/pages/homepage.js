import React, { useEffect, useState } from "react";
import "./home.css";
import BarChar from "../components/Charts/BarChar";
import { Chart } from "chart.js/auto";
import DoughnutChart from "../components/Charts/DoughnutChart";
import CircularBar from "../components/circularBar/circularBar";
import { useLoadContext } from "../components/context/DataLoadContext";
import { Link } from "react-router-dom";
const Homepage = () => {
  const [data, setData] = useState({
    labels: ["Vehicle", "User", "Driver", "Compony"],
    datasets: [{ label: "hello", data: [1, 2, 3, 4] }],
  });
  const [driverdata, setDriverdata] = useState();
  const { payload, loading, error } = useLoadContext();

  useEffect(() => {
    const populateDate = () => {
      setData({
        labels: ["OnRoute", "Assigned", "Unassigned", "permite"],
        datasets: [
          {
            label: "Summary",
            data: [
              payload.onRoute.length,
              payload.assigned.length,
              payload.unassigned.length,
              payload.permit.length,
            ],
          },
        ],
      });
    };
    populateDate();
  }, [loading]);
  return (
    <div className="main-bar">
      <div>
        <h2 style={{}}>Driver Analysis</h2>
        <hr className="hr" />
        {loading ? <p>Loading Drivers Data Please Wait...</p> : ""}
        {error ? (
          <p>{error}</p>
        ) : (
          <div className="chart-container">
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <div>
                <CircularBar
                  text={loading ? "loading" : "onRoute"}
                  max={
                    (payload.onRoute.length / payload.allDrivers.length) * 100
                  }
                  color={""}
                />
                <CircularBar
                  text={loading ? "loading" : "Assigned"}
                  max={
                    (payload.assigned.length / payload.allDrivers.length) * 100
                  }
                  color={""}
                />
              </div>
              <div>
                <CircularBar
                  text={loading ? "loading " : "UnAssigned"}
                  max={
                    (payload.unassigned.length / payload.allDrivers.length) *
                    100
                  }
                  color={""}
                />
                <CircularBar
                  text={loading ? "loading " : "Permit"}
                  max={
                    (payload.permit.length / payload.allDrivers.length) * 100
                  }
                  color={""}
                />
              </div>
            </div>
            {/* <div style={{ maxWidth: "400px", position: "relative" }}>
          <DoughnutChart chartData={data} />
        </div> */}
            <div
              style={{
                maxWidth: "700px",
                position: "relative",
                height: "300px",
              }}
            >
              <BarChar chartData={data} />
            </div>
          </div>
        )}
        <div>
          <Link className="link-goto" to={"/driver"}>
            Go To Driveres
          </Link>
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
