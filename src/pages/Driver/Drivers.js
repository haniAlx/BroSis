import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
function Drivers() {
  const [loading, setLoading] = useState(true);
  const [allDrivers, setAllDrivers] = useState();
  const [onRoute, setOnRoute] = useState();
  const [Assigned, setAssigned] = useState();
  const [unassigned, setUnassigned] = useState();
  const [permit, setPermit] = useState();
  const [error, setError] = useState();
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
  const controler = new AbortController();
  const timeout = setTimeout(() => controler.abort(), 3000);
  useEffect(() => {
    const getAllApiData = async () => {
      await getAllDrivers();
      await getAssigned();
      await getOnRoute();
      await getUnAssigned();
      await getPermit();
      setLoading(false);
    };
    getAllApiData();
    return () => {
      setError("");
      setLoading(true);
    };
  }, []);
  const getAllDrivers = async () => {
    try {
      const res = await fetch(apiAllDrivers, options, {
        signal: controler.signal,
      });
      const data = await res.json();
      setAllDrivers(data.drives);
      console.log(data.drivers);
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    } finally {
      clearTimeout(timeout);
    }
  };
  const getOnRoute = async () => {
    try {
      const res = await fetch(apiOnRoute, options);
      const data = await res.json();
      setOnRoute(data.drives);
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
      setAssigned(data.drives);
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
      setUnassigned(data.drives);
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
      setPermit(data.drives);
      console.log(data.drivers);
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    }
  };
  return (
    <div className="main-bar">
      <h2 style={{}}>Driver</h2>
      <hr className="hr" />
      <div>
        {error ? <p>{error}</p> : ""}
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
          <></>
        )}
      </div>
    </div>
  );
}

export default Drivers;
