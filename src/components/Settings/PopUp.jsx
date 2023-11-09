import React, { useState,useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import swal from "sweetalert";
import {addSetting} from './AddSettings'
import { mainAPI } from "../../components/mainAPI";

export default function PopUp(props) {


    
    const [popup, setPop] = useState(false);
    const [logo,setLogo]=useState('')
    const [avatar, setAvatar]=useState('')
    const handleClickopen = () => {
        setPop(!popup);
    }

    const closePopup = () => {
        setPop(false);
    }
    const title = props.title

    const jwt = JSON.parse(localStorage.getItem('jwt'));// Getting the token from login api

    const { register, handleSubmit, watch, formState: { errors },
    } = useForm();
    async function SubmitLogoAvatar() {
        console.log('logp')
        const formData = new FormData();
    
        // Append the first image to the FormData object if it exists
        if (logo) {
            formData.append("logo", logo);
        }
    
        // Append the second image to the FormData object if it exists
        if (avatar) {
            formData.append("avatar", avatar);
        }
    
        const options = {
            method: "POST",
            headers: {
                // Use "multipart/form-data" for file uploads
                // Remove the "Content-Type" header since it's set automatically
                "Accept": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            body: formData, // Send the FormData object as the request body
        };
    
        try {
            const response = await fetch(`${mainAPI}/Api/Admin/AddLogoAvatar`, options);
            const result = await response.json();
            console.log(result);
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            console.log(mess);
            if (response.ok) {
                swal("Successful",  `${mess}`, "success", {
                    buttons: false,
                    timer: 2000,
                });
                // setPop(false);
            } else {
                console.log("failed");
                swal(`Failed To Register ${mess}`, "Error", "error");
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    const onSubmit = () => {
        console.log(title,'hii');
        if (title === 'name') {
            // Create_Role();
            addSetting(title,value,`${mainAPI}/Api/Admin/CreateRole`,jwt)

        }
        if (title === 'driverStatus') {
            // Create_Driver_Status();
            addSetting(title,value,`${mainAPI}/Api/Admin/CreateDriverStatus`,jwt)

        }
        if (title === 'driverState') {
            // Create_Driver_Status();
            addSetting(title,value,`${mainAPI}/Api/Admin/CreateDriverState`,jwt)

        }
        if (title === 'alertType') {
            // Create_Alert_Type();
            addSetting(title,value,`${mainAPI}/Api/Admin/CreateAlertType`,jwt)

        }
        if (title === 'triptypes') {
            // Create_Trip_Type();
            addSetting(title,value,`${mainAPI}/Api/Admin/CreateTripType`,jwt)

        }
        if (title === 'medium') {
            // Add_Notification();
            addSetting(title,value,`${mainAPI}/Api/Admin/CreateNotificationMedium`,jwt)

        }
        if (title === 'conditionName') {
            // Add_Vehicle_Condition();
            addSetting(title,value,`${mainAPI}/Api/Admin/CreateVehicleCondition`,jwt)
        }
        if (title === 'catagory') { 
            // Add_vehicle_category();
            addSetting(title,value,`${mainAPI}/Api/Admin/CreateVehicleCatagory`,jwt)

        }
        if (title === 'sectorName') {
            // Add_company_sector();
            addSetting(title,value,`${mainAPI}/Api/Admin/CreateCompanySector`,jwt)

        }
        if (title === 'businessType') {
            // Add_company_sector();
            addSetting(title,value,`${mainAPI}/Api/Admin/CreateBusinessType`,jwt)

        }
        if (title === 'businessSector') {
            // Add_company_sector();
            addSetting(title,value,`${mainAPI}/Api/Admin/CreateBusinessSector`,jwt)

        }
        if (title === 'companyType') {
            // Add_company_type();
            addSetting(title,value,`${mainAPI}/Api/Admin/CreateCompanyType`,jwt)

        }
        if (title === 'service') {
            // Add_Service_Needed();
            addSetting(title,value,`${mainAPI}/Api/Admin/CreateServiceNeeded`,jwt)

        }
        if (title === 'cargoType') {
            // Add_Service_Needed();
            addSetting(title,value,`${mainAPI}/Api/Admin/CreateCargoType`,jwt)

        }

    };
    
    // const [notifications, setNotification] = useState("");
    const [value,setvalue]= useState('')
    function output(){
   if( popup && title !== 'LogoAvatar')
                   { return <div>
                        <div className='popup0'> 
                            <div className='popup-innerq'>
                                <div onClick={closePopup} className='popupclose'>
                                <h3 className='popupTitle'>Create {title}</h3> <span>X</span>

                                </div>
                                         
                                   
                                    <form className='popupform'  onSubmit={handleSubmit(onSubmit)}>
                                    <input  type='text' defaultValue={value} placeholder={title}  onChange={(e) => setvalue(e.target.value)}></input>
                                    <div className='send_button'>
                                        <button className='popup_add'>Add</button>
                                        <button onClick={closePopup} className='popup_cancle'>Cancle</button>
                                    </div>
                                    </form>

                              

                            </div>
                        </div>
                    </div>} 
     else if(popup && title === 'LogoAvatar')
                    { 
                    return <div>
                        <div className='popup0'> 
                            <div className='popup-innerq'>
                                <div onClick={closePopup} className='popupclose'>
                                <h2 className='popupTitle'>Create {title}</h2> <span>X</span>
                                </div>
                                    <form className='popupform'  onSubmit={handleSubmit(SubmitLogoAvatar)}>
                                    <input  type='file' defaultValue={logo} placeholder='Logo' onChange={(e) => setLogo(e.target.files[0])}></input>
                                    <input   type='file' defaultValue={avatar} placeholder='Avatar'  onChange={(e) => setAvatar(e.target.files[0])}></input>
                                    <div className='send_button'>
                                        <button className='popup_add'>Add</button>
                                        <button onClick={closePopup} className='popup_cancle'>Cancle</button>
                                    </div>
                                    </form>

                              

                            </div>
                        </div>
                    </div>
                    }
                }
    return ( 

        <>
            <div>
                <div className='Addtitle' onClick={handleClickopen}>Add {title}</div>
            </div>
                
            <div>
                {output()}
            </div>
        </>

    )
}
