import React, { useState, useEffect } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import './settings.css';
import { Link, NavLink } from 'react-router-dom';
import PopUp from './PopUp';
import Header from '../../Header/Header';
import Navigation from '../Navigation/Navigation';
import DeleteItem from './Settingtable'
import AddItem from './AddItem'
import SyncLoader from "react-spinners/SyncLoader";
import swal from "sweetalert";
import Swal from 'sweetalert2';
import axios from 'axios';


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
    const handleClickDelete = (id,data) => {
        Swal.fire({
            text: `Are you sure You Want to Delete This ${data}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00cc44',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok!',
            showCloseButton: true,
            showClass: {
                popup: 'animate__animated animate__shakeX'
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Delete(id)
            }
        })
    }
    // const DeleteL = (id)=>{
    //     Delete(id);
    // }
    async function Delete(id) {
        const mess = localStorage.getItem("message");
        const options = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            };
        await axios.delete(`${id}`,options).then((response) => {
            // Success 🎉
            localStorage.setItem("message", JSON.stringify(response["message"]));
           
            swal(`${mess}`, "success", {
                buttons: false, timer: 2000,
            });
        }).catch(function (error) {
            if (error.response) {
              // Request made and server responded
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
              swal(`Failed To delete ${mess}`, "error");
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

    return (
        <div className="alert_container">

            {/*---------------navigation---------------*/}
            <Navigation path="/settings" title="Settings"></Navigation>

            {/* --------------- Settings header --------------- */}
            {/* <Header title="Settings"></Header> */}

            <div className='alert_main'>

                <div className='outer_setting'>
                    <div className='setting_header'>Roles</div>
                    <PopUp title="Create_Role" />
                    {Loading ?
                        <p className="loading" >
                            <SyncLoader
                                color={color}
                                Left={margin}
                                loading={Loading}
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </p>
                        : <div>
                            <div className="outer_vehicle_table7" id='myTable'>
                                <table class="vehicle_table7" id="myTable">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Role</th>
                                            <th>Created Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataSource7 && dataSource7.map(item => {
                                            return <tr className='active_row'>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.createdDate}</td>
                                                <td>
                                                    <p className='notification_actions'>
                                                        <FaEdit title='Edit' className='action_edit' size="1.4rem" color='green'
                                                            onClick={() => {
                                                                handleClickEdit21(item.id, item.name, "Update_Role", "Edit Role")
                                                            }}></FaEdit>
                                                        <MdDeleteForever title='Delete' className='action_edit' size="1.6rem" color='red' onClick={() => {handleClickDelete(item.id, "Role")}}></MdDeleteForever>
                                                    </p>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                </div>

                <div className='outer_setting'>
                    <div className='setting_header'>Driver Status</div>
                    <PopUp title="Create_Driver_Status" />
                    {Loading ?
                        <p className='loading'><SyncLoader
                            color={color}
                            Left={margin}
                            loading={Loading}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        </p>
                        : <div>
                            <div className="outer_vehicle_table7" id='myTable'>
                                <table class="vehicle_table7" id="myTable">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Driver Status</th>
                                            <th>Created Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataSource8 && dataSource8.map(item => {
                                            return <tr className='active_row'>

                                                <td>{item.id}</td>
                                                <td>{item.driverStatus}</td>
                                                <td></td>
                                                <td>
                                                    <p className='notification_actions'>
                                                        <FaEdit title='Edit' className='action_edit' size="1.4rem" color='green'
                                                            onClick={() => {
                                                                handleClickEdit()
                                                                setTitle("Edit Driver Status")
                                                                // setValue(item.driverStatus)
                                                            }}></FaEdit>
                                                        <MdDeleteForever title='Delete' className='action_edit' size="1.6rem" color='red' onClick={() => {handleClickDelete(item.id, "Driver_Status")}}></MdDeleteForever>
                                                    </p>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                </div>

                <div className='outer_setting'>
                    <div className='setting_header'>Alert Types</div>
                    <PopUp title="Create_Alert_Type" />
                    {Loading ?
                        <p className='loading'><SyncLoader
                            color={color}
                            Left={margin}
                            loading={Loading}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        </p>
                        : <div>
                            <div className="outer_vehicle_table7" id='myTable'>
                                <table class="vehicle_table7" id="myTable">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Alert Type</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataSource9 && dataSource9.map(item => {
                                            return <tr className='active_row'>

                                                <td>{item.id}</td>
                                                <td>{item.alertType}</td>
                                                <td>{item.createdDate}</td>
                                                <td>
                                                    <p className='notification_actions'>
                                                        <FaEdit title='Edit' className='action_edit' size="1.4rem" color='green'
                                                            onClick={() => {
                                                                handleClickEdit21(item.id, item.alertType, "Update_Alert", "Edit Alert Type")
                                                            }}></FaEdit>
                                                        <MdDeleteForever title='Delete' className='action_edit' size="1.6rem" color='red' onClick={() => {handleClickDelete(item.id, "Alert_Type")}}></MdDeleteForever>
                                                    </p>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                </div>

                <div className='outer_setting'>
                    <div className='setting_header'>Trip Management</div>
                    <PopUp title="Create_Trip_Type" />
                    {Loading ?
                        <p className='loading'><SyncLoader
                            color={color}
                            Left={margin}
                            loading={Loading}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        </p>
                        : <div>
                            <div className="outer_vehicle_table7" id='myTable'>
                                <table class="vehicle_table7" id="myTable">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Trip Type</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataSource10 && dataSource10.map(item => {
                                            return <tr className='active_row'>

                                                <td>{item.id}</td>
                                                <td>{item.tripType}</td>
                                                <td>{item.createdDate}</td>
                                                <td>
                                                    <p className='notification_actions'>
                                                        <FaEdit title='Edit' className='action_edit' size="1.4rem" color='green'
                                                            onClick={() => {
                                                                handleClickEdit21(item.id, item.tripType, "Update_Trip_Type", "Edit Trip Type")
                                                            }}></FaEdit>
                                                        <MdDeleteForever title='Delete' className='action_edit' size="1.6rem" color='red'onClick={() => {handleClickDelete(item.id, "Trip_Type")}}></MdDeleteForever>
                                                    </p>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                </div>

                <div className='outer_setting'>
                    <div className='setting_header'>Notification Preference</div>
                    <PopUp title="Add_Notification" />
                    {Loading ?
                        <p className='loading'><SyncLoader
                            color={color}
                            Left={margin}
                            loading={Loading}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        /></p>
                        : <div>
                            <div className="outer_vehicle_table7" id='myTable'>
                                <table class="vehicle_table7" id="myTable">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Notification Preference</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataSource2 && dataSource2.map(item => {
                                            return <tr className='active_row'>

                                                <td>{item.id}</td>
                                                <td>{item.medium}</td>
                                                <td>{item.status}</td>
                                                <td>
                                                    <p className='notification_actions'>
                                                        <FaEdit title='Edit' className='action_edit' size="1.4rem" color='green'
                                                            onClick={() => {
                                                                handleClickEdit21(item.id, item.medium, "Update_Notification", "Edit Notification Preference")
                                                                setTitle("Edit Notification Preference")
                                                                // setValue(item.medium)
                                                            }}></FaEdit>
                                                        <MdDeleteForever title='Delete' className='action_edit' size="1.6rem" color='red' onClick={() => {handleClickDelete(item.id, "Notification_Preference")}}></MdDeleteForever>
                                                    </p>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                </div>

                <div className='outer_setting'>
                    <div className='setting_header'>Vehicle Condition</div>
                    <PopUp title="Add_Vehicle_Condition" nandu={edit} />
                    <div>
                        {Loading ?
                            <p className='loading'><SyncLoader
                                color={color}
                                Left={margin}
                                loading={Loading}
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /></p> :
                            <div className="outer_vehicle_table7" id='myTable'>
                                <table class="vehicle_table7" id="myTable">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Vehicle Condition</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataSource4 && dataSource4.map(item => {
                                            return <tr className='active_row'>
                                                <td>{item.id}</td>
                                                <td>{item.conditionName}</td>
                                                <td>{item.status}</td>
                                                <td>
                                                    <p className='notification_actions'>
                                                        <FaEdit title='Edit' className='action_edit' size="1.4rem" color='green'
                                                            onClick={() => {
                                                                handleClickEdit21(item.id, item.conditionName, "Update_VehicleCondition", "Edit Vehicle Condition")
                                                            }}></FaEdit>
                                                        <MdDeleteForever title='Delete' className='action_edit' size="1.6rem" color='red' onClick={() => {handleClickDelete(item.id, "Vehicle_Condition")}}></MdDeleteForever>
                                                    </p>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>

                </div>

                <div className='outer_setting'>
                    <div className='setting_header'>Service Needed</div>
                    <PopUp title="Add_Service_Needed" />
                    <div>
                        {Loading ?
                            <p className='loading'><SyncLoader
                                color={color}
                                Left={margin}
                                loading={Loading}
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /></p>
                            :
                            <div className="outer_vehicle_table7" id='myTable'>
                                <table class="vehicle_table7" id="myTable">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Service Needed</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {datasource6 && datasource6.map(item => {
                                            return <tr className='active_row'>
                                                <td>{item.id}</td>
                                                <td>{item.service}</td>
                                                <td>{item.status}</td>
                                                <td>
                                                    <p className='notification_actions'>
                                                        <FaEdit title='Edit' className='action_edit' size="1.4rem" color='green'
                                                            onClick={() => {
                                                                handleClickEdit21(item.id, item.service, "Service_Needed", "Edit Service Needed")
                                                            }}></FaEdit>
                                                        <MdDeleteForever title='Delete' className='action_edit' size="1.6rem" color='red' onClick={() => {handleClickDelete(item.id, "Service")}}></MdDeleteForever>
                                                    </p>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>

                <div className='outer_setting'>
                    <div className='setting_header'>Vehicle Category</div>
                    <PopUp title="Add_vehicle_category" />
                    <div>
                        {Loading ?
                            <p className='loading'><SyncLoader
                                color={color}
                                Left={margin}
                                loading={Loading}
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /></p>
                            :
                            <div className="outer_vehicle_table7" id='myTable'>
                                <table class="vehicle_table7" id="myTable">

                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Vehicle Category</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataSource3 && dataSource3.map(item => {
                                            return <tr className='active_row'>
                                                <td>{item.id}</td>
                                                <td>{item.catagory}</td>
                                                <td>{item.status}</td>
                                                <td>
                                                    <p className='notification_actions'>
                                                        <FaEdit title='Edit' className='action_edit' size="1.4rem" color='green'
                                                            onClick={() => {
                                                                handleClickEdit21(item.id, item.catagory, "Update_VehicleCatagory", "Edit Vehicle Category")
                                                            }}></FaEdit>
                                                        <MdDeleteForever title='Delete' className='action_edit' size="1.6rem" color='red'
                                                         onClick={() => {handleClickDelete(`http://64.226.104.50:9090/Api/Admin/VehicleCatagory/${item.id}`, item.catagory)}}></MdDeleteForever>
                                                    </p>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>

                <div className='outer_setting'>
                    <div className='setting_header'>Company Type</div>
                    <PopUp title="Add_company_type" />
                    <div>
                        {Loading
                            ? <p className='loading'><SyncLoader
                                color={color}
                                Left={margin}
                                loading={Loading}
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /></p>
                            :
                            <div className="outer_vehicle_table7" id='myTable'>
                                <table class="vehicle_table7" id="myTable">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Company Type</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataSourc5 && dataSourc5.map(item => {
                                            return <tr className='active_row'>
                                                <td>{item.id}</td>
                                                <td>{item.companyType}</td>
                                                <td>{item.status}</td>
                                                <td>
                                                    <p className='notification_actions'>
                                                        <FaEdit title='Edit' className='action_edit' size="1.4rem" color='green'
                                                            onClick={() => {
                                                                handleClickEdit21(item.id, item.companyType, "Update_CompanyType", "Edit Company Type")
                                                            }}></FaEdit>
                                                        <MdDeleteForever title='Delete' className='action_edit' size="1.6rem" color='red' onClick={() => {handleClickDelete(item.id, "Company_Type")}}></MdDeleteForever>
                                                    </p>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>

                <div className='outer_setting'>
                    <div title='Company Sector' className='setting_header'>Company Sector</div>
                    <PopUp title="Add_company_sector" />
                    <div>
                        {Loading
                            ? <p className='loading'><SyncLoader
                                color={color}
                                Left={margin}
                                loading={Loading}
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /></p>
                            :
                            <div className="outer_vehicle_table7" id='myTable'>
                                <table class="vehicle_table7" id="myTable">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Company Sector</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataSource && dataSource.map(item => {
                                            return <tr className='active_row'>
                                                <td title='Company Id'>{item.id}</td>
                                                <td title='Sector Name'>{item.sectorName}</td>
                                                <td title='Status'>{item.status}</td>
                                                <td>
                                                    <p className='notification_actions'>
                                                        <FaEdit title='Edit' className='action_edit' size="1.4rem" color='green'
                                                            onClick={() => {
                                                                handleClickEdit21(item.id, item.sectorName, "Update_CompanySector", "Edit Company Sector")
                                                            }}></FaEdit>
                                                        <MdDeleteForever title='Delete' className='action_edit' size="1.6rem" color='red' onClick={() => {handleClickDelete(item.id, "Company_Sector")}}></MdDeleteForever>
                                                    </p>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div> 
                {/* ****** Business Type and Business Sector********** */}

                <div className='outer_setting'>
                    <div className='setting_header'>Business Type</div>
                    <PopUp title="Add_business_type" />
                    <div>
                        {Loading
                            ? <p className='loading'><SyncLoader
                                color={color}
                                Left={margin}
                                loading={Loading}
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /></p>
                            :
                            <div className="outer_vehicle_table7" id='myTable'>
                                <table class="vehicle_table7" id="myTable">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Business Type</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {BusinessType && BusinessType.map(item => {
                                            return <tr className='active_row'>
                                                <td>{item.id}</td>
                                                <td>{item.businessType}</td>
                                                <td>
                                                    <p className='notification_actions'>
                                                        <FaEdit title='Edit' className='action_edit' size="1.4rem" color='green'
                                                            onClick={() => {
                                                                handleClickEdit21(item.id, item.businessType, "Update_Business_Type", "Edit Business Type")
                                                            }}></FaEdit>
                                                        <MdDeleteForever title='Delete' className='action_edit' size="1.6rem" color='red' onClick={() => {handleClickDelete(item.id, "Company_Type")}}></MdDeleteForever>
                                                    </p>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>

                <div className='outer_setting'>
                    <div title='Business Sector' className='setting_header'>Business Sector</div>
                    <PopUp title="Add_business_sector" />
                    <div>
                        {Loading
                            ? <p className='loading'><SyncLoader
                                color={color}
                                Left={margin}
                                loading={Loading}
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /></p>
                            :
                            <div className="outer_vehicle_table7" id='myTable'>
                                <table class="vehicle_table7" id="myTable">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Business Sector</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {BusinessSector && BusinessSector.map(item => {
                                            return <tr className='active_row'>
                                                <td title='Company Id'>{item.id}</td>
                                                <td title='Sector Name'>{item.businessSector}</td>
                                                <td>
                                                    <p className='notification_actions'>
                                                        <FaEdit title='Edit' className='action_edit' size="1.4rem" color='green'
                                                            onClick={() => {
                                                                handleClickEdit21(item.id, item.businessSector, "Update_Business_Sector", "Edit Business Sector")
                                                            }}></FaEdit>
                                                        <MdDeleteForever title='Delete' className='action_edit' size="1.6rem" color='red' onClick={() => {handleClickDelete(item.id, "Company_Sector")}}></MdDeleteForever>
                                                    </p>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div> 
                {/* cagro type*/}

                <div className='outer_setting'>
                    <div title='cargo type' className='setting_header'>Cargo type</div>
                    <AddItem title="Add_Cargo_Type" post='driverState' 
                    url= "http://64.226.104.50:9090/Api/Admin/CreateCargoType"
                        />
                    <div>
                        {Loading
                            ? <p className='loading'><SyncLoader
                                color={color}
                                Left={margin}
                                loading={Loading}
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /></p>
                            :
                            <div className="outer_vehicle_table7" id='myTable'>
                                <table class="vehicle_table7" id="myTable">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Cargo type</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cargo && cargo.map(item => {
                                            return <tr className='active_row'>
                                                <td >{item.id}</td>
                                                <td >{item.cargoType}</td>
                                                <td>
                                                    <p className='notification_actions'>
                                                        <FaEdit title='Edit' className='action_edit' size="1.4rem" color='green'
                                                            onClick={() => {
                                                                handleClickEdit21(item.id, item.cargoType, "Update_CargoType", "Edit Cargo Type")
                                                            }}></FaEdit>
                                                        <MdDeleteForever title='Delete' className='action_edit' size="1.6rem" color='red' 
                                                        onClick={() => {handleClickDelete(`http://64.226.104.50:9090/Api/Admin/CargoType/${item.id}`, item.cargoType)}}>
                                                        </MdDeleteForever>
                                                    </p>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div> 
                {/* /*********Avatar*******************/}
                
                <div className='outer_setting'>
                <div title='Avatar Logo' className='setting_header'>Avatar Logo</div>
                <PopUp title="Avatar" />
                    
                    <div>
                        {Loading
                            ? <p className='loading'><SyncLoader
                                color={color}
                                Left={margin}
                                loading={Loading}
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /></p>
                            :
                            <div className="outer_vehicle_table7" id='myTable'>
                                <table class="vehicle_table7" id="myTable">
                                    <thead>
                                        <tr>
                                            <th>Avatar</th>
                                            <th>Logo</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {avatar &&
                                             <tr className='active_row'>
                                                <td>{avatar.avatar}</td>
                                                <td>{avatar.logo}</td>
                                                <td>
                                                    <p className='notification_actions'>
                                                        <FaEdit title='Edit' className='action_edit' size="1.4rem" color='green'
                                                            onClick={() => {
                                                                isAvatar = true;
                                                                 handleClickEdit21(avatar.avatar, avatar.logo, "Update_Avatar", "Edit Avatar and logo ")
                                                             }}>

                                                            </FaEdit>
                                                    </p>
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>
                {/* /********Driver state */}
                <div className='outer_setting'>
                    <div title='Driver state' className='setting_header'>Driver state</div>
                    <AddItem title="driver State"
                          url="http://64.226.104.50:9090/Api/Admin/CreateDriverState" />
                    <div>
                        {Loading
                            ? <p className='loading'><SyncLoader
                                color={color}
                                Left={margin}
                                loading={Loading}
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /></p>
                            :
                            <div className="outer_vehicle_table7" id='myTable'>
                                <table class="vehicle_table7" id="myTable">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Driver state</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {DriverState && DriverState.map(item => {
                                            return <tr className='active_row'>
                                                <td >{item.id}</td>
                                                <td >{item.driverState}</td>
                                                <td>
                                                    <p className='notification_actions'>
                                                        <FaEdit title='Edit' className='action_edit' size="1.4rem" color='green'
                                                            onClick={() => {
                                                                handleClickEdit21(item.id, item.driverState, "Update_CargoType", "Edit Cargo Type")
                                                            }}></FaEdit>
                                                        
                                                    </p>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div> 

                <div>
                    {/* {popup ?
                        <div>{editSetting()}</div> : ""} */}
                </div>
            </div>
        </div>
    )
}