import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import TopCards from "../../components/cards/TopCards";
import { MdError, MdPeople, MdVerified } from "react-icons/md";
import { FaRoute } from "react-icons/fa";
import { useLoadContext } from "../../components/context/DataLoadContext";
import DriversTable from "./DriversTable";
import "./driver.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import ManageDriver from "./ManageDriver";
function Drivers() {
  const [loading, setLoading] = useState(false);
  const [allDrivers, setAllDrivers] = useState([]);
  const [onRoute, setOnRoute] = useState([]);
  const [Assigned, setAssigned] = useState([]);
  const [unassigned, setUnassigned] = useState([]);
  const [permit, setPermit] = useState([]);
  const [error, setError] = useState();
  const [tableData, setTableData] = useState(allDrivers);
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
  const navigate = useNavigate();
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
      if (res.status == 401) {
        swal({
          title: "Server respond With 401",
          text: `Unable to Load Data `,
          icon: "error",
          dangerMode: true,
          buttons: {
            confirm: true,
          },
          cancelButtonColor: "#d33",
          showClass: {
            popup: "animate__animated animate__shakeX",
          },
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
  const topCardDetail = [
    {
      title: "Total Driver",
      data: allDrivers.length || null,
      icon: MdPeople,
      color: "rgb(94, 175, 255)",
      name: "totalDrivers",
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
  const [activeCard, setActiveCard] = useState("totalDrivers");
  /** Handling Card Change */
  const handleCardChange = (name) => {
    setActiveCard(name);
    switch (name) {
      case "totalDrivers":
        setTableData(allDrivers);
        break;
      case "onRoute":
        setTableData(onRoute);
        break;
      case "assigned":
        setTableData(Assigned);
        break;
      case "unassigned":
        setTableData(unassigned);
        break;
      case "permit":
        setTableData(permit);
        break;
      default:
        setTableData(allDrivers);
    }
  };
  const [showManage, setShowManage] = useState(false);
  const [driverDetail, setDriverDetail] = useState();
  const handleManage = (item) => {
    setShowManage(true);
    setDriverDetail(item);
    console.log(item);
  };
  return (
    <div className="main-bar">
      {showManage && (
        <ManageDriver
          setShowManage={setShowManage}
          driverDetail={driverDetail}
        />
      )}
      <h2 style={{}}>Driver</h2>
      <hr className="hr" />
      <div className="main-bar-driver">
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
              <div className="top-card-holder">
                {topCardDetail.map((item, index) => (
                  <TopCards
                    title={item.title}
                    icon={item.icon}
                    data={item.data}
                    color={item.color}
                    key={index}
                    handleCardChange={() => handleCardChange(item.name)}
                    active={activeCard}
                    name={item.name}
                  />
                ))}
              </div>
              <div className="table-container">
                <DriversTable
                  target={tableData}
                  handleManage={(val) => handleManage(val)}
                />
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default Drivers;
