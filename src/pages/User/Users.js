import React, { useState } from "react";
import ReactLoading from "react-loading";
import TopCards from "../../components/cards/TopCards";
import { MdSearch } from "react-icons/md";
import { FaBuildingColumns } from "react-icons/fa6";
import { FaTruckMoving, FaUser, FaUsers } from "react-icons/fa";
const Users = () => {
  const [allUsers, setallUsers] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState("");
  const [activeCard, setActiveCard] = useState("totalVehicle");
  const [loading, setLoading] = useState("");
  const api = "http://164.90.174.113:9090";
  const apiVehicleOwners = `${api}/Api/Admin/All/VehicleOwners`;
  const apiVehiceCatagory = `${api}/Api/Admin/All/VehicleCatagory`;
  const apiVehicleCondition = `${api}/Api/Admin/All/VehicleCondition`;
  const apiaddVehicle = `${api}/Api/Vehicle/AddVehicle`;
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  const options = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  const [refresh, setRefresh] = useState(false);
  const topCardDetail = [
    {
      title: "Total Users",
      data: 0,
      icon: FaUsers,
      color: "rgb(94, 175, 255)",
      name: "totalusers",
    },
    {
      title: "Cargo",
      data: 0,
      icon: FaTruckMoving,
      color: "rgb(255, 151, 39)",
      name: "cargo",
    },
    {
      title: "Indivisual",
      data: 0,
      icon: FaUser,
      color: "rgb(102, 255, 94)",
      name: "indivisual",
    },
    {
      title: "Company",
      data: 0,
      icon: FaBuildingColumns,
      color: "rgb(223, 94, 255)",
      name: "company",
    },
  ];
  const handleCardChange = (name) => {
    setActiveCard(name);
    switch (name) {
      case "totalVehicle":
        setTableData("");
        break;
      case "onRoute":
        setTableData("");
        break;
      case "parked":
        setTableData("");
        break;
      case "inStock":
        setTableData("");
        break;
      case "maintenance":
        setTableData("");
        break;
      default:
        setTableData("");
    }
  };
  const filterTable = (e) => {
    const { value } = e.target;
    const result = allUsers.filter((item) => {
      return (
        item.driverName.toLowerCase().includes(value.toLowerCase()) ||
        item.vehicleName.toLowerCase().includes(value.toLowerCase()) ||
        item.vehicleOwner.toLowerCase().includes(value.toLowerCase()) ||
        item.vehicleCatagory.toLowerCase().includes(value.toLowerCase()) ||
        item.plateNumber.toLowerCase().includes(value.toLowerCase()) ||
        item.status.toLowerCase().includes(value.toLowerCase()) ||
        item.plateNumber.toLowerCase().includes(value.toLowerCase())
      );
    });
    setTableData(result);
    if (value == "") setTableData("");
  };
  return (
    <div className="main-bar">
      <div>
        <h2 style={{}}>Users</h2>
        <hr className="hr" />
        <div className="main-bar-content">
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
                  <div className="search-bar">
                    <input
                      type="text"
                      name="search"
                      placeholder="Search..."
                      onChange={(e) => filterTable(e)}
                    />
                    <MdSearch size={25} />
                  </div>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
