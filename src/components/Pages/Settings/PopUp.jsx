import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import swal from "sweetalert";
import axios from 'axios';
import Swal from 'sweetalert2'

export default function PopUp(props) {
    
    const {title, stateurl} = props

let isAvatar = false;
    if (title == 'Avatar')
    {
        isAvatar = true
    }
    const nandu2 = () => {

        Swal.fire({
            title: title,
            html: isAvatar ?`<input type="file" id="avatar"   class="swallpop" placeholder=${title}>
            <input type="file" id="logo" class="swallpop" placeholder="Logo">` :
            `<input type="text" id="login"  class="swallpop" placeholder=${title}>`,
            confirmButtonText: 'Add',
            confirmButtonColor: '#00cc44',
            // focusConfirm: false,
            showCloseButton: true,
            width: "580px",
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
                else {
                const login = Swal.getPopup().querySelector('#login').value
                if (!login) {
                    Swal.showValidationMessage(`Please enter data`)
                }
                return { login: login }}
            }
        }).then((result) => {
            setPopupAdd(false);
            if (result.isConfirmed) {
                if (isAvatar)
                {
                    const { avatar, logo } = result.value;
                    console.log(avatar, logo)
                    onSubmit(avatar, logo)
                }
                else {
                    onSubmit(result.value.login);
                  }
            }
            else{
                setPopupAdd(false);
            }
        })
    }

    const [popupadd, setPopupAdd] = useState(false);

    const handleClickopen = () => {
        setPopupAdd(!popupadd);
    }


    const jwt = JSON.parse(localStorage.getItem('jwt'));// Getting the token from login api

    const { register, handleSubmit, watch, formState: { errors },
    } = useForm();

    // const dddd =() => { 
    //     onSubmit()
    // }
    const [notification, setNotification] = useState("");
    // console.log(notification)

    const onSubmit = (inputData, logo) => {

        if (title === 'Create_Role') {
            Create_Role(inputData);
        }
        if (title === 'Create_Driver_Status') {
            Create_Driver_Status(inputData);
        }
        if (title === 'Create_Alert_Type') {
            Create_Alert_Type(inputData);
        }
        if (title === 'Create_Trip_Type') {
            Create_Trip_Type(inputData);
        }
        if (title === 'Add_Notification') {
            Add_Notification(inputData);
        }
        if (title === 'Add_Vehicle_Condition') {
            Add_Vehicle_Condition(inputData);
        }
        if (title === 'Add_vehicle_category') {
            Add_vehicle_category(inputData);
        }
        if (title === 'Add_company_sector') {
            Add_company_sector(inputData);
        }
        if (title === 'Add_company_type') {
            Add_company_type(inputData);
        }
        if (title === 'Add_Service_Needed') {
            Add_Service_Needed(inputData);
        }
        // cargo owner
        if (title === 'Add_Cargo_Type') {
            Add_Cargo_Type(inputData);
        }
        //// Avatar && Logo
        if (title === 'Avatar') {
            
            Add_Avatar(inputData, logo);
        }
        /// Add_business_type"
        if (title === 'Add_business_type') {
           
            Add_business_type(inputData);
        }
        // Add_business_sector
        if (title === 'Add_business_sector') {
            
            Add_business_sector(inputData);
        }
         // Add_driver_state
         if (title === 'driverState') {
          
            Add_Driver_State(inputData);
        }

    };


    const [notifications, setNotifications] = useState("");


    async function Create_Role(rolename) {
        let item =
        {
            rolename,
        };
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify(item),
        };
        const url = "http://64.226.104.50:9090/Api/Admin/CreateRole";
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal(`${mess}`, "success", {
                    buttons: false, timer: 2000,
                });
                setPopupAdd(false);
            } else {
                swal(`Failed To Register ${mess}`, "error");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function Create_Driver_Status(status) {
        let item =
        {
            status,
        };
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify(item),
        };
        const url = "http://64.226.104.50:9090/Api/Admin/CreateDriverStatus";
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal("Successful", `${mess}`, "success", { buttons: false, timer: 2000, });
                setPopupAdd(false);
            } else {
                swal(`Failed To Register ${mess}`, "error");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function Create_Alert_Type(alertType) {
        let item =
        {
            alertType,
        };
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify(item),
        };
        const url = "http://64.226.104.50:9090/Api/Admin/CreateAlertType";
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal("Successful", `${mess}`, "success", { buttons: false, timer: 2000, });
                setPopupAdd(false);
            } else {
                swal(`Failed To Register ${mess}`, "error");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function Create_Trip_Type(tripType) {
        let item =
        {
            tripType,
        };
        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}` },
            body: JSON.stringify(item),
        };
        const url = "http://64.226.104.50:9090/Api/Admin/CreateTripType";
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal("Successful", `${mess}`, "success", { buttons: false, timer: 2000, });
                setPopupAdd(false);
            } else {
                console.log("failed");
                swal(`Failed To Register ${mess}`, "error");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function Add_company_sector(companysector) {
        let item =
        {
            companysector,
        };
        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}` },
            body: JSON.stringify(item),
        };
        const url = "http://64.226.104.50:9090/Api/Admin/CreateCompanySector";
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal("Successful", `${mess}`, "success", { buttons: false, timer: 2000, });
                setPopupAdd(false);
            } else {
                swal(`Failed To Register ${mess}`, "error");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function Add_Notification(notification) {
        let item =
        {
            notification,
        };
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify(item),
        };
        const url = "http://64.226.104.50:9090/Api/Admin/CreateNotificationMedium";
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal("Successful", `${mess}`, "success", { buttons: false, timer: 2000, });
                setPopupAdd(false);
            } else {
                swal(`Failed To Register ${mess}`, "error");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function Add_Vehicle_Condition(vehicleConditon) {
        let item =
        {
            vehicleConditon,
        };
        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}` },
            body: JSON.stringify(item),
        };
        const url = "http://64.226.104.50:9090/Api/Admin/CreateVehicleCondition";
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal("Successful", `${mess}`, "success", { buttons: false, timer: 2000, });
                setPopupAdd(false);
            } else {
                swal(`Failed To Register ${mess}`, "error");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function Add_vehicle_category(vehicleCatagory) {
        let item =
        {
            vehicleCatagory,
        };
        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}` },
            body: JSON.stringify(item),
        };
        const url = "http://64.226.104.50:9090/Api/Admin/CreateVehicleCatagory";
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal("Successful", `${mess}`, "success", {
                    buttons: false,
                    timer: 2000,
                });
                setPopupAdd(false);
            } else {
                swal(`Failed To Register ${mess}`, "error");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function Add_company_type(companyType) {
        let item =
        {
            companyType,
        };
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify(item),
        };
        const url1 = "http://64.226.104.50:9090/Api/Admin/CreateCompanyType";
        try {
            const response = await fetch(url1, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal("Successful", `${mess}`, "success", {
                    buttons: false,
                    timer: 2000,
                });
                setPopupAdd(false);
            } else {
                swal(`Failed To Register ${mess}`, "error");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function Add_Service_Needed(serviceNeeded) {
        let item =
        {
            serviceNeeded,
        };
        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}` },
            body: JSON.stringify(item),
        };
        const url = "http://64.226.104.50:9090/Api/Admin/CreateServiceNeeded";
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal("Successful", `${mess}`, "success", {
                    buttons: false,
                    timer: 2000,
                });
                setPopupAdd(false);
            } else {
                swal(`Failed To Register ${mess}`, "Error");
            }
        } catch (error) {
            console.error(error);
        }
    }


    // cargo type
     async function Add_Cargo_Type(cargotype) {
        let item =
        {
            cargoType: cargotype,
        };
        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}` },
            body: JSON.stringify(item),
        };
        const url = "http://64.226.104.50:9090/Api/Admin/CreateCargoType";
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal("Successful", `${mess}`, "success", {
                    buttons: false,
                    timer: 2000,
                });
                setPopupAdd(false);
            } else {
                swal(`Failed To Register ${mess}`, "error");
            }
        } catch (error) {
            console.error(error);
        }
    }
    //Add_business_type
    async function Add_business_type(businessType) {
        let item =
        {
            businessType: businessType,
        };
        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}` },
            body: JSON.stringify(item),
        };
        const url = "http://64.226.104.50:9090/Api/Admin/CreateBusinessType";
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal("Successful", `${mess}`, "success", {
                    buttons: false,
                    timer: 2000,
                });
                setPopupAdd(false);
            } else {
                swal(`Failed To Register ${mess}`, "error");
            }
        } catch (error) {
            console.error(error);
        }
    }
    // Add business sector
    async function Add_business_sector(businessSector) {
        let item =
        {
            businessSector: businessSector,
        };
        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}` },
            body: JSON.stringify(item),
        };
        const url = "http://64.226.104.50:9090/Api/Admin/CreateBusinessSector";
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal("Successful", `${mess}`, "success", {
                    buttons: false,
                    timer: 2000,
                });
                setPopupAdd(false);
            } else {
                swal(`Failed To Register ${mess}`, "error");
            }
        } catch (error) {
            console.error(error);
        }
    }
    //Add Driver state
    async function Add_Driver_State(driverState) {
        let item =
        {
            driverState: driverState,
        };
        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}` },
            body: JSON.stringify(item),
        };
        // const url = "http://64.226.104.50:9090/Api/Admin/CreateDriverState";
        try {
            const response = await fetch(stateurl, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            if (response.ok) {
                swal("Successful", `${mess}`, "success", {
                    buttons: false,
                    timer: 2000,
                });
                setPopupAdd(false);
            } else {
                swal(`Failed To Register ${mess}`, "error");
            }
        } catch (error) {
            console.error(error);
        }
    }
    // Avatar and logo

    const Add_Avatar = async (avatar, logo) => {
        if (!avatar || !logo) {
           
          swal('Error', 'Please select both images.', 'error');
          return;
        }
        console.log("Add_Avatar",avatar, logo)
        const formData = new FormData();
        formData.append("logo", logo);
        formData.append("avatar", avatar);
    
        try {
          const response = await axios.post(
            'http://64.226.104.50:9090/Api/Admin/AddLogoAvatar',
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
          swal("Successfully Registered", `${mess}`, "success", {
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
    return (

        <>
            <div>
                <div className='add_notification' onClick={handleClickopen}>{title}</div>
            </div>

            <div>
                {popupadd ?
                    <div>
                        {nandu2()}
                    </div> : ""}
            </div>
        </>

    )
}
