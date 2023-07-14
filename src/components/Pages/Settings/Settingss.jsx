import React, { useState, useEffect } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import styles from './Settingss.module.css';
import { Link, NavLink } from 'react-router-dom';
import PopUp from './PopUp';
import Header from '../../Header/Header';
import Navigation from '../Navigation/Navigation';
// import { useHistory } from 'react-router-dom';
import AddItem from './AddItem'
import SyncLoader from "react-spinners/SyncLoader";
import swal from "sweetalert";
import Swal from 'sweetalert2';
import axios from 'axios';
/////////////////
import { AiFillCar } from "react-icons/ai";
import {BsFillBriefcaseFill} from "react-icons/bs"
import { RiGpsFill} from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { HiBellAlert } from "react-icons/hi2";
import { HiDocumentReport } from "react-icons/hi";
import { FaRegIdCard } from 'react-icons/fa';
import { BiTrip } from "react-icons/bi";
import { BsFillChatDotsFill } from "react-icons/bs";
import { ImUserTie } from "react-icons/im";
import Settingtable from './Settingtable';
import { event } from 'jquery';


export default function () { 
    let isAvatar = false;
    const [popup, setPop] = useState(false);
    const [title, setTitle] = useState("");
    const handleClickEdit = () => {
        setPop(!popup);
    }
    const handleClickEdit21 = (id, value, data, title) => {
        console.log(value)
        Swal.fire({
            title: title,
            width: "580px",
            html: isAvatar ? `<div><input type="file" id="avatar"   class="swallpop" value=${id}>
            <input type="file" id="logo" class="swallpop" value=${value}></div>`:
            `<div> <input type="text" id="login"  class="swallpop" value =${value}></div>`
            ,
                    
             confirmButtonText: 'Update',
            showCloseButton: true,
            confirmButtonColor: '#00cc44',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp' 
            },
            preConfirm: () => {
                if (isAvatar)
                {
                    const avatar = Swal.getPopup().querySelector('#avatar').files[0];
                    const logo = Swal.getPopup().querySelector('#logo').files[0];
                    if (!avatar || !logo) {
                    Swal.showValidationMessage('Please select both files');
                    }
                    return { avatar, logo };
                }
                else{
                const login = Swal.getPopup().querySelector('#login').value
                if (!login) {
                    Swal.showValidationMessage(`Please enter data`)
                }
                
                return { login: login }
            }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                if (isAvatar)
                {
                    const { avatar, logo } = result.value;
                    console.log(avatar, logo)
                    Update(avatar, logo, data)
                }
                else
                Update(id, result.value.login, data)
            }
        })

    }
   
        const Update = (id, value, data) => {
        if (data == "Update_Role") {
            Update_Role(id, value);
        }
        // if (data == 'Driver_Status') {
        //     Update_Driver_Status(id, value);
        // }
        if (data == 'Update_Alert') {
            Update_Alert(id, value);
        }
        if (data == 'Update_Trip_Type') {
            Update_Trip_Type(id, value);
        }
        if (data == "Update_Notification") {
            Update_Notification(id, value);
        }
        if (data === 'Update_VehicleCondition') {
            Update_VehicleCondition(id, value);
        }
        if (data === 'Service_Needed') {
            Service_Needed(id, value);
        }
        if (data === 'Update_VehicleCatagory') {
            Update_VehicleCatagory(id, value);
        }
        if (data === 'Update_CompanyType') {
            Update_CompanyType(id, value);
        }
        if (data == 'Update_CompanySector') {
            Update_CompanySector(id, value);
        }
        if (data == 'Update_CargoType') {
            Update_CargoType(id, value);
        }
        //update Avatar
        if (data == 'Update_Avatar') {
            Update_Avatar_logo(id, value);
        }
        // Update_Business_Type
        if (data == 'Update_Business_Type') {
            Update_Business_Type(id, value);
        }
        //Update_Business_Sector
        if (data == 'Update_Business_Sector') {
            Update_Business_Sector(id, value);
        }
    };
    /******************Update Avatar and cargo****** */
    const Update_Avatar_logo = async (avatar, logo) => {
        if (!avatar || !logo) {
           
          swal('Error', 'Please select both images.', 'error');
          return;
        }
        console.log("Update_Avatar_logo",avatar, logo)
        const formData = new FormData();
        formData.append("logo", logo);
        formData.append("avatar", avatar);
    
        try {
          const response = await axios.put(
            'http://64.226.104.50:9090/Api/Admin/UpdateLogo',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${jwt}`,
              },
            }
          );
    
          localStorage.setItem("message", JSON.stringify(response.data["message"]));
          const mess = localStorage.getItem("message");
          console.log(response);
          swal("Successfully Updated", `${mess}`, "success", {
            button: true,
          });

        } catch (error) {
          if (error.response) {
            localStorage.setItem('message', JSON.stringify(error.response.data['message']));
            const messx = localStorage.getItem('message');
            console.log('message', messx);
            console.log(error.response.data);
            swal("Error", `${messx}`, "error", {
              button: true,
            });
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
        }
      };
    /**********update cargo type */
    async function  Update_CargoType(id, cargotype) {

        let item =
        {
            cargoType: cargotype, 
        };
        const options = {
            method: "PUT",
            headers: {'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}`},
            body: JSON.stringify(item),
        };
        const url = `http://64.226.104.50:9090/Api/Admin/CargoType/Update/${id}`;
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal("Successful", `${mess}`, "success", { buttons: false, timer: 2000, });
                setPop(false);
            } else {
                swal(`Failed To Register ${mess}`, "Error", "error");
            }
        } catch (error) {
            console.error(error);
        }
    }
//Update_Business_Type
async function  Update_Business_Type(id, BusinessType) {

    let item =
    {
        businessType: BusinessType, 
    };
    const options = {
        method: "PUT",
        headers: {'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}`},
        body: JSON.stringify(item),
    };
    const url = `http://64.226.104.50:9090/Api/Admin/BusinessType/Update/${id}`;
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        localStorage.setItem("message", JSON.stringify(result["message"]));
        const mess = localStorage.getItem("message");
        if (response.ok) {
            swal("Successful", `${mess}`, "success", { buttons: false, timer: 2000, });
            setPop(false);
        } else {
            swal(`Failed To Register ${mess}`, "Error", "error");
        }
    } catch (error) {
        console.error(error);
    }
}
//  Update_Business_Sector
async function  Update_Business_Sector(id, businessSector) {

    let item =
    {
        businessSector: businessSector, 
    };
    const options = {
        method: "PUT",
        headers: {'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}`},
        body: JSON.stringify(item),
    };
    const url = `http://64.226.104.50:9090/Api/Admin/BusinessSector/Update/${id}`;
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        localStorage.setItem("message", JSON.stringify(result["message"]));
        const mess = localStorage.getItem("message");
        if (response.ok) {
            swal("Successful", `${mess}`, "success", { buttons: false, timer: 2000, });
            setPop(false);
        } else {
            swal(`Failed To Register ${mess}`, "Error", "error");
        }
    } catch (error) {
        console.error(error);
    }
}
//Role
    async function Update_Role(id, rolename) {

        let item =
        {
            rolename, 
        };
        const options = {
            method: "PUT",
            headers: {'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}`},
            body: JSON.stringify(item),
        };
        const url = `http://64.226.104.50:8090/Api/Admin/Role/${id}`;
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal("Successful", `${mess}`, "success", { buttons: false, timer: 2000, });
                setPop(false);
            } else {
                swal(`Failed To Register ${mess}`, "Error", "error");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function Update_Trip_Type(id, tripType) {

        let item =
        {
            tripType, 
        };
        const options = {
            method: "PUT",
            headers: {'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}`},
            body: JSON.stringify(item),
        };
        const url = `http://64.226.104.50:9090/Api/Admin/TripType/All/${id}`;
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal("Successful", `${mess}`, "success", { buttons: false, timer: 2000, });
                setPop(false);
            } else {
                swal(`Failed To Register ${mess}`, "Error", "error");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function Service_Needed(id, serviceNeeded) {

        let item =
        {
            serviceNeeded, 
        };
        const options = {
            method: "PUT",
            headers: {'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}`},
            body: JSON.stringify(item),
        };
        const url = `http://64.226.104.50:9090/Api/Admin/Services/Update/${id}`;
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal("Successful", `${mess}`, "success", { buttons: false, timer: 2000, });
                setPop(false);
            } else {
                swal(`Failed To Register ${mess}`, "Error", "error");
            }
        } catch (error) {
            console.error(error);
        }
    }




    async function Update_Alert(id, alertType) {

        let item =
        {
            alertType, 
        };
        const options = {
            method: "PUT",
            headers: {'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}`},
            body: JSON.stringify(item),
        };
        const url = `http://64.226.104.50:9090/Api/Admin/AlertType/Update/${id}`;
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal("Successful", `${mess}`, "success", { buttons: false, timer: 2000, });
                setPop(false);
            } else {
                swal(`Failed To Register ${mess}`, "Error", "error");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function Update_Notification(id, notification) {

        let item =
        {
            notification, 
        };
        const options = {
            method: "PUT",
            headers: {'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}`},
            body: JSON.stringify(item),
        };
        const url = `http://64.226.104.50:9090/Api/Admin/NotificationMedium/Update/${id}`;
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal("Successful", `${mess}`, "success", { buttons: false, timer: 2000, });
                setPop(false);
            } else {
                swal(`Failed To Register ${mess}`, "Error", "error");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function Update_VehicleCondition(id, vehicleConditon) {

        let item =
        {
            vehicleConditon, 
        };
        const options = {
            method: "PUT",
            headers: {'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}`},
            body: JSON.stringify(item),
        };
        const url = `http://64.226.104.50:9090/Api/Admin/VehicleCondition/Update/${id}`;
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal("Successful", `${mess}`, "success", { buttons: false, timer: 2000, });
                setPop(false);
            } else {
                swal(`Failed To Register ${mess}`, "Error", "error");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function Update_VehicleCatagory(id, vehicleCatagory) {

        let item =
        {
            vehicleCatagory, 
        };
        const options = {
            method: "PUT",
            headers: {'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}`},
            body: JSON.stringify(item),
        };
        const url = `http://64.226.104.50:9090/Api/Admin/VehicleCatagory/Update/${id}`;
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal("Successful", `${mess}`, "success", { buttons: false, timer: 2000, });
                setPop(false);
            } else {
                swal(`Failed To Register ${mess}`, "Error", "error");
            }
        } catch (error) {
            console.error(error);
        }
    }



    async function Update_CompanyType(id, companyType) {

        let item =
        {
            companyType, 
        };
        const options = {
            method: "PUT",
            headers: {'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}`},
            body: JSON.stringify(item),
        };
        const url = `http://64.226.104.50:9090/Api/Admin/CompanyType/Update/${id}`;
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal("Successful", `${mess}`, "success", { buttons: false, timer: 2000, });
                setPop(false);
            } else {
                swal(`Failed To Register ${mess}`, "Error", "error");
            }
        } catch (error) {
            console.error(error);
        }
    }


    async function Update_CompanySector(id, companysector) {

        let item =
        {
            companysector, 
        };
        const options = {
            method: "PUT",
            headers: {'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}`},
            body: JSON.stringify(item),
        };
        const url = `http://64.226.104.50:9090/Api/Admin/CompanySector/Update/${id}`;
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal("Successful", `${mess}`, "success", { buttons: false, timer: 2000, });
                setPop(false);
            } else {
                swal(`Failed To Register ${mess}`, "Error", "error");
            }
        } catch (error) {
            console.error(error);
        }
    }

    
    

    const [edit, setEdit] = useState("");
    const setValue = (variable) => {
        setEdit(`${variable}`)
    }
    const jwt = JSON.parse(localStorage.getItem('jwt'));// Getting the token from login api
    const options = {
        method: "GET",
        headers: { 'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}` },
    };

    const urlTwo = " http://64.226.104.50:9090/Api/Admin/All/NotificationMedium";
    const [dataSource2, setDataSource2] = useState([])
    useEffect(() => {
        setLoading(true)
        fetch(urlTwo, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource2(data.notificationMedias)
                setLoading(false)
            })
    }, [])
    const urlthree = "http://64.226.104.50:9090/Api/Admin/All/VehicleCatagory";
    const [dataSource3, setDataSource3] = useState([])
    useEffect(() => {
        setLoading(true)
        fetch(urlthree, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource3(data.vehicleCatagories)
                setLoading(false)
            })
    }, [])
    const urlFour = "http://64.226.104.50:9090/Api/Admin/All/VehicleCondition";
    const [dataSource4, setDataSource4] = useState([])
    useEffect(() => {
        setLoading(true)
        fetch(urlFour, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource4(data.vehicleConditions)
                setLoading(false)
            })
    }, [])
    const url = "http://64.226.104.50:9090/Api/Admin/All/CompanySector/";
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        fetch(url, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource(data.companySectors)
            })
    }, [])
    const url5 = "http://64.226.104.50:9090/Api/Admin/All/CompanyType/";
    const [dataSourc5, setDataSource5] = useState([])
    useEffect(() => {
        fetch(url5, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource5(data.companyTypes)
            })
    }, [])
    const url6 = "http://64.226.104.50:9090/Api/Admin/All/Services";
    const [datasource6, setDataSource6] = useState([])
    useEffect(() => {
        fetch(url6, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource6(data.service)
            })
    }, [])

    useEffect(() => {
        FethData()
    }, [])
    const url7 = "http://64.226.104.50:9090/Api/Admin/All";
    const [dataSource7, setDataSource7] = useState([])
    const FethData = () => {
        setLoading(true)
        fetch(url7, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource7(data.roles)
                setLoading(false)
            })
    }


    const url8 = "http://64.226.104.50:9090/Api/Admin/DriverStatus/All";
    const [dataSource8, setDataSource8] = useState([])
    useEffect(() => {
        setLoading(true)
        fetch(url8, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource8(data.driverStatus)
                setLoading(false)
            })
    }, [])

    const url9 = "http://64.226.104.50:9090/Api/Admin/AlertType/All/";
    const [dataSource9, setDataSource9] = useState([])
    useEffect(() => {
        setLoading(true)
        fetch(url9, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource9(data.alertTypes)
                setLoading(false)
            })
    }, [])

    const url10 = "http://64.226.104.50:9090/Api/Admin/TripType/All";
    const [dataSource10, setDataSource10] = useState([])
    useEffect(() => {
        setLoading(true)
        fetch(url10, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource10(data.triptypes)
                setLoading(false)
            })
    }, [])
    // BusinessSector and
    const BusinessSectorurl = "http://64.226.104.50:9090/Api/Admin/All/BusinessSectors";
    const [BusinessSector, setBusinessSector] = useState([])
    useEffect(() => {
        setLoading(true)
        fetch(BusinessSectorurl, options)
            .then(respnse => respnse.json())
            .then(data => {
                setBusinessSector(data.businessSectors)
                setLoading(false)
            })
    }, [])
    const BusinessTypeurl = "http://64.226.104.50:9090/Api/Admin/All/BusinessTypes";
    const [BusinessType, setBusinessType] = useState([])
    useEffect(() => {
        setLoading(true)
        fetch(BusinessTypeurl, options)
            .then(respnse => respnse.json())
            .then(data => {
                setBusinessType(data.businessSectors)
                setLoading(false)
            })
    }, [])
// Cargo type
const cargourl = "http://64.226.104.50:9090/Api/Admin/All/CargoType";
    const [cargo, setCargo] = useState([])
    useEffect(() => {
        setLoading(true)
        fetch(cargourl, options)
            .then(respnse => respnse.json())
            .then(data => {
                setCargo(data.cargoTypes)
                setLoading(false)
            })
    }, [])
    
    //driver state
   
const DriverStateurl = "http://64.226.104.50:9090/Api/Admin/DriverState/All";
const [DriverState, setDriverState] = useState([])
useEffect(() => {
    setLoading(true)
    fetch(DriverStateurl, options)
        .then(respnse => respnse.json())
        .then(data => {
            setDriverState(data.driverState)
            setLoading(false)
        })
}, [])
    // logo and avatar
    const avatarurl = "http://64.226.104.50:9090/Api/Admin/LogoandAvatar";
    const [avatar, setAvatar] = useState([])
    useEffect(() => {
        setLoading(true)
        fetch(avatarurl, options)
            .then(respnse => respnse.json())
            .then(data => {
                // console.log(data)
                setAvatar(data)
                setLoading(false)
            })
    }, [])

    const [Loading, setLoading] = useState([])
    let [color, setColor] = useState("green");
    let [margin, setMargin] = useState("");



    const handleClick = (data, event) => {
        event.preventDefault();
    localStorage.setItem("info",   JSON.stringify(data));
      window.location.href = "/Settingtable";
   
    };
    return (
        <div className="alert_container">

            {/*---------------navigation---------------*/}
            <Navigation path="/settings" title="Settings"></Navigation>

            {/* --------------- Settings header --------------- */}
            {/* <Header title="Settings"></Header> */}
            <div className={styles.main_content} >

<div className={styles.dashboardContents}>

    <div className={styles.totalVehicles}  onClick={(event)=>{handleClick({url:"http://64.226.104.50:9090/Api/Admin/All", 
                                                                name:"Roles Type",title:'Role Type',
                                                                createUrl:"http://64.226.104.50:9090/Api/Admin/CreateRole"},event)}} >
            <h4>Roles </h4>
            <div className={styles.innerCard}>
                {/* <AiFillCar size="2.6rem" ></AiFillCar> */}
                <p>{dataSource7.length}</p>
            </div>
       
    </div>

    <div className={styles.totalVehicles}onClick={(event)=>{handleClick({url:"http://64.226.104.50:9090/Api/Admin/DriverStatus/All", 
                                                                name:"Driver Status"},event)}}>
        {/* <Link to="/Settingtable" style={{ textDecoration: 'none' }} > */}
            <h4>Driver status </h4>
            <div className={styles.innerCard}>
                {/* <ImUserTie size="2.4rem"></ImUserTie> */}
                <p>{dataSource8.length}</p>
            </div> 
        {/* </Link> */}
    </div>


    <div className={styles.message} onClick={(event)=>{handleClick({url:"http://64.226.104.50:9090/Api/Admin/AlertType/All/", 
                                                                name:"Alert Type"},event)}}>
        {/* <Link to="" style={{ textDecoration: 'none' }} > */}
            <h4>Alert type </h4>
            <div className={styles.innerCard2}>
                {/* <BsFillChatDotsFill size="2.4rem" ></BsFillChatDotsFill> */}
                {/* <p>{dataSource4.length}</p> */}
                <p>{dataSource9.length}</p> 
            </div>
        {/* </Link> */}
    </div>

    <div className={styles.users} onClick={(event)=>{handleClick({url:"http://64.226.104.50:9090/Api/Admin/TripType/All", 
                                                                name:"Trip type"},event)}} >
        
            <h4>Trip type</h4>
            <div className={styles.innerCard3}>
                {/* <FaUsers size="2.5rem" color='#002e4d'></FaUsers> */}
                <p>{dataSource10 && dataSource10.length}</p>
            </div>
       
    </div>

    <div className={styles.registration} onClick={(event)=>{handleClick({url:"http://64.226.104.50:9090/Api/Admin/All/NotificationMedium", 
                                                                name:"Notification Preference"},event)}} >
        {/* <Link to="" style={{ textDecoration: 'none' }} > */}
            <h4>Notifications </h4>
            <div className={styles.innerCard3}>
                {/* <FaRegIdCard size="2.5rem" color='#00802b'></FaRegIdCard> */}
                <p>{dataSource2 && dataSource2.length}</p>
            </div>
        {/* </Link> */}
    </div>

    <div className={styles.trip} onClick={(event)=>{handleClick({url:"http://64.226.104.50:9090/Api/Admin/All/VehicleCondition", 
                                                                name:"Vehicle Condition"},event)}}>
        {/* <Link to="" style={{ textDecoration: 'none' }} > */}
            <h4>Vehicle Condition </h4>
            <div className={styles.innerCard3}>
              {/* <BiTrip size="2.6rem" color='#009999'></BiTrip> */}
              <p>{dataSource4 && dataSource4.length}</p>
            </div>
           
        {/* </Link> */}
    </div>

    <div className={styles.report} onClick={(event)=>{handleClick({url:"http://64.226.104.50:9090/Api/Admin/All/Services", 
                                                                name:"Service Needed"},event)}}>
        {/* <Link to="" style={{ textDecoration: 'none' }} > */}
            <h4>Service Needed </h4>
            <div className={styles.innerCard3}>
                {/* <HiDocumentReport size="2.6rem" color='#005c99'></HiDocumentReport> */}
                <p>{datasource6 && datasource6.length}</p>
            </div>
        {/* </Link> */}
    </div>

    <div className={styles.alert} onClick={(event)=>{handleClick({url:"http://64.226.104.50:9090/Api/Admin/All/VehicleCatagory", 
                                                                name:"Vehicle Category"},event)}}>
        {/* <Link to="" style={{ textDecoration: 'none' }} > */}
            <h4>Vehicle Category </h4>
            <div className={styles.innerCard7}>
                {/* <HiBellAlert size="2.6rem" color='#F80404'></HiBellAlert> */}
                <p>{dataSource3 && dataSource3.length}</p>
            </div>
        {/* </Link> */}
    </div>

    <div className={styles.tracking} onClick={(event)=>{handleClick({url:"http://64.226.104.50:9090/Api/Admin/All/CompanyType/", 
                                                                name:"Company Type"},event)}}>
        {/* <Link to="" style={{ textDecoration: 'none' }} > */}
            <h4>Company Type </h4>
            <div className={styles.innerCard3}>
                {/* <RiGpsFill size="2.6rem" color='#404040'></RiGpsFill> */}
           <p>{dataSourc5 && dataSourc5.length}</p>
            </div>
        {/* </Link> */}
    </div>
    <div className={styles.users} onClick={(event)=>{handleClick({url:"http://64.226.104.50:9090/Api/Admin/All/CompanySector/", 
                                                                name:"Company Sector"},event)}}>
        {/* <Link to="" style={{ textDecoration: 'none' }} > */}
            <h4>Company Sector </h4>
            <div className={styles.innerCard3}>
                {/* <BsFillBriefcaseFill  size="2.5rem" color='#5959b1'></BsFillBriefcaseFill > */}
                <p>{dataSource && dataSource.length}</p>
            </div>
        {/* </Link> */}
    </div>


    <div className={styles.totalVehicles} onClick={(event)=>{handleClick({url:"http://64.226.104.50:9090/Api/Admin/All/BusinessTypes", 
                                                                name:"Business Type"},event)}}>
        {/* <Link to="" style={{ textDecoration: 'none' }} > */}
            <h4>Business Type </h4>
            <div className={styles.innerCard}>
                {/* <AiFillCar size="2.6rem" ></AiFillCar> */}
                <p>{BusinessType && BusinessType.length}</p>
            </div>
        {/* </Link> */}
    </div>

    <div className={styles.totalVehicles} onClick={()=>{handleClick({url:"http://64.226.104.50:9090/Api/Admin/All/BusinessSectors", 
                                                                name:"Business Sector"})}}>
        {/* <Link to="" style={{ textDecoration: 'none' }} > */}
            <h4>Business Sector </h4>
            <div className={styles.innerCard}>
                {/* <ImUserTie size="2.4rem"></ImUserTie> */}
                <p>{BusinessSector && BusinessSector.length}</p>
            </div> 
        {/* </Link> */}
    </div>


    <div className={styles.message} onClick={(event)=>{handleClick({url:"http://64.226.104.50:9090/Api/Admin/All/CargoType", 
                                                                name:"Cargo type"},event)}}>
        {/* <Link to="" style={{ textDecoration: 'none' }} > */}
            <h4>Cargo type</h4>
            <div className={styles.innerCard2}>
                {/* <BsFillChatDotsFill size="2.4rem" ></BsFillChatDotsFill> */}
                {/* <p>{dataSource4.length}</p> */}
                <p>{cargo && cargo.length}</p> 
            </div>
        {/* </Link> */}
    </div>

    <div className={styles.users} onClick={(event)=>{handleClick({url:"http://64.226.104.50:9090/Api/Admin/LogoandAvatar", 
                                                                name:"Avatar and Logo"},event)}}>
        {/* <Link to="" style={{ textDecoration: 'none' }} > */}
            <h4>Avatar and Logo</h4>
            <div className={styles.innerCard3}>
                {/* <FaUsers size="2.5rem" color='#002e4d'></FaUsers> */}
                <p>{avatar.length}</p>
            </div>
        {/* </Link> */}
    </div>

    <div className={styles.registration} onClick={(event)=>{handleClick({url:"http://64.226.104.50:9090/Api/Admin/DriverState/All", 
                                                                name:" "},event)}}>
        {/* <Link to="" style={{ textDecoration: 'none' }} > */}
            <h4>Driver state </h4>
            <div className={styles.innerCard3}>
                {/* <FaRegIdCard size="2.5rem" color='#00802b'></FaRegIdCard> */}
                <p>{DriverState && DriverState.length}</p>
            </div>
        {/* </Link> */}
    </div>

    </div>
</div>


            </div>

    )
}