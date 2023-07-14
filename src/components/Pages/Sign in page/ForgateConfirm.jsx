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
    const [phoneNumber, setPhoneNumber] = useState('');
    const [yourPin, setyourPin]= useState('')
    const [password, setPassword] =useState('')
    const [Confirmpassword, setConfirmPassword]= useState('')
    useEffect(() => {
    }, []);
    function onSubmit(e)
    {
        e.preventDefault()
        handleForgate()
    }
    async function handleForgate() {
        let item =
        {
            phoneNumber,
        };
        console.log(item)
        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 
            "Accept": "application/json"},
            body: JSON.stringify(item),
        };
        const url = "http://64.226.104.50:9090/Api/User/GeneratePIN";
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
             mess = localStorage.getItem("message");
            if (response.ok) {
                console.log(mess)
                setisConfirm(!isConfirm)
                swal("Get your Pin beffore it's to late ", `${mess}`, "success", { buttons: false, timer: 5000, });
                
            } else {
                console.log("failed");
                swal(`Failed To Register ${mess}`, "error");
            }
        } catch (error) {
            console.error(error);
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
                                <p className={styles.loginHeader}>Reset Password</p>
                                <label>Phone</label>
                                <input type="phone" placeholder="Phone" 
                                        value = {phoneNumber} onChange={e => {
                                                        setPhoneNumber(e.target.value)
                                                        }}
                                        name="phoneNumber"></input>
                                {error && phoneNumber.length <= 10 ? <span className={styles.validateText}>please enter your phone</span> : ""}
                            {isConfirm && <Link to='/Confirm'><p type='button' >Confirm Password</p> </Link>
}                                <button >Submit</button>
                            </div>
                    </form>
                </div>
            </div>
        </>

    )
}


