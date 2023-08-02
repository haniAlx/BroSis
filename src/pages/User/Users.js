import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import TopCards from "../../components/cards/TopCards";
import { MdSearch } from "react-icons/md";
import { FaBuildingColumns } from "react-icons/fa6";
import { FaTruckMoving, FaUser, FaUsers } from "react-icons/fa";
import UserTable from "./UserTable";
import { showErrorMessage } from "../../components/SwalMessages";
import { mainAPI } from "../../components/mainAPI";
import CargoTable from './CargoTable'
const Users = () => {
  const [allUsers, setallUsers] = useState([]);
  const [cargoUsers,setCargoUsers]=useState([])
  const [individual, setIndividual]= useState([])
  const [owners,setOwners]=useState([])
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState("");
  const [activeCard, setActiveCard] = useState("totalVehicle");
  const [loading, setLoading] = useState("");
  const apiVehicleOwners = `${mainAPI}/Api/Admin/All/VehicleOwners`;
  const apiCargoUsers = `${mainAPI}/Api/Admin/All/CargoOwners`;
  const apiIndividual = `${mainAPI}/Api/Admin/All/VehicleOwners/Role/individual`;
  const apiOwners = `${mainAPI}/Api/Admin/All/VehicleOwners/Role/owner`;
  const apiaddVehicle = `${mainAPI}/Api/Vehicle/AddVehicle`;
   const [isCargo, seIisCargo]=useState(false)
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
        showErrorMessage({
          message: "Unable to Load!! server respond with 401",
        });
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
  const getCargoUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(apiCargoUsers, options);
      if (res.status == 401) {
        showErrorMessage();
        setLoading(false);
        setError("Unable to Load!! server respond with 401");
      }
      const data = await res.json();
      if (data && res.ok) {
        setCargoUsers(data.cargoOwners);
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
  const getIndividual = async () => {
    try {
      setLoading(true);
      const res = await fetch(apiIndividual, options);
      if (res.status == 401) {
        showErrorMessage();
        setLoading(false);
        setError("Unable to Load!! server respond with 401");
      }
      const data = await res.json();
      if (data && res.ok) {
        setIndividual(data.vehicleOwnerINF);
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
  const getOwners = async () => {
    try {
      setLoading(true);
      const res = await fetch(apiOwners, options);
      if (res.status == 401) {
        showErrorMessage();
        setLoading(false);
        setError("Unable to Load!! server respond with 401");
      }
      const data = await res.json();
      if (data && res.ok) {
        setOwners(data.vehicleOwnerINF);
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
  useEffect(() => {
    getDetail();
    getIndividual();
    getCargoUsers()
    getOwners()
  }, []);
  const topCardDetail = [
    {
      title: "Total Users",
      data: allUsers.length + cargoUsers.length || 0,
      icon: FaUsers,
      color: "rgb(94, 175, 255)",
      name: "totalusers",
    },
    {
      title: "Cargo",
      data: cargoUsers.length || 0,
      icon: FaTruckMoving,
      color: "rgb(255, 151, 39)",
      name: "cargo",
    },
    {
      title: "Indivisual",
      data: individual.length || 0,
      icon: FaUser,
      color: "rgb(102, 255, 94)",
      name: "indivisual",
    },
    {
      title: "Company",
      data: owners.length || 0,
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
      case "cargo":{
        setTableData(cargoUsers);
        seIisCargo(!isCargo)
      }
        break;
      case "indivisual":
        setTableData(individual);
        break;
      case "company":
        setTableData(owners);
        break;
      default:
        setTableData("");
    }
  };
  console.log(tableData)
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
    // setTableData(result);
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
                 {isCargo ? <CargoTable target={tableData} />: <UserTable target={tableData} />}
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
