import React, { Component } from 'react'
import { useForm } from 'react-hook-form';
import { Routes, Route, Link, Navigate, Router } from "react-router-dom";
import styles from './ForgateConfirm.module.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Swal from 'sweetalert2'
import 'animate.css';

export default function () {

    
    const [error, setError] = useState(false);
    let [isConfirm,setisConfirm] = useState(false)
    let [isConfirmed, setisConfirmed] =useState(false)
    let mess
     let isPin =false
     if(isPin){
        mess = localStorage.getItem("message")
        console.log(mess)

     }
    const [username, setusername] = useState("");
    const [pin, setpin]= useState("")
    const [newpassword, setnewpassword] =useState("")
    const [confirmPassword, setconfirmpassword]= useState("")
    
    useEffect(() => {
    }, []);
    function onSubmit(e)
    {
        e.preventDefault()
        handleConfirm()
    }
    
   /******************************Confirm *********/

   async function handleConfirm() {

   let item = { 
               newpassword,
              confirmPassword,
              username,
              pin
            }
                console.log(item)
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer`, },
        body: JSON.stringify(item),
    };
    const url = "http://64.226.104.50:9090/Api/User/SetPin";
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        localStorage.setItem("message", JSON.stringify(result["message"]));
      const  mess = localStorage.getItem("message");
      console.log(mess)
        if (response.ok) {
            console.log(mess)
            swal("Successful",`${mess}`, "success", { buttons: false, timer: 2000, })
              setTimeout(()=>{setisConfirmed(!isConfirmed)}, 1000)
        } else {
            Swal.fire({
                title: "Failed To Change?",
                text: `${mess} `,
                icon: 'error',
                dangerMode: true,
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonColor: '#d33',
                showClass: {
                    popup: 'animate__animated animate__shakeX'
                },
            })
        }
    } catch (error) {
        console.log(error + "error");
        Swal.fire({
            title: "Something Went Wrong?",
            text: `net::ERR_INTERNET_DISCONNECTED `,
            icon: "warning",
            dangerMode: true, 
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonColor: '#d33',
            showClass: {
                popup: 'animate__animated animate__shakeX'
            },
        })
        // window.location.href = "/dashboard"; 
    }
}
return ( 
        <> 

            {/*-------------- Login page Form ---------------*/} 

            <div className={styles.signin}>

                {/*-------------- Left side ---------------*/}

                <div className={styles.left_login}></div>


                {/*-------------- Right side ---------------*/}
                <div className={styles.right_login}>
                    <form className={styles.signup_right} onSubmit={onSubmit}>
                            <div className={styles.signForm}>
                            <p className={styles.loginHeader}>Confirm Your Password</p>
                            <label>User Name</label>
                                <input type="text" placeholder="Username" onChange={e => setusername(e.target.value)} name="username"></input>
                                {error && username.length <= 0 ? <span className={styles.validateText}>please enter your username</span> : ""}

                                <label>Your Pin</label>
                                <input type="tex" placeholder="Your Pin" onChange={e => setpin(e.target.value)} name="pin"></input>
                                {error && pin.length <= 0 ? <span className={styles.validateText}>please enter your pin</span> : ""}

                                <label>New Password</label>
                                <input type="password" placeholder="Password" onChange={e => setnewpassword(e.target.value)} name="newpassword"></input>
                                {error && newpassword.length <= 0 ? <span className={styles.validateText}>please enter your password</span> : ""}

                                <label>Confirm Password</label>
                                <input type="password" placeholder="Confirm Password" onChange={e => setconfirmpassword(e.target.value)} name='confirmpassword'></input>
                                {error && confirmPassword !== newpassword ? <span className={styles.validateText}>Your password is not identical</span> : ""}
                                <button>Confirm</button>
                                {isConfirmed && <Link to='/'><p type='button' >Sign in page</p> </Link>}

                        </div> 
                           
                    </form>
                </div>
            </div>
        </>

    )
}


