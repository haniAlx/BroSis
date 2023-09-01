import React, { useState,useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { mainAPI } from "../../components/mainAPI";
import { showErrorMessage } from "../../components/SwalMessages";
import SettingList from './SettingList'
import SettingTable from './SettingTable'

const SystemSetting = () => {
  const [show, setShow] = useState(false);
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
        setLogoAvatar(data);
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
  const ListCardDetail = [
    {
      title: "Role",
      data: role.length || 0,
       name: "Role",
    },
    {
      title: "Notification",
      data: notification.length || 0,
      
      name: "Notification",
    },
    {
      title: "Driver Status",
      data: driverStatus.length || 0,
      name: "DriverStatus",
    },
    {
      title: "Driver State",
      data: driverState.length || 0,
      
      name: "DriverState",
    },
    {
      title: "Alert Type",
      data: alertType.length || 0,
       name: "AlertType",
    },
    {
      title: "Business Sector",
      data: businessSector.length || 0,
      
      name: "BusinessSector",
    },
    {
      title: "Business Type",
      data: businessType.length || 0,
      name: "BusinessType",
    },
    {
      title: "Vehicle Condition",
      data: vehicleCondition.length || 0,
      name: "VehicleCondition",
    },
    {
      title: "Vehicle Catagory",
      data: vehicleCatagory.length || 0,
       name: "VehicleCatagory",
    },
    {
      title: "Logo Avatar",
      data: {LogoAvatar},
      
      name: "LogoAvatar",
    },
    {
      title: "Trip Type",
      data: tripType.length || 0,
      name: "TripType",
    },
    {
      title: "Cargo Type",
      data: cargoType.length || 0,
      name: "CargoType",
    },
    {
      title: "Company Sector",
      data: companySector.length || 0,
       name: "CompanySector",
    },
    {
      title: "CompanyType",
      data: companyType.length || 0,
      
      name: "CompanyType",
    },
    {
      title: "service",
      data: service.length || 0,
      name: "service",
    },
  ];


  const handleChange = (name) => {
    setShowSetting(true);
    setActiveCard(name);
    switch (name) {
      case "Role":
        setTableData(role);
        setname("Role");
        break;

      case "DriverStatus":
        setTableData(driverStatus);
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

  const [showSetting, setShowSetting] = useState(false);
  // const handleSetting = () => {
  //   setShowSetting(true);
  // };

  const showSettingList = () => {
    setShow(!show);
    // const listSettingContainer = document.getElementById("show-setting");
    // listSettingContainer.style.maxHeight = "auto";
    // listSettingContainer.style.overflow = "auto";
    // console.log("setting");
  };
  return (
    <div className="setting-cards">
         {showSetting && (
        <SettingTable
        name={name}
        setShowSetting={setShowSetting}
          target={tableData}
        />
      )}
      <div
        className="setting-title-container"
        onClick={() => showSettingList()}
      >
        SystemSetting
        <MdKeyboardArrowDown size={20} />
      </div>
      {show && (
        <div className="setting-list-container" id="show-setting">
          <ul className="setting-sublist">
            {ListCardDetail.map((item, index) => (
                 <li key={index}>  <SettingList
                      title={item.title}
                      data={item.data}
                      key={index}
                      handleCardChange={() => handleChange(item.name)}
                      active={activeCard}
                      name={item.name}
                    /></li> 
                  ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SystemSetting;
