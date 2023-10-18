import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import swal from "sweetalert";
import {addSetting} from './AddSettings'
import { FaEdit } from "react-icons/fa";

export default function UpdatePopUp({target,id,title}) {
    const [popup, setPop] = useState(false);
    const [data, setData] = useState('');
 
    useEffect(() => {
        // Set the data state when the component mounts
  
      }, [target, id]);

    const handleClickopen = () => {
        const foundItem = target.find(item => item.id === id);
        if (foundItem) {
          setData(foundItem.value); // Assuming the value you want to display is in the 'value' property
        }
        else console.log('not working')
        setPop(!popup);
    }

    const closePopup = () => {
        setPop(false);
    }
   

    const jwt = JSON.parse(localStorage.getItem('jwt'));// Getting the token from login api

    const { register, handleSubmit, watch, formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        console.log(title,'hii');
        if (title === 'Role') {
            // Create_Role();
            addSetting(title,value,`http://164.90.174.113:9090/Api/Admin/Update/Role/${id}`,jwt)

        }
        if (title === 'DriverStatus') {
            // Create_Driver_Status();
            addSetting(title,value,'http://164.90.174.113:9090/Api/Admin/CreateDriverStatus',jwt)

        }
        if (title === 'AlertType') {
            // Create_Alert_Type();
            addSetting(title,value,`http://164.90.174.113:9090/Api/Admin/AlertType/Update/${id}`,jwt)

        }
        if (title === 'TripType') {
            // Create_Trip_Type();
            addSetting(title,value,`http://164.90.174.113:9090/Api/Admin/TripType/All/${id}`,jwt)

        }
        if (title === 'Notification') {
            // Add_Notification();
            addSetting(title,value,`http://164.90.174.113:9090/Api/Admin/NotificationMedium/Update/${id}`,jwt)

        }
        if (title === 'VehicleCondition') {
            // Add_Vehicle_Condition();
            addSetting(title,value,`http://164.90.174.113:9090/Api/Admin/VehicleCondition/Update/${id}`,jwt)
        }
        if (title === 'VehicleCatagory') { 
            // Add_vehicle_category();
            addSetting(title,value,`http://164.90.174.113:9090/Api/Admin/VehicleCatagory/Update/${id}`,jwt)

        }
        if (title === 'CompanySector') {
            // Add_company_sector();
            addSetting(title,value,`http://164.90.174.113:9090/Api/Admin/CompanySector/Update/${id}`,jwt)

        }
        if (title === 'CompanyType') {
            // Add_company_type();
            addSetting(title,value,`http://164.90.174.113:9090/Api/Admin/CompanyType/Update/${id}`,jwt)

        }
        if (title === 'service') {
            // Add_Service_Needed();
            addSetting(title,value,`http://164.90.174.113:9090/Api/Admin/Services/Update/${id}`,jwt)

        }

    };
    console.log(title,target,id,data)

    // const [notifications, setNotification] = useState("");
    const [value,setvalue]= useState('')
    
    return ( 

        <>
            <div>
                     <p className='notification_actions'>
                            <FaEdit title='Edit' className='action_edit' size="1.4rem" color='green'
                                onClick={handleClickopen}>

                            </FaEdit>
                     </p>
            </div>
                
            <div>
                {popup ?
                    <div>
                        <div className='popup0'> 
                            <div className='popup-innerq'>
                                <div onClick={closePopup} className='close'>X</div>
                                <div className='fgf'>
                                    <h2 className='mnm'>Edit {title}</h2>
                                    <form className='form'  onSubmit={handleSubmit(onSubmit)}>
                                    <input   defaultValue={data}   onChange={(e) => setData(e.target.value)}></input>
                                    <div className='send_button'>
                                        <button className='popup_add'>Update</button>
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
