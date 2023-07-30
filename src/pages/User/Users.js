import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import TopCards from "../../components/cards/TopCards";
import { MdSearch } from "react-icons/md";
import { FaBuildingColumns } from "react-icons/fa6";
import { FaTruckMoving, FaUser, FaUsers } from "react-icons/fa";
import UserTable from "./UserTable";
import { showErrorMessage } from "../../components/SwalMessages";
import { mainAPI } from "../../components/mainAPI";
const Users = () => {
  const [allUsers, setallUsers] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState("");
  const [activeCard, setActiveCard] = useState("totalVehicle");
  const [loading, setLoading] = useState("");
  const apiVehicleOwners = `${mainAPI}/Api/Admin/All/VehicleOwners`;
  const apiVehicleCatagory = `${mainAPI}/Api/Admin/All/VehicleCatagory`;
  const apiVehicleCondition = `${mainAPI}/Api/Admin/All/VehicleCondition`;
  const apiaddVehicle = `${mainAPI}/Api/Vehicle/AddVehicle`;
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  const options = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  /** REFRESH WHEN THERE IS NETWORK ERROR */
  const [refresh, setRefresh] = useState(false);

  /** GET VEHICLE DETAIL  */
  const getDetail = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiVehicleOwners, options);
      if (res.status == 401) {
        //showErrorMessage();
        setError("Unable to Load!! server respond with 401");
      }
      const data = await res.json();
      if (data && res.ok) {
        setallUsers(data.vehicleOwnerINF);
        setTableData(data.vehicleOwnerINF);
      }
      if (res.status == 400) {
        setError("Invalid API server 400");
      }
    } catch (e) {
      showErrorMessage(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);
  const topCardDetail = [
    {
      title: "Total Users",
      data: allUsers.length || 0,
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
      case "totalusers":
        setTableData(allUsers);
        break;
      case "cargo":
        setTableData("");
        break;
      case "indivisual":
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
        item.companyName.toLowerCase().includes(value.toLowerCase()) ||
        item.firstName.toLowerCase().includes(value.toLowerCase()) ||
        item.email.toLowerCase().includes(value.toLowerCase()) ||
        item.phoneNumber.toLowerCase().includes(value.toLowerCase()) ||
        item.roles.toLowerCase().includes(value.toLowerCase())
      );
    });
    setTableData(result);
    if (value == "") setTableData(allUsers);
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
                  <UserTable target={tableData} />
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
