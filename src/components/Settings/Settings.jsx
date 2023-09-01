import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import SettingCard from "../../components/cards/SettingCard";
import { MdSearch } from "react-icons/md";
import { FaBuildingColumns } from "react-icons/fa6";
import { FaTruckMoving, FaUser, FaUsers } from "react-icons/fa";
import { showErrorMessage } from "../../components/SwalMessages";
import { mainAPI } from "../../components/mainAPI";
import SettingTable from "./SettingTable";
const Users = () => {
  const [name, setname] = useState("");
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState("");
  const [activeCard, setActiveCard] = useState("totalVehicle");
  const [loading, setLoading] = useState(true);
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
  const apiCompanySector = `${mainAPI}/Api/Admin/All/CompanySector/`;
  const apiCompanyType = `${mainAPI}/Api/Admin/All/CompanyType/`;
  const apiService = `${mainAPI}/Api/Admin/All/Services`;
  const apiRoles = `${mainAPI}/Api/Admin/All`;
  const apiDriverStatus = `${mainAPI}/Api/Admin/DriverStatus/All`;
  const apiAlertType = `${mainAPI}/Api/Admin/AlertType/All/`;
  const apiTripType = `${mainAPI}/Api/Admin/TripType/All`;
  const apiBusinessSector = `${mainAPI}/Api/Admin/All/BusinessSectors`;
  const apiBusinessType = `${mainAPI}/Api/Admin/All/BusinessTypes`;
  const apiCargoType = `${mainAPI}/Api/Admin/All/CargoType`;
  const apiDriverState = `${mainAPI}/Api/Admin/DriverState/All`;
  const apiLogoAvatar = `${mainAPI}/Api/Admin/LogoandAvatar`;
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
  const getRole = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiRoles, options);
      if (res.status == 401) {
        //showErrorMessage();
        showErrorMessage({
          message: "Unable to Load!! server respond with 401",
        });
      }
      const data = await res.json();
      if (data && res.ok) {
        console.log(data);
        setRole(data.roles);
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
  const getTrip = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiTripType, options);
      if (res.status == 401) {
        //showErrorMessage();
        showErrorMessage({
          message: "Unable to Load!! server respond with 401",
        });
      }
      const data = await res.json();
      if (data && res.ok) {
        console.log(data);
        setTripType(data.triptypes);
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
  const getService = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiService, options);
      if (res.status == 401) {
        //showErrorMessage();
        showErrorMessage({
          message: "Unable to Load!! server respond with 401",
        });
      }
      const data = await res.json();
      if (data && res.ok) {
        console.log(data);
        setservice(data.service);
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
  const getNOtification = async () => {
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
        setNotification(data.notificationMedias);
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

  const getCompanySector = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiCompanySector, options);
      if (res.status == 401) {
        //showErrorMessage();
        showErrorMessage({
          message: "Unable to Load!! server respond with 401",
        });
      }
      const data = await res.json();
      if (data && res.ok) {
        console.log(data);
        setcompanySector(data.companySectors);
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
  const getCompanyType = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiCompanyType, options);
      if (res.status == 401) {
        //showErrorMessage();
        showErrorMessage({
          message: "Unable to Load!! server respond with 401",
        });
      }
      const data = await res.json();
      if (data && res.ok) {
        console.log(data);
        setcompanyType(data.companyTypes);
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
  const getBusinessSector = async () => {
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
        console.log(data);
        setBusinessSector(data.businessSectors);
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
  const getBusinessType = async () => {
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
        console.log(data);
        setBusinessType(data.businessSectors);
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
  const getDriverStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiDriverStatus, options);
      if (res.status == 401) {
        //showErrorMessage();
        showErrorMessage({
          message: "Unable to Load!! server respond with 401",
        });
      }
      const data = await res.json();
      if (data && res.ok) {
        console.log(data);
        setDriverStatus(data.driverStatus);
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
  const getDriverState = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiDriverState, options);
      if (res.status == 401) {
        //showErrorMessage();
        showErrorMessage({
          message: "Unable to Load!! server respond with 401",
        });
      }
      const data = await res.json();
      if (data && res.ok) {
        console.log(data);
        setDriverState(data.driverState);
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
  const getAlert = async () => {
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
        console.log(data);
        setAlertType(data.alertTypes);
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
  const getCargoType = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiCargoType, options);
      if (res.status == 401) {
        //showErrorMessage();
        showErrorMessage({
          message: "Unable to Load!! server respond with 401",
        });
      }
      const data = await res.json();
      if (data && res.ok) {
        console.log(data);
        setCargoType(data.cargoTypes);
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

  const getLogoAvatar = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiLogoAvatar, options);
      if (res.status == 401) {
        //showErrorMessage();
        showErrorMessage({
          message: "Unable to Load!! server respond with 401",
        });
      }
      const data = await res.json();
      if (data && res.ok) {
        console.log(data);
        setLogoAvatar(data.avatar, data.logo);
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
  const getVehicleCatagory = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiVehicleCatagory, options);
      if (res.status == 401) {
        //showErrorMessage();
        showErrorMessage({
          message: "Unable to Load!! server respond with 401",
        });
      }
      const data = await res.json();
      if (data && res.ok) {
        console.log(data);
        setVehicleCatagory(data.vehicleCatagories);
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
  const getvehicleCondition = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiVehicleCondition, options);
      if (res.status == 401) {
        //showErrorMessage();
        showErrorMessage({
          message: "Unable to Load!! server respond with 401",
        });
      }
      const data = await res.json();
      if (data && res.ok) {
        console.log(data);
        setVehicleCondition(data.vehicleConditions);
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

  console.log(notification.length, role.length);
  const [topCardDetail, setTopCardDetail] = useState([]);

  useEffect(() => {
    getRole();
    getAlert();
    getBusinessSector();
    getBusinessType();
    getCompanySector();
    getCompanyType();
    getDriverState();
    getDriverStatus();
    getLogoAvatar();
    getNOtification();
    getService();
    getTrip();
    getVehicleCatagory();
    getvehicleCondition();
    getCargoType();
 

    
    setTableData(role);
    setname("Role");
  }, []);

  const TopCardDetail = [
    {
      title: "Role",
      data: role.length || 0,
      icon: FaUsers,
      color: "",
      name: "Role",
    },
    {
      title: "Notification",
      data: notification.length || 0,
      icon: FaTruckMoving,
      color: "",
      name: "Notification",
    },
    {
      title: "Driver Status",
      data: driverStatus.length || 0,
      icon: FaUser,
      color: "",
      name: "DriverStatus",
    },
    {
      title: "Driver State",
      data: driverState.length || 0,
      icon: FaBuildingColumns,
      color: "",
      name: "DriverState",
    },
    {
      title: "Alert Type",
      data: alertType.length || 0,
      icon: FaUsers,
      color: "",
      name: "AlertType",
    },
    {
      title: "Business Sector",
      data: businessSector.length || 0,
      icon: FaTruckMoving,
      color: "",
      name: "BusinessSector",
    },
    {
      title: "Business Type",
      data: businessType.length || 0,
      icon: FaUser,
      color: "",
      name: "BusinessType",
    },
    {
      title: "Vehicle Condition",
      data: vehicleCondition.length || 0,
      icon: FaBuildingColumns,
      color: "",
      name: "VehicleCondition",
    },
    {
      title: "Vehicle Catagory",
      data: vehicleCatagory.length || 0,
      icon: FaUsers,
      color: "",
      name: "VehicleCatagory",
    },
    {
      title: "Logo Avatar",
      data: 2,
      icon: FaTruckMoving,
      color: "",
      name: "LogoAvatar",
    },
    {
      title: "Trip Type",
      data: tripType.length || 0,
      icon: FaUser,
      color: "",
      name: "TripType",
    },
    {
      title: "Cargo Type",
      data: cargoType.length || 0,
      icon: FaBuildingColumns,
      color: "",
      name: "CargoType",
    },
    {
      title: "Company Sector",
      data: companySector.length || 0,
      icon: FaUsers,
      color: "",
      name: "CompanySector",
    },
    {
      title: "CompanyType",
      data: companyType.length || 0,
      icon: FaTruckMoving,
      color: "",
      name: "CompanyType",
    },
    {
      title: "service",
      data: service.length || 0,
      icon: FaUser,
      color: "whitesmoke",
      name: "service",
    },
  ];


  const handleCardChange = (name) => {
    setActiveCard(name);
    switch (name) {
      case "Role":
        setTableData(role);
        setname("Role");
        break;

      case "DriverStatus":
        setTableData(driverState);
        setname("DriverStatus");

        break;
      case "DriverState":
        setTableData(driverState);
        setname("DriverState");

        break;

      case "AlertType":
        setTableData(alertType);
        setname("AlertType");
        break;
      case "BusinessSector":
        setTableData(businessSector);
        setname("BusinessSector");
        break;
      case "BusinessType":
        setTableData(businessType);
        setname("BusinessType");

        break;
      case "VehicleCondition":
        setTableData(vehicleCondition);
        setname("VehicleCondition");
        break;
      case "VehicleCatagory":
        setTableData(vehicleCatagory);
        setname("VehicleCatagory");
        break;
      case "Notification":
        setTableData(notification);
        setname("Notification");
        break;
      case "LogoAvatar":
        setTableData(LogoAvatar);
        setname("LogoAvatar");

        break;
      case "TripType":
        setTableData(tripType);
        setname("TripType");

        break;

      case "CargoType":
        setTableData(cargoType);
        setname("CargoType");
        break;
      case "CompanySector":
        setTableData(companySector);
        setname("CompanySector");
        break;
      case "CompanyType":
        setTableData(companyType);
        setname("CompanyType");

        break;
      case "service":
        setTableData(service);
        setname("service");

        break;
      default:
        setTableData("");
    }
  };
  const filterTable = (e) => {
    const { value } = e.target;
    const result = role.filter((item) => {
      return (
        item.companyName.toLowerCase().includes(value.toLowerCase()) ||
        item.firstName.toLowerCase().includes(value.toLowerCase()) ||
        item.email.toLowerCase().includes(value.toLowerCase()) ||
        item.phoneNumber.toLowerCase().includes(value.toLowerCase()) ||
        item.roles.toLowerCase().includes(value.toLowerCase())
      );
    });
    setTableData(result);
    if (value == "") setTableData(result);
  };
  return (
    <div className="main-bar">
      <div>
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
                <h2>System Settings</h2>
                <hr />
                <br />
                <div className="setting-card-holder">
                  {TopCardDetail.map((item, index) => (
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
          <SettingTable target={tableData} name={name} />
        </div>
      </div>
    </div>
  );
};

export default Users;
