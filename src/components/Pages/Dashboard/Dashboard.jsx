import React from 'react'
import { FaHome } from 'react-icons/fa';
import { AiFillCar } from "react-icons/ai";
import {BsFillBriefcaseFill} from "react-icons/bs"
import { RiGpsFill} from "react-icons/ri";
import { MdMonitor } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { HiBellAlert } from "react-icons/hi2";
import { HiDocumentReport } from "react-icons/hi";
import { FaRegIdCard } from 'react-icons/fa';
import { BiTrip } from "react-icons/bi";
import { BsFillChatDotsFill } from "react-icons/bs";
import { ImUserTie } from "react-icons/im";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './dashboard.module.css';
import Header from '../../Header/Header';
import Navigation from '../Navigation/Navigation';
import AllApiData from '../../../AllApiData';
export default function Dashboard() {

    const userlogin = localStorage.getItem("username");
    const user = JSON.parse(localStorage.getItem("user"));
    const ApiData =JSON.parse(localStorage.getItem('ApiData'))
console.log(ApiData)
useEffect(() => {
}, [ApiData != null]);
    const [popup, setPop] = useState(false);
    const handleClickopen = () => {
        setPop(!popup);
    }
    const [popup1, setPop1] = useState(false);
    const handleClickopen1 = () => {
        setPop1(!popup1);
    }

    
    return (

        <div>

        <AllApiData/>
            <Navigation path="/dashboard" title="Dashboard"></Navigation>

            {/* ---------------header--------------- */}
            {/* <Header title="Dashboard"></Header> */}
 
            {/* ---------------contents--------------- */}

            <div className={styles.main_content} onClick={handleClickopen1}>

                <div className={styles.dashboardContents}>

                    <div className={styles.totalVehicles}>
                        <Link to="/Total_number_of_vehicle" style={{ textDecoration: 'none' }} >
                            <h4>Total Vehicles </h4>
                            <div className={styles.innerCard}>
                                <AiFillCar size="2.6rem" ></AiFillCar>
                                <p>{ApiData ? ApiData.allvehicles : 0}</p>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.totalVehicles}>
                        <Link to="/Total_Drivers" style={{ textDecoration: 'none' }} >
                            <h4>Total Driver </h4>
                            <div className={styles.innerCard}>
                                <ImUserTie size="2.4rem"></ImUserTie>
                                <p>{ApiData ? ApiData.allDrivers : 0}</p>
                            </div> 
                        </Link>
                    </div>


                    <div className={styles.message}>
                        <Link to="/message_overview" style={{ textDecoration: 'none' }} >
                            <h4>Communication </h4>
                            <div className={styles.innerCard2}>
                                <BsFillChatDotsFill size="2.4rem" ></BsFillChatDotsFill>
                                <p>{ApiData ? ApiData.allMessage : 0}</p>
                                {/* <p>Message</p>  */}
                            </div>
                        </Link>
                    </div>

                    <div className={styles.users}>
                        <Link to="/users" style={{ textDecoration: 'none' }} >
                            <h4>Total Users</h4>
                            <div className={styles.innerCard3}>
                                <FaUsers size="2.5rem" color='#002e4d'></FaUsers>
                                <p>{ApiData ? ApiData.allCargoOwner : 0}</p>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.registration}>
                        <Link to="/Company_registration" style={{ textDecoration: 'none' }} >
                            <h4>Registration </h4>
                            <div className={styles.innerCard4}>
                                <FaRegIdCard size="2.5rem" color='#00802b'></FaRegIdCard>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.trip}>
                        <Link to="/avialable_trip" style={{ textDecoration: 'none' }} >
                            <h4>Trip Management </h4>
                            <div className={styles.innerCard5}>
                                <BiTrip size="2.6rem" color='#009999'></BiTrip>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.report}>
                        <Link to="/report" style={{ textDecoration: 'none' }} >
                            <h4>Report </h4>
                            <div className={styles.innerCard6}>
                                <HiDocumentReport size="2.6rem" color='#005c99'></HiDocumentReport>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.alert}>
                        <Link to="/accident" style={{ textDecoration: 'none' }} >
                            <h4>Alerts </h4>
                            <div className={styles.innerCard7}>
                                <HiBellAlert size="2.6rem" color='#F80404'></HiBellAlert>
                                <p>{ApiData ? ApiData.alertOffroad : 0}</p>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.tracking}>
                        <Link to="/tracking" style={{ textDecoration: 'none' }} >
                            <h4>Tracking </h4>
                            <div className={styles.innerCard8}>
                                <RiGpsFill size="2.6rem" color='#404040'></RiGpsFill>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.users}>
                        <Link to="/marketing" style={{ textDecoration: 'none' }} >
                            <h4>Marketing </h4>
                            <div className={styles.innerCard3}>
                                <BsFillBriefcaseFill  size="2.5rem" color='#5959b1'></BsFillBriefcaseFill >
                                <p>{ ApiData ? ApiData.allMarket : 0}</p>
                            </div>
                        </Link>
                    </div>

                </div>
            </div>

            {/* ---------------end contents--------------- */}



        </div>

    )
}
