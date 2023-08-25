import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import SettingCard from "../../components/cards/SettingCard";
import { MdSearch } from "react-icons/md";
import { FaBuildingColumns } from "react-icons/fa6";
import { FaTruckMoving, FaUser, FaUsers } from "react-icons/fa";
import { showErrorMessage } from "../../components/SwalMessages";
import { mainAPI } from "../../components/mainAPI";
const Users = () => {
  const [isCargo,setIsCargo]=useState(false)
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState("");
  const [activeCard, setActiveCard] = useState("totalVehicle");
  const [loading, setLoading] = useState("");
  const [notification, setNotification] = useState([]);
  const [role, setRole] = useState([]);
  const [driverStatus, setDriverStatus] = useState([]);
  const [driverState, setDriverState] = useState([]);
  const [alertType, setAlertType] = useState([]);
  const [businessSector, setBusinessSector] = useState([]);
  const [businessType, setBusinessType] = useState([]);
  const [vehicleCondition, setVehicleCondition] = useState([]);
  const [vehicleCatagory, setVehicleCatagory] = useState([]);
  const [LogoAvatar, setLogoAvatar] = useState([]);
  const [tripType, setTripType] = useState([]);
  const [cargoType, setCargoType] = useState([]);
  const [companySector, setcompanySector] = useState([]);
  const [companyType, setcompanyType] = useState([]);
  const [service, setservice] = useState([]);
  
  const apinotification = `${mainAPI}/Api/Admin/All/NotificationMedium`;
  const apiCompanySector= `${mainAPI}/Api/Admin/All/CompanySector/`; 
  const apiCompanyType= `${mainAPI}/Api/Admin/All/CompanyType/`; 
  const apiService= `${mainAPI}/Api/Admin/All/Services`; 
  const apiRoles= `${mainAPI}/Api/Admin/All`; 
  const apiDriverStatus= `${mainAPI}/Api/Admin/DriverStatus/All`; 
  const apiAlertType= `${mainAPI}/Api/Admin/AlertType/All/`; 
  const apiTripType= `${mainAPI}/Api/Admin/TripType/All`; 
  const apiBusinessSector= `${mainAPI}/Api/Admin/All/BusinessSectors`;
  const apiBusinessType = `${mainAPI}/Api/Admin/All/BusinessTypes`;
  const apiCargoType = `${mainAPI}/Api/Admin/All/CargoType`;
  const apiDriverState= `${mainAPI}/Api/Admin/DriverState/All`;
  const apiLogoAvatar= `${mainAPI}/Api/Admin/LogoandAvatar`;
  const apiVehicleCatagory = `${mainAPI}/Api/Admin/All/VehicleCatagory`;
  const apiVehicleCondition = `${mainAPI}/Api/Admin/All/VehicleCondition`;
 
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
  const getNotification = async () => {
    setLoading(true);
    try {
      const res = await fetch(apinotification, options);
      if (res.status == 401) {
        //showErrorMessage();
        showErrorMessage({
          message: "Unable to Load!! server respond with 401",
        });
      }
      const data = await res.json();
      if (data && res.ok) {
        console.log(data);
        
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
  //***** Company Users */
  const getCompanyUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiAlertType, options);
      if (res.status == 401) {
        //showErrorMessage();
        showErrorMessage({
          message: "Unable to Load!! server respond with 401",
        });
      }
      const data = await res.json();
      if (data && res.ok) {
        console.log(data)
       
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
  const getIndivisualUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiBusinessSector, options);
      if (res.status == 401) {
        //showErrorMessage();
        showErrorMessage({
          message: "Unable to Load!! server respond with 401",
        });
      }
      const data = await res.json();
      if (data && res.ok) {
        //console.log(data, "indivisual");
      
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
  const getCargoUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiBusinessType, options);
      if (res.status == 401) {
        //showErrorMessage();
        showErrorMessage({
          message: "Unable to Load!! server respond with 401",
        });
      }
      const data = await res.json();
      if (data && res.ok) {
        console.log(data)
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
  const [topCardDetail, setTopCardDetail] = useState([]);

  useEffect(() => {
    const generateRandomColor = () => {
      const randomColorValue = Math.floor(Math.random() * 16777215).toString(16); // Generates a random hex color value
      return `#${randomColorValue}`;
    };

    const initialTopCardDetail = [
      {
        title: "Total Users",
        data: 0,
        icon: FaUsers,
        color: generateRandomColor(),
        name: "Role",
      },
      {
        title: "Cargo",
        data: 0,
        icon: FaTruckMoving,
        color: generateRandomColor(),
        name: "Trip",
      },
      {
        title: "Indivisual",
        data: 0,
        icon: FaUser,
        color: generateRandomColor(),
        name: "Notification",
      },
      {
        title: "Company Sector",
        data: 0,
        icon: FaBuildingColumns,
        color: generateRandomColor(),
        name: "CompanySector",
      },
      {
        title: "Company Type",
        data: 0,
        icon: FaUsers,
        color: generateRandomColor(),
        name: "CompanyType",
      },
      {
        title: "Cargo Type",
        data: 0,
        icon: FaTruckMoving,
        color: generateRandomColor(),
        name: "cargoType",
      },
      {
        title: "Business Sector",
        data: 0,
        icon: FaUser,
        color: generateRandomColor(),
        name: "BusinessSector",
      },
      {
        title: "Business Sector",
        data: 0,
        icon: FaBuildingColumns,
        color: generateRandomColor(),
        name: "BusinessSector",
      },
      {
        title: "Service",
        data: 0,
        icon: FaUsers,
        color: generateRandomColor(),
        name: "service",
      },
      {
        title: "Driver State",
        data: 0,
        icon: FaTruckMoving,
        color: generateRandomColor(),
        name: "DriverState",
      },
      {
        title: "Driver Status",
        data: 0,
        icon: FaUser,
        color: generateRandomColor(),
        name: "DriverStatus",
      },
      {
        title: "Vehicle Catagory",
        data: 0,
        icon: FaBuildingColumns,
        color: generateRandomColor(),
        name: "VehicleCatagory",
      },
      {
        title: "Vehicle Condition",
        data: 0,
        icon: FaUsers,
        color: generateRandomColor(),
        name: "VehicleCondition",
      },
      {
        title: "Avatar & Logo",
        data: 0,
        icon: FaTruckMoving,
        color: generateRandomColor(),
        name: "AvatarLogo",
      },
      {
        title: "Alert",
        data: 0,
        icon: FaUser,
        color: 'whitesmoke',
        name: "Alert",
      }
    ];

    setTopCardDetail(initialTopCardDetail);
  }, []);
  
  
  const handleCardChange = (name) => {
    setActiveCard(name);
    switch (name) {
      case "totalusers":
        setTableData("");
        setIsCargo(false)
        break;
      case "cargo":
        setTableData("");
        setIsCargo(true)
        break;
      case "indivisual":
        setTableData("");
        setIsCargo(false)

        break;
      case "company":
        setTableData("");
        setIsCargo(false)

        break;
      default:
        setTableData("");
    }
  };

  return (
    <div style={{width:'100%'}}>
      <div>
        <div >
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
                <div className="setting-card-holder">
                  {topCardDetail.map((item, index) => (
                    <SettingCard
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
             
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
