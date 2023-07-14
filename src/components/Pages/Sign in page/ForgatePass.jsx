import React, { Component } from 'react'
import { useForm } from 'react-hook-form';
import { Routes, Route, Link, Navigate, Router } from "react-router-dom";
import styles from './ForgatePass.module';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Swal from 'sweetalert2'
import 'animate.css';

export default function () {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [data, setdata] = useState("");
    const [error, setError] = useState(false);
    

    const validation = (e) => {
        e.preventDefault();

        if (username.length == 0 || password.length == 0) {
            setError(true);
        }
        if (username && password) {
            login();
        }
    }
  
    useEffect(() => {
    }, []);

    async function login() {

        const users = { username, password };
        localStorage.setItem("username", username)
        console.log(username)
        let item = { username, password };
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer`, },
            body: JSON.stringify(item),
        };
        const url = "http://64.226.104.50:9090/Api/SignIn/Admin";
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("user", JSON.stringify(result["user"]));
            const user = localStorage.getItem("user");
            localStorage.setItem("user", JSON.stringify(users));

            if (response.ok) {
                console.log("Login successful");
                const zz = localStorage.getItem("tuser");
                setdata(zz);
                swal("Successful", "Welcome To Admin DashBoard", "success", { buttons: false, timer: 2000, })
                    .then((value) => {
                        localStorage.setItem("user", JSON.stringify(result["user"]));
                        localStorage.getItem("user");
                        localStorage.setItem("jwt", JSON.stringify(result["jwt"]));
                        localStorage.getItem("jwt");
                        window.location.href = "/dashboard";
                    })
            } else {
                Swal.fire({
                    title: "Failed To Login?",
                    text: `Wrong Password or Username! `,
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
                    <form className={styles.signup_right} onSubmit={forgate ? handleForgate : validation}>
                       <div className={styles.Forgate}>
                            <p className={styles.loginHeader}>Welcome To Bazra</p>
                            <label>User Name</label>
                            <input type="username" placeholder="Username" onChange={e => setUsername(e.target.value)} name="username"></input>
                            {error && username.length <= 0 ? <span className={styles.validateText}>please enter your username</span> : ""}
                            <label>Password</label>
                            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} name="password"></input>
                            {error && password.length <= 0 ? <span className={styles.validateText}>please enter your password</span> : ""}
                            <Link path='/ForgatePass'><p type='button' >Forget Password?</p> </Link>
                            <button className=''>Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}


