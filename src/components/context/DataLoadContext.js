import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useUserContext } from "./UserContext";

const LoadDataContext = React.createContext(null);
export const useLoadContext = () => useContext(LoadDataContext);
const DataLoadContext = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [allDrivers, setAllDrivers] = useState([]);
  const [onRoute, setOnRoute] = useState([]);
  const [Assigned, setAssigned] = useState([]);
  const [unassigned, setUnassigned] = useState([]);
  const [permit, setPermit] = useState([]);
  const [error, setError] = useState();
  const [tableData, setTableData] = useState(allDrivers);
  const apiAllDrivers = "http://64.226.104.50:9090/Api/Admin/All/Drivers";
  const apiOnRoute = "http://64.226.104.50:9090/Api/Admin/Drivers/ONROUTE";
  const apiAssigned = "http://64.226.104.50:9090/Api/Admin/Drivers/ASSIGNED";
  const apiUnAssigned =
    "http://64.226.104.50:9090/Api/Admin/Drivers/UNASSIGNED";
  const apiPermit = "http://64.226.104.50:9090/Api/Admin/Drivers/PERMIT";
  const navigator = useNavigate();
  const { setCurrentUser } = useUserContext();
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
      console.log("response", res.status);
      if (res.status == 401) {
        swal({
          title: "Server respond With 401",
          text: `Your Session is expried`,
          icon: "error",
          dangerMode: true,
          buttons: ["cancel", "SignIn"],
          cancelButtonColor: "#d33",
          showClass: {
            popup: "animate__animated animate__shakeX",
          },
        }).then((signin) => {
          if (signin) {
            localStorage.removeItem("user");
            setCurrentUser(null);
            navigator("/");
          }
        });
        setLoading(false);
        setError("Unable to Load!! server respond with 401");
      }
      const data = await res.json();
      if (data.drivers) {
        setAllDrivers(data.drivers);
        setTableData(data.drivers);
      }
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
      if (data.drivers) setOnRoute(data.drivers);
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
      if (data.drivers) setAssigned(data.drivers);
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
      if (data.drivers) setUnassigned(data.drivers);
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
      if (data.drivers) setPermit(data.drivers);
      console.log(data.drivers);
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    }
  };
  return (
    <LoadDataContext.Provider
      value={{
        loading,
        setLoading,
        payload: {
          allDrivers: allDrivers,
          onRoute: onRoute,
          assigned: Assigned,
          unassigned: unassigned,
          permit: permit,
        },
      }}
    >
      {children}
    </LoadDataContext.Provider>
  );
};

export default DataLoadContext;
