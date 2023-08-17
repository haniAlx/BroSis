import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import CircularBar from "../../components/circularBar/circularBar";
import "./market_chart.css";
import { mainAPI } from "../../components/mainAPI";
import { useParams } from "react-router-dom";
import { showErrorMessage } from "../../components/SwalMessages";
import MarketDetailTable from "./MarketDetailTable";
const MarketDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [refresh, setRefresh] = useState(false);
  const [cargoDriver, setCargoDriver] = useState([]);
  const [remaining, setRemaining] = useState("");
  const [weight, setWeight] = useState("");
  const [cargoData, setCargoData] = useState({});
  const [chartData, setChartData] = useState({
    labels: ["FINISHED", "REMAINING"],
    datasets: [{ label: "Summary", data: [0, 0] }],
  });
  const apiCargoDriver = `${mainAPI}/Api/Admin/All/CargoDrivers/${id}`;
  const apiCargo = `${mainAPI}/Api/Admin/All/Cargos/${id}`;
  const jwt = JSON.parse(localStorage.getItem("jwt")); // Getting the token from login api
  const options = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  const getCargoDriver = () => {
    setLoading(true);
    fetch(apiCargoDriver, options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCargoDriver(res.cargoDriversINFs);
      })
      .catch((e) => {
        showErrorMessage({ message: "error" });
        console.log(e);
      })
      .finally(setLoading(false));
  };
  useEffect(() => {
    setChartData({
      labels: ["FINISHED", "REMAINING"],
      datasets: [
        {
          label: "Summary",
          data: [8, 2],
          backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
        },
      ],
    });
    const getCargoDetail = async () => {
      setLoading(true);
      fetch(apiCargo, options)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setCargoData(res);
          setWeight(res.weight);
          setRemaining(res.remaining);
        })
        .catch((e) => {
          showErrorMessage({ message: "error" });
          console.log(e);
        })
        .finally(setLoading(false));
    };
    getCargoDetail();
    getCargoDriver();
  }, [refresh]);
  return (
    <div className="main-bar">
      <div>
        <h2 style={{}}>Market Detail</h2>
        <hr className="hr" />
        <div className="main-bar-content">
          {loading && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                flexDirection: "column",
                rowGap: "50px",
              }}
            >
              <ReactLoading type="bars" width={100} height={50} color="black" />
              <p>Loading Data Please Wait</p>
            </div>
          )}
          {error ? (
            <>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "25px",
                  marginTop: "50px",
                  color: "red",
                }}
              >
                {error}
              </p>
              <button
                className="btn center w-300"
                onClick={() => setRefresh(!refresh)}
              >
                Refresh Page
              </button>
            </>
          ) : (
            ""
          )}
          {!loading && !error && (
            <>
              <div className="chart-container char-market">
                <CircularBar
                  text={loading ? "loading" : "Finished"}
                  max={((weight - remaining) / weight) * 100}
                  // (12/20)*100
                  color={""}
                />
                <div>
                  <p>
                    Total weight{" "}
                    <span style={{ fontWeight: "bold" }}> {weight}</span>
                  </p>

                  <p>
                    Remaining{" "}
                    <span style={{ fontWeight: "bold" }}> {remaining}</span>
                  </p>
                </div>
                <CircularBar
                  text={loading ? "loading" : "Remaining"}
                  max={(remaining / weight) * 100}
                  color={""}
                />

                {/* <div style={{ maxWidth: "300px", position: "relative" }}>
                  <DoughnutChart chartData={chartData} />
                  <div style={{ position: "absolute", top: "20px" }}>
                    <p>75</p>
                    <p>20</p>
                  </div>
                </div> */}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexWrap: "wrap",
                  maxWidth: "800px",
                  rowGap: "25px",
                  marginTop: "30px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <div>
                  <div className="cargo-d">
                    <p>Cargo Owner</p>
                    <p className="underline"> {cargoData.cargoOwner}</p>
                  </div>
                  <div className="cargo-d">
                    <p>Packaging </p>
                    <p className="underline">{cargoData.packaging}</p>
                  </div>
                </div>
                <div>
                  <div className="cargo-d">
                    <p>Payment</p>
                    <p className="underline"> {cargoData.payment || "NULL"}</p>
                  </div>
                  <div className="cargo-d">
                    <p>Cargo Type</p>
                    <p className="underline"> {cargoData.cargoType}</p>
                  </div>
                </div>
                <div>
                  <div className="cargo-d">
                    <p>Pick Up</p>
                    <p className="underline">{cargoData.pickUp}</p>
                  </div>
                  <div className="cargo-d">
                    <p>Drop Off</p>
                    <p className="underline">{cargoData.dropOff}</p>
                  </div>
                </div>
              </div>
              <MarketDetailTable target={cargoDriver} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketDetail;
