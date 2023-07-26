import React, { useEffect, useState } from "react";
import { FaRoute } from "react-icons/fa";
import {
  MdAutoGraph,
  MdCarCrash,
  MdDirectionsCar,
  MdOutlineLocalParking,
} from "react-icons/md";
import ReactLoading from "react-loading";
import TopCards from "../../components/cards/TopCards";
import VehicleTable from "./VehicleTable";
import swal from "sweetalert";
import { useUserContext } from "../../components/context/UserContext";
import { useNavigate } from "react-router-dom";
const Vehicle = () => {
  const [allVehicle, setAllVehicle] = useState([]);
  const [vehicleonRoute, setVehicleOnRoute] = useState([]);
  const [parked, setParked] = useState([]);
  const [inStock, setInStock] = useState([]);
  const [maintence, setMaintence] = useState([]);
  const [tableData, setTableData] = useState(allVehicle);
  const [error, setError] = useState("");
  const [activeCard, setActiveCard] = useState("totalVehicle");
  const [loading, setLoading] = useState("");
  const { setCurrentUser } = useUserContext();
  const api = "http://164.90.174.113:9090";
  const apiAllVehicle = `${api}/Api/Admin/All/Vehicles`;
  const apiMaintaining = `${api}/Api/Admin/All/Vehicles/Status/MAINTAINING`;
  const apiVehicleOnRoute = `${api}/Api/Admin/All/Vehicles/Status/ONROUTE`;
  const apiInStock = `${api}/Api/Admin/All/Vehicles/Status/INSTOCK`;
  const apiParked = `${api}/Api/Admin/All/Vehicles/Status/PARKED`;
  const apiChangeAssignedDriver = `${api}/Api/Vehicle/ChangeAssignedDriver`;
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  const options = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  useEffect(() => {
    const getVehicleData = async () => {
      setLoading(true);
      getAllVehicle();
      getVehicleOnRoute();
      getVehicleParked();
      getVehicleMaintaning();
      getVehicleInStock();
    };
    getVehicleData();
  }, []);
  const showErrorMessage = () => {
    swal({
      title: "Server respond With 401",
      text: `Your Session is expried`,
      icon: "error",
      dangerMode: true,
      buttons: ["cancel", "SignIn"],
      cancelButtonColor: "#d33",
    }).then((signin) => {
      if (signin) {
        localStorage.removeItem("user");
        setCurrentUser(null);
        navigator("/");
      }
    });
  };
  const getAllVehicle = async () => {
    try {
      setLoading(true);
      const res = await fetch(apiAllVehicle, options);
      console.log("response", res.status);
      if (res.status == 401) {
        showErrorMessage();
        setLoading(false);
        setError("Unable to Load!! server respond with 401");
      }
      const data = await res.json();
      if (data && res.ok) {
        console.log(data);
        setAllVehicle(data.vehiclesINF);
        //work on this
        setTableData(data.vehiclesINF);
      }
      if (res.status == 400) {
        setError("Invalid API server 400");
      }
    } catch (e) {
      console.log(e.message);
      setError(e.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const getVehicleOnRoute = async () => {
    try {
      setLoading(true);
      const res = await fetch(apiVehicleOnRoute, options);
      if (res.status == 401) {
        showErrorMessage();
        setLoading(false);
        setError("Unable to Load!! server respond with 401");
      }
      const data = await res.json();
      if (data && res.ok) {
        setVehicleOnRoute(data.inRoutelist);
        //work on this
        //setTableData(data.vehiclesINF);
      }
      if (res.status == 400) {
        setError("Invalid API server 400");
      }
    } catch (e) {
      console.log(e.message);
      setError(e.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const getVehicleParked = async () => {
    try {
      setLoading(true);
      const res = await fetch(apiParked, options);
      if (res.status == 401) {
        showErrorMessage();
        setLoading(false);
        setError("Unable to Load!! server respond with 401");
      }
      const data = await res.json();
      if (data && res.ok) {
        setParked(data.parkedList);
        //work on this
      }
      if (res.status == 400) {
        setError("Invalid API server 400");
      }
    } catch (e) {
      console.log(e.message);
      setError(e.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const getVehicleMaintaning = async () => {
    try {
      setLoading(true);
      const res = await fetch(apiMaintaining, options);
      if (res.status == 401) {
        showErrorMessage();
        setLoading(false);
        setError("Unable to Load!! server respond with 401");
      }
      const data = await res.json();
      if (data && res.ok) {
        setMaintence(data.maintainingList);
        //work on this
      }
      if (res.status == 400) {
        setError("Invalid API server 400");
      }
    } catch (e) {
      console.log(e.message);
      setError(e.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const getVehicleInStock = async () => {
    try {
      setLoading(true);
      const res = await fetch(apiInStock, options);
      if (res.status == 401) {
        showErrorMessage();
        setLoading(false);
        setError("Unable to Load!! server respond with 401");
      }
      const data = await res.json();
      if (data && res.ok) {
        setInStock(data.stockedList);
      }
      if (res.status == 400) {
        setError("Invalid API server 400");
      }
    } catch (e) {
      console.log(e.message);
      setError(e.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const topCardDetail = [
    {
      title: "Total Vehicle",
      data: allVehicle.length || 0,
      icon: MdDirectionsCar,
      color: "rgb(94, 175, 255)",
      name: "totalVehicle",
    },
    {
      title: "Vehicle OnRoute",
      data: vehicleonRoute.length || 0,
      icon: FaRoute,
      color: "rgb(255, 151, 39)",
      name: "onRoute",
    },
    {
      title: "Parked",
      data: parked.length || 0,
      icon: MdOutlineLocalParking,
      color: "rgb(102, 255, 94)",
      name: "parked",
    },
    {
      title: "In Stock",
      data: inStock.length || 0,
      icon: MdAutoGraph,
      color: "rgb(223, 94, 255)",
      name: "inStock",
    },
    {
      title: "Maintenance",
      data: maintence.length || 0,
      icon: MdCarCrash,
      color: "rgb(255, 94, 116)",
      name: "maintenance",
    },
  ];
  const handleCardChange = (name) => {
    setActiveCard(name);
    switch (name) {
      case "totalVehicle":
        setTableData(allVehicle);
        break;
      case "onRoute":
        setTableData(vehicleonRoute);
        break;
      case "parked":
        setTableData(parked);
        break;
      case "inStock":
        setTableData(inStock);
        break;
      case "maintenance":
        setTableData(maintence);
        break;
      default:
        setTableData(allVehicle);
    }
  };
  const navigate = useNavigate();
  const handleManage = () => {};
  const showDetail = (item) => {
    navigate(`/vehicle/detail/${item.id}`);
  };
  return (
    <div className="main-bar">
      <div>
        <h2 style={{}}>Vehicles</h2>
        <hr className="hr" />

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
              <div className="">
                <VehicleTable
                  target={tableData}
                  handleManage={(val) => handleManage(val)}
                  showDetail={(val) => showDetail(val)}
                />
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Vehicle;
