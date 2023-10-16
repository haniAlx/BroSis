import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import swal from "sweetalert";
import {addSetting} from './AddSettings'
import { FaEdit } from "react-icons/fa";

export default function PopUp(props) {

    const [popup, setPop] = useState(false);

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
    const onSubmit = (data) => {
        console.log(title,'hii');
        if (title === 'Role') {
            // Create_Role();
            addSetting(title,value,'http://164.90.174.113:9090/Api/Admin/CreateRole',jwt)

        }
        if (title === 'DriverStatus') {
            // Create_Driver_Status();
            addSetting(title,value,'http://164.90.174.113:9090/Api/Admin/CreateDriverStatus',jwt)

        }
        if (title === 'AlertType') {
            // Create_Alert_Type();
            addSetting(title,value,'http://164.90.174.113:9090/Api/Admin/CreateAlertType',jwt)

        }
        if (title === 'TripType') {
            // Create_Trip_Type();
            addSetting(title,value,'http://164.90.174.113:9090/Api/Admin/CreateTripType',jwt)

        }
        if (title === 'Notification') {
            // Add_Notification();
            addSetting(title,value,'http://164.90.174.113:9090/Api/Admin/CreateNotificationMedium',jwt)

        }
        if (title === 'VehicleCondition') {
            // Add_Vehicle_Condition();
            addSetting(title,value,'http://164.90.174.113:9090/Api/Admin/CreateVehicleCondition',jwt)
        }
        if (title === 'VehicleCatagory') { 
            // Add_vehicle_category();
            addSetting(title,value,'http://164.90.174.113:9090/Api/Admin/CreateVehicleCatagory',jwt)

        }
        if (title === 'CompanySector') {
            // Add_company_sector();
            addSetting(title,value,'http://164.90.174.113:9090/Api/Admin/CreateCompanySector',jwt)

        }
        if (title === 'CompanyType') {
            // Add_company_type();
            addSetting(title,value,'http://164.90.174.113:9090/Api/Admin/CreateCompanyType',jwt)

        }
        if (title === 'service') {
            // Add_Service_Needed();
            addSetting(title,value,'http://164.90.174.113:9090/Api/Admin/CreateServiceNeeded',jwt)

        }

    };
    
    // const [notifications, setNotification] = useState("");
    const [value,setvalue]= useState('')
    
    return ( 

        <>
            <div>
                <div className='add_notification' onClick={handleClickopen}>Add {title}</div>
            </div>
                
            <div>
                {popup?
                    <div>
                        <div className='popup0'> 
                            <div className='popup-innerq'>
                                <div onClick={closePopup} className='close'>X</div>
                                <div className='fgf'>
                                    <h2 className='mnm'>{title}</h2>
                                    <form className='form'  onSubmit={handleSubmit(onSubmit)}>
                                    <input   defaultValue={value} placeholder={title}  onChange={(e) => setvalue(e.target.value)}></input>
                                    <div className='send_button'>
                                        <button className='popup_add'>Add</button>
                                        <button onClick={closePopup} className='popup_cancle'>Cancle</button>
                                    </div>
                                    </form>

                                </div>

                            </div>
                        </div>
                    </div> :''
                     }
            </div>
        </>

    )
}
