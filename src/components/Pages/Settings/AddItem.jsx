import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import swal from "sweetalert";
import axios from 'axios';
import Swal from 'sweetalert2'

export default function AddItem(props) {
    
    const {title, url, post} = props

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

        if (title === 'Avatar') {
            
            Add_Avatar(inputData, logo);
        }else {
          
            Add_Item(inputData);
        }

    };


    const [notifications, setNotifications] = useState("");


    //Add Driver state
    async function Add_Item(post) {
        let items ={
           post
        }
        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}` },
            body: JSON.stringify(items),
        };
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