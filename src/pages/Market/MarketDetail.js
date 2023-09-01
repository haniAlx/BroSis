import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import "./market_input.css";
import CircularBar from "../../components/circularBar/circularBar";
import "./market_chart.css";
import { mainAPI } from "../../components/mainAPI";
import { useParams } from "react-router-dom";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../components/SwalMessages";
import MarketDetailTable from "./MarketDetailTable";
import LoadingPage from "../../components/LoadingPage";
import DoughnutChart from "../../components/Charts/DoughnutChart";
const MarketDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [refresh, setRefresh] = useState(false);
  const [cargoDriver, setCargoDriver] = useState([]);
  const [remaining, setRemaining] = useState("");
  const [weight, setWeight] = useState("");
  const [cargoData, setCargoData] = useState({});
  const [reload, setReload] = useState(false);
  const [chartData, setChartData] = useState({
    labels: ["FINISHED", "REMAINING"],
    datasets: [{ label: "Summary", data: [5, 2] }],
  });
  const apiCargoDriver = `${mainAPI}/Api/Admin/All/CargoDrivers/${id}`;
  const apiCargo = `${mainAPI}/Api/Admin/All/Cargos/${id}`;
   /****isNew */
   const [isNew,setIsNew]=useState(false )
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
        if (e.message == "Failed to fetch")
          showErrorMessage({ message: "net::ERR_INTERNET_DISCONNECTED" });
        else showErrorMessage({ message: "some thing went wrong" });
        console.log(e.message);
      })
      .finally(setLoading(false));
  };
  useEffect(() => {
    const getCargoDetail = async () => {
      setLoading(true);
      fetch(apiCargo, options)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setIsNew(res.status === "NEW" ? true :false)
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
        <h2 style={{}}>Market Detail / {cargoData.cargoOwner} </h2>
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
              {!isNew? (
                <ActiveMarket
                cargoData={cargoData}
                loading={loading}
                weight={weight}
                remaining={remaining}
                cargoDriver={cargoDriver}
                chartData={chartData}
              />
              ) : (
               
                <NewMarket
                cargoData={cargoData}
                reload={reload}
                setReload={setReload}
              />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
//Active Market
const ActiveMarket = ({
  cargoData,
  loading,
  weight,
  remaining,
  cargoDriver,
  chartData,
}) => {
  const id = cargoData.id;
  const jwt = JSON.parse(localStorage.getItem("jwt"));

  ///    HANDLE SENDTOCARGO FUNCTION
  const handleSendToCargo = async () => {
    //showSuccessMessage({ message: "Cargo handled" });
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    };
    const sendToCargoApi = `${mainAPI}/Api/Admin/AcceptedCargo/${id}`;

    try {
      const res = await fetch(sendToCargoApi, options);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        showSuccessMessage({ message: "success" });
      }
    } catch (e) {
      showErrorMessage({ message: e.message });
    }
  };
  //
  return (
    <>
      <div className="chart-container char-market">
        <CircularBar
          text={loading ? "loading" : "Finished"}
          max={((weight - remaining) / weight) * 100}
          color={"green"}
          bgcolor={"#88F6A0"}
        />
        <div>
          <p>
            Total weight <span style={{ fontWeight: "bold" }}> {weight}</span>
          </p>

          <p>
            Remaining <span style={{ fontWeight: "bold" }}> {remaining}</span>
          </p>
        </div>
        <CircularBar
          text={loading ? "loading" : "Remaining"}
          max={(remaining / weight) * 100}
          color={"red"}
          bgcolor={"#FF8378"}
        />
        {/* 
        <div style={{ maxWidth: "300px", position: "relative" }}>
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
            <p>Date</p>
            <p className="underline"> {cargoData.date}</p>
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
            <p style={{ textAlign: "center" }}>Trip</p>
            <p className="underline">
              {cargoData.pickUp} <span style={{ fontWeight: "bold" }}>To</span>{" "}
              {cargoData.dropOff}
            </p>
          </div>
          <div className="cargo-d">
            <p>Status</p>
            <p className="underline">{cargoData.status}</p>
          </div>
        </div>
      </div>
      {cargoData.status == "ACCEPT" ? (
        <button
          onClick={() => handleSendToCargo()}
          className="btn w-300 mx-auto btn-bg-blue"
        >
          Send To Cargo Owner
        </button>
      ) : (
        ""
      )}
      {/* PASSING CARGO ID FOR MARKETDETAIL TABLE FOR PAYMENT  */}
      <MarketDetailTable
        target={cargoDriver}
        marketStatus={cargoData.status}
        cargoId={cargoData.id}
      />
    </>
  );
};
//New Market data
const NewMarket = ({ cargoData, reload, setReload }) => {
  const [price, setPrice] = useState();
  const [isPaid,setIsPaid]=useState(false)
  const [amount,setAmount]=useState()
  const [loading, setLoading] = useState(false);
  //handle post to cargo owner
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  const handlePostCaroOwner = () => {
    if (!amount) {
      showErrorMessage({ message: "Please set Amount" });
    } else postAmount();
  };
  const postAmount = async () => {
   
    const item = { price:amount };
    console.log(item)
    const id = cargoData.id;
    console.log("user id is", id);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(item),
    };
    const api = `${mainAPI}/Api/Admin/setCargoOwnerPrice/${id}`;
    setLoading(true);
    try {
      const res = await fetch(api, options);
      const data = await res.json();
      localStorage.setItem('message',JSON.stringify(data["message"]))
      const message = localStorage.getItem('message')
      if (res.ok) {
        
        showSuccessMessage({ message: message });
        // setIsPaid(!isPaid)
      }
      else{
        showErrorMessage({ message:message});
      }
    } catch (e) {
      showErrorMessage({ message: e });
    } finally {
      setLoading(false);
      setReload(reload); // Reloading the Page for getting status;
    }
  };

  /// handle post to drivers
  const handlePost = () => {
    if (!price) {
      showErrorMessage({ message: "Please set Price" });
    } else postJob();
  };
  const postJob = async () => {
    const item = { price: price };
    const id = cargoData.id;
    console.log("user id is", id);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(item),
    };
    const postApi = `${mainAPI}/Api/Admin/PostCargo/${id}`;
    setLoading(true);
    try {
      const res = await fetch(postApi, options);
      if (res.ok) {
        const data = await res.json();
        showSuccessMessage({ message: data.message });
      }
    } catch (e) {
      showErrorMessage({ message: e });
    } finally {
      setLoading(false);
      setReload(reload); // Reloading the Page for getting status;
    }
  };
  return (
    <div>
      {loading ? <LoadingPage message={isPaid ?"Posting Cargo" : 'Sending Amount'} /> : ""}
      
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          maxWidth: "800px",
          rowGap: "25px",
          marginTop: "30px",
          marginLeft: "130px",
          marginRight: "auto",
        }}
      >
        
        <div>
          <div className="cargo-d">
            <p>Date</p>
            <p className="underline"> {cargoData.date}</p>
          </div>
          <div className="cargo-d">
            <p>Packaging </p>
            <p className="underline">{cargoData.packaging}</p>
          </div>
        </div>
        <div>
          <div className="cargo-d">
            <p>Phone Number</p>
            <p className="underline"> {cargoData.payment || "NULL"}</p>
          </div>
          <div className="cargo-d">
            <p>Cargo Type</p>
            <p className="underline"> {cargoData.cargoType}</p>
          </div>
        </div>
        <div>
          <div className="cargo-d">
            <p style={{ textAlign: "center" }}>Trip</p>
            <p className="underline">
              {cargoData.pickUp} <span style={{ fontWeight: "bold" }}>To</span>{" "}
              {cargoData.dropOff}
            </p>
          </div>
          <div className="cargo-d">
            <p>Payment Amount</p>
            <input
            className="underline"
            style={{
            marginTop: '10px',
            marginLeft: 'auto',
            marginRight: 'auto'}}
            type="text"
            placeholder="Amount"
            required
            onChange={(e) => setAmount(e.target.value)}
          />
          </div>
        </div>
      </div>
      <button className="btn w-300 mx-auto"
      // disabled={isPaid}  
      onClick={()=>handlePostCaroOwner()}>Send</button>
      <div className="manage-window input new-market-inputs">
        <div>
          <label>Cargo Owner</label>
          <input type="text" disabled defaultValue={cargoData.cargoOwner} />
        </div>
        <div>
          <label>Packaging</label>
          <input type="text" disabled defaultValue={cargoData.packaging} />
        </div>
        <div>
          <label>Type</label>
          <input type="text" disabled defaultValue={cargoData.cargoType} />
        </div>
        <div>
          <label>Pickup</label>
          <input type="text" disabled defaultValue={cargoData.pickUp} />
        </div>
        <div>
          <label>Drop Off</label>
          <input type="text" disabled defaultValue={cargoData.dropOff} />
        </div>
        <div>
          <label>Weight</label>
          <input type="text" disabled defaultValue={cargoData.weight} />
        </div>
        <div>
          <label>Price</label>
          <input
            type="text"
            
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
      <button className="btn w-300 mx-auto" 
      // disabled={!isPaid}
      onClick={() => handlePost()}>
        Post
      </button>
    </div>
  );
};
export default MarketDetail;
