import React from 'react'
import styles from './driver_detail.module.css';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function (props) {


    console.log(props.id);
    let [active, setActive] = useState("total_vehicle");
    let [state, setState] = useState("false");
    const [popup, setPop] = useState(false);
    const handleClickopen = () => {
        setPop(!popup);
    }

    const jwt = JSON.parse(localStorage.getItem('jwt'));// Getting the token from login api

    const options = {

        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
    };

    const [popup1, setPop1] = useState(true); 
    const handleClickopen1 = () => {
        setPop1(!popup1);
    }

    const [dataSource, setDataSource] = useState([])
    const url = `http://64.226.104.50:9090/Api/Admin/All/Drivers/${props.id}`;
    useEffect(() => {
        fetch(url, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource(data)
            })
    }, [])

    const closePopup5 = () => {
        setPop1(false);
    }

    return (

        // <form>
        <>
       
            {popup1 ?
                <div>
                    <div className={styles.popup}>
                        <div className='animate__animated animate__slideInDown'>
                            <div className={styles.popupInner}>

                                <div className={styles.allForms1}>

                                    <button className={styles.closeBtn} onClick={() => props.changeName("false")}>X</button>
                                    <lable className={styles.addHeader}>Driver Detail</lable>

                                    <div className={styles.formDiv1}>

                                        <div className={styles.input}>
                                            <lable>First Name</lable>
                                            <input name='driverName' type="text"
                                                value={dataSource.driverName}
                                            ></input>
                                        </div>

                                        <div className={styles.input}>
                                            <lable>Gender</lable>
                                            <input value={dataSource.gender}></input>
                                        </div>

                                        <div className={styles.input}>
                                            <lable>License Number</lable>
                                            <input name='licenseNumber' type="text"
                                                value={dataSource.licenseNumber}
                                            ></input>
                                        </div>

                                        <div className={styles.input}>
                                            <lable>Driver Licence Picture</lable>
                                            <a href={dataSource.licensePic} target="_blank" rel="noopener noreferrer">
                                            <img src={dataSource.licensePic} 
                                            alt={`${dataSource.driverName}`} 
                                             />
                                             </a>
                                        </div>

                                        <div className={styles.input}>
                                            <lable>Driver Picture</lable>
                                            <a href={dataSource.driverPic} target="_blank" rel="noopener noreferrer">
                                            <img src={dataSource.driverPic} 
                                            alt={`${dataSource.driverName}`} 
                                             />
                                             </a>
                                        </div>

                                        <div className={styles.input}>
                                            <lable>Date Of Birth</lable>
                                            <input name='birtDate' type="Date"
                                                value={dataSource.birthDate}
                                            ></input>
                                        </div>


                                        <div className={styles.input}>
                                            <lable>Phone Number</lable>
                                            <input name='phoneNumber' type="text"
                                                value={dataSource.phoneNumber}
                                            ></input>
                                        </div>

                                        <div className={styles.input}>
                                            <lable>Exeperiance</lable>
                                            <input name='Exeperiance' type="text"
                                                value={dataSource.experience}
                                            ></input>
                                        </div>

                                        <div className={styles.input}>
                                            <lable>License Grade</lable>
                                            <input name='License Grade' type="text"
                                                value={dataSource.licenseGrade}
                                            ></input>
                                        </div>

                                        <div className={styles.input}>
                                            <lable>Issue Date</lable>
                                            <input name='Issue Date' type="date"
                                                value={dataSource.licenseIssueDate}
                                            ></input>
                                        </div>

                                        <div className={styles.input}>
                                            <lable>Expire Date</lable>
                                            <input name='Expire Date' type="date"
                                                value={dataSource.licenseExpireDate}
                                            ></input>
                                        </div>

                                        <div className={styles.input}>
                                            <lable>Status</lable>
                                            <input name='Expire Date' type="text"
                                                value={dataSource.status}
                                            ></input>
                                        </div>

                                        <div className={styles.input}>
                                            <lable>Vehicle Owner</lable>
                                            <input name='Expire Date' type="text"
                                                value={dataSource.vehicleOwner}
                                            ></input>

                                        </div>
 
                                    </div>
                                    {/* <div className={styles.addButton}>
                                    <button>Submit </button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : ""}  

                 </>      
                // </form>







    )
}
