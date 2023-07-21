import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import TopCards from "../../components/cards/TopCards";
import { MdError, MdPeople, MdVerified } from "react-icons/md";
import { FaRoute } from "react-icons/fa";
import { useLoadContext } from "../../components/context/DataLoadContext";
import DriversTable from "./DriversTable";
import "./driver.css";
function Drivers() {
  const [loading, setLoading] = useState(false);
  const [allDrivers, setAllDrivers] = useState([]);
  const [onRoute, setOnRoute] = useState([]);
  const [Assigned, setAssigned] = useState([]);
  const [unassigned, setUnassigned] = useState([]);
  const [permit, setPermit] = useState([]);
  const [error, setError] = useState();
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const apiAllDrivers = "http://64.226.104.50:9090/Api/Admin/All/Drivers";
  const apiOnRoute = "http://64.226.104.50:9090/Api/Admin/Drivers/ONROUTE";
  const apiAssigned = "http://64.226.104.50:9090/Api/Admin/Drivers/ASSIGNED";
  const apiUnAssigned =
    "http://64.226.104.50:9090/Api/Admin/Drivers/UNASSIGNED";
  const apiPermit = "http://64.226.104.50:9090/Api/Admin/Drivers/PERMIT";
  /**  GET JWT */
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  /** Option for fetch */
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
      Accept: "application/json",
    },
  };
  const { load, setLoad } = useLoadContext();
  /** Aborting fetch if it is taking to long */
  //   const controler = new AbortController();
  //   const timeout = setTimeout(() => {
  //     controler.abort();
  //     console.log("fetch aborted");
  //     setLoading(false);
  //     if (!allDataLoaded) setError("Unable to Connet to Database");
  //   }, 6000);
  useEffect(() => {
    const getAllApiData = async () => {
      await getAllDrivers();
      await getAssigned();
      await getOnRoute();
      await getUnAssigned();
      await getPermit();
      setLoading(false);
    };
    setLoading(true);
    getAllApiData();

    return () => {};
  }, []);
  const getAllDrivers = async () => {
    try {
      const res = await fetch(apiAllDrivers, options);
      const data = await res.json();
      setAllDrivers(data.drivers);
      console.log(data.drivers);
    } catch (e) {
      console.log(e.message);
      setError(e.message);
      setLoading(false);
    }
  };
  const getOnRoute = async () => {
    try {
      const res = await fetch(apiOnRoute, options);
      const data = await res.json();
      setOnRoute(data.drivers);
      console.log(data.drivers);
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    }
  };
  const getAssigned = async () => {
    try {
      const res = await fetch(apiAssigned, options);
      const data = await res.json();
      setAssigned(data.drivers);
      console.log(data.drivers);
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    }
  };
  const getUnAssigned = async () => {
    try {
      const res = await fetch(apiUnAssigned, options);
      const data = await res.json();
      setUnassigned(data.drivers);
      console.log(data.drivers);
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    }
  };
  const getPermit = async () => {
    try {
      const res = await fetch(apiPermit, options);
      const data = await res.json();
      setPermit(data.drivers);
      console.log(data.drivers);
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    }
  };
  const topCardDetail = [
    {
      title: "Total Driver",
      data: allDrivers.length || null,
      icon: MdPeople,
      color: "rgb(94, 175, 255)",
      name: "totalDriver",
    },
    {
      title: "OnRoute",
      data: onRoute.length || null,
      icon: FaRoute,
      color: "rgb(255, 234, 94)",
      name: "onRoute",
    },
    {
      title: "Assigned",
      data: Assigned.length || null,
      icon: MdVerified,
      color: "rgb(102, 255, 94)",
      name: "assigned",
    },
    {
      title: "Unassigned",
      data: unassigned.length || null,
      icon: MdError,
      color: "rgb(255, 94, 116)",
      name: "unassigned",
    },
    {
      title: "Permit",
      data: permit.length || 0,
      icon: MdError,
      color: "rgb(223, 94, 255)",
      name: "permit",
    },
  ];
  const handleCardChange = (name) => {
    console.log(name);
  };
  return (
    <div className="main-bar">
      <h2 style={{}}>Driver</h2>
      <hr className="hr" />
      <div>
        {error ? (
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
        ) : (
          ""
        )}
        {loading ? (
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
        ) : (
          !error && (
            <>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                {topCardDetail.map((item, index) => (
                  <TopCards
                    title={item.title}
                    icon={item.icon}
                    data={item.data}
                    color={item.color}
                    key={index}
                    handleCardChange={() => handleCardChange(item.name)}
                  />
                ))}
              </div>
              <div className="table-container">
                <DriversTable target={allDrivers} />
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default Drivers;
