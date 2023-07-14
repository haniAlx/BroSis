import React from 'react'
import { FaUserAlt } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { FaCarCrash } from "react-icons/fa";
import { TbTriangleOff } from "react-icons/tb";
import { FaUserSecret } from "react-icons/fa";
import styles from './alert.module.css';
import { Link, NavLink } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { useState, useEffect } from 'react';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Header from '../../Header/Header';
import Navigation from '../Navigation/Navigation';
import { Pagination } from 'antd';
import SyncLoader from "react-spinners/SyncLoader";

export default function () {

    const [popup, setPop] = useState(false);
    const handleClickopen = () => {
        setPop(!popup);
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const [logout, setLogout] = useState(false);
    const handleLogout = () => {
        setLogout(!logout);
    }
    useEffect(() => {
        if (!localStorage.getItem("jwt")) {
            window.location.href = "/";
        }
    }, [])

    function tableSearch() {

        let input, filter, table, tr, td, txtValue, errors;

        //Intialising Variables
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");

        for (let i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[2];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    const jwt = JSON.parse(localStorage.getItem('jwt'));// Getting the token from login api
    const options = {
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
    };

    const [Loading, setLoading] = useState([])
    const [totalPages, setTotalPage] = useState(1);

    const [dataSource, setDataSource] = useState([])
    const url = "http://64.226.104.50:9090/Api/Admin/AlertsHistory/ACCIDENT";
    useEffect(() => {
        setLoading(true)
        fetch(url, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource(data.alerts)
                setLoading(false)
            })
    }, [])

    const [dataSource2, setDataSource2] = useState([])
    const url2 = "http://64.226.104.50:9090/Api/Admin/AlertsHistory/OFFROAD";
    useEffect(() => {
        setLoading(true)
        fetch(url2, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource2(data.alerts)
                setTotalPage(data.alerts.length)
                setLoading(false)
            })
    }, [])

    const [dataSource3, setDataSource3] = useState([])
    const url3 = "http://64.226.104.50:9090/Api/Admin/AlertsHistory/DRIVER";
    useEffect(() => {
        setLoading(true)
        fetch(url3, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource3(data.alerts)
                // setTotalPage(data.alerts.length)
                setLoading(false)
            })
    }, [])

    const onShowSizeChange = (current, pageSize) => {
        setpostPerPage(pageSize);
    }
    const [page, setCurentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(5);
    const indexOfLastPage = page * postPerPage;
    const indexOfFirstPage = indexOfLastPage - postPerPage;
    const currentPage = dataSource2.slice(indexOfFirstPage, indexOfLastPage);

    const [color, setColor] = useState("green");

    return (

        <div className="alert_container">

            {/*---------------navigation---------------*/}

            <Navigation path="/accident" title="Alerts"></Navigation>

            {/* --------------- Alert --------------- */}

            <div className={styles.main_content}>

                <div className={styles.headers}>
                    <p ><Link style={{ textDecoration: 'none' }} to="/accident"><h1 >Current Alerts</h1></Link></p>
                    <p><Link style={{ textDecoration: 'none' }} to="/AccidentHistory"><h1 className={styles.sd}>Alert History</h1></Link></p>
                </div>

                <div className={styles.allDivalert}>

                    <div className={styles.allcards}>
                        <div className={styles.alerts}>
                            <Link style={{ textDecoration: 'none' }} to="/AccidentHistory">
                                <div className={styles.innerContents}>
                                    <h4>Accident</h4>
                                    <div>
                                        <p>< FaCarCrash size="2.2rem" ></ FaCarCrash><b>{dataSource.length}</b></p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className={styles.activeCard}>
                            <Link style={{ textDecoration: 'none' }} to="/OffRoadHistory">
                                <div className={styles.innerContents1}>
                                    <h4>Off Road</h4>
                                    <div>
                                        <p><TbTriangleOff size="2.2rem" ></TbTriangleOff><b>{dataSource2.length}</b></p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className={styles.alerts}>
                            <Link style={{ textDecoration: 'none' }} to="/DriverHistory">
                                <div className={styles.innerContents}>
                                    <h4>Driver</h4>
                                    <div>
                                        <p><FaUserSecret size="2rem"></FaUserSecret><b>{dataSource3.length}</b></p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* --------------------- Alert Tables ------------------- */}

                    {Loading ?
                        <p className={styles.loading} >
                            <SyncLoader
                                color={color}
                                // Left={margin}
                                loading={Loading}
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /></p>
                        :

                        <>
                            <div className={styles.outer_vehicle_table} id='myTable'>

                                <div className={styles.vehicle_search}>
                                    <p title='search'>
                                        <BsSearch className={styles.icn} size="1.5rem" color='rgb(63, 63, 63)'></BsSearch>
                                        <input type="text" id="myInput" onKeyUp={tableSearch} placeholder="Search"></input>
                                        <button>Search</button>
                                    </p>
                                </div>

                                <p>Off-Road Alerts History</p>

                                <table className={styles.vehicle_table} id="myTable">

                                    <thead>
                                        <tr>
                                            <th>Profile</th>
                                            <th>Driver</th>
                                            <th>Plate Number</th>
                                            <th>Alert Location</th>
                                            <th>Alert Type</th>
                                            <th>Owner</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {currentPage.map(item => (
                                            <tr className={styles.active_row}>

                                                <td><FaUserAlt className='next' size="1.5rem" color='rgb(63, 63, 63)'></FaUserAlt></td>
                                                <td>{item.driver}</td>
                                                <td>{item.plateNumber}</td>
                                                <td>{item.alertocation}</td>
                                                <td>{item.alertType}</td>
                                                <td>{item.owner}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className={styles.page}>
                                <Pagination
                                    onChange={(page) => setCurentPage(page)}
                                    pageSize={postPerPage}
                                    current={page}
                                    total={totalPages}
                                    showQuickJumper
                                    showSizeChanger
                                    onShowSizeChange={onShowSizeChange}
                                />
                            </div>
                        </>

                    }


                </div>
            </div>
        </div >
    )
}
