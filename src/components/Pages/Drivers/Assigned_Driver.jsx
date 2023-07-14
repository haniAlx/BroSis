import React from 'react'
import { FaHome } from 'react-icons/fa';
import { AiFillCar } from "react-icons/ai";
import { FaRoute } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { AiFillFilter } from "react-icons/ai";
import { FaParking } from "react-icons/fa";
import { GrSettingsOption } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import styles from './total_driver.module.css';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../Header/Header';
import Navigation from '../Navigation/Navigation';
import { Pagination } from 'antd';
import SyncLoader from "react-spinners/SyncLoader";
import Driver_detail from './Driver_detail';
import { FaUserSecret } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";
import { FaUserMinus } from "react-icons/fa";


export default function () {

    function tableSearch() {

        let input, filter, table, tr, td, txtValue, errors;

        //Intialising Variables
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");

        for (let i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
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

    // let [active, setActive] = useState("total_vehicle");
    let [state, setState] = useState("false");
    // const color = () => {
    //     setState(state);
    // }
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

    const [Loading, setLoading] = useState([]);
    const url = "http://64.226.104.50:9090/Api/Admin/All/Drivers";
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        setLoading(true);
        fetch(url, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource(data.drivers)
                setLoading(false);

            })
    }, [])

    const [totalPages, setTotalPage] = useState(1);
    const url2 = "http://64.226.104.50:9090/Api/Admin/Drivers/ONROUTE";
    const [dataSource2, setDataSource2] = useState([])
    useEffect(() => {
        setLoading(true);
        fetch(url2, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource2(data.drivers);
                setLoading(false);

            })
    }, [])


    const url3 = "http://64.226.104.50:9090/Api/Admin/Drivers/ASSIGNED";
    const [dataSource3, setDataSource3] = useState([])
    useEffect(() => {
        setLoading(true);
        fetch(url3, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource3(data.drivers);
                setTotalPage(data.totalDrivers);
                setLoading(false);

            })
    }, [])

    const url4 = "http://64.226.104.50:9090/Api/Admin/Drivers/UNASSIGNED";
    const [dataSource4, setDataSource4] = useState([])
    useEffect(() => {
        setLoading(true);
        fetch(url4, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource4(data.drivers) 
                setLoading(false);
            })
    }, [])

    const url5 = "http://64.226.104.50:9090/Api/Admin/Drivers/PERMIT";
    const [dataSource5, setDataSource5] = useState([])
    useEffect(() => {
        setLoading(true);
        fetch(url5, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource5(data.drivers)
                setLoading(false);

            })
    }, [])

    const [page, setCurentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(5);

    const indexOfLastPage = page * postPerPage;
    const indexOfFirstPage = indexOfLastPage - postPerPage;
    const currentPage = dataSource3.slice(indexOfFirstPage, indexOfLastPage);

    const onShowSizeChange = (current, pageSize) => {
        setpostPerPage(pageSize);
    }

    const [color, setColor] = useState("green");
    const [margin, setMargin] = useState("");

    const [id, setId] = useState();
    console.log(id)


    const [edit, setEdit] = useState("");
    let [active, setActive] = useState(false);
    let [name, setName] = useState("false");

    function changeName(name) { 
        setName(name);
    }


    return (

        <div className="vehicle_container">

            {/*---------------navigation---------------*/}

            <Navigation path="/Total_Drivers" title="Un Assigned Drivers"></Navigation>

            {/* --------------- users --------------- */}

            <div className={styles.main_content}>
                <div className={styles.allcards}>
                    <div className={styles.vehicle}>
                        <Link to="/Total_Drivers" style={{ textDecoration: 'none' }}>
                            <div className={styles.innerContents}>
                                <h4>Total Drivers</h4>
                                <p><FaUserSecret size="2.2rem"></FaUserSecret><b>{dataSource.length}</b></p>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.vehicle}>
                        <Link to="/Driver_OnRoute" style={{ textDecoration: 'none' }}>
                            <div className={styles.innerContents}>
                                <h4>On Route</h4>
                                <p><FaRoute size="2rem" ></FaRoute><b>{dataSource2.length}</b></p>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.activeCard}>
                        <Link to="/Assigned_Driver" style={{ textDecoration: 'none' }}>
                            <div className={styles.innerContents1}>
                                <h4>Assigned</h4>
                                <p><FaUserCheck size="2rem" ></FaUserCheck><b>{dataSource3.length}</b></p>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.vehicle}>
                        <Link to="/UnAssigned_Driver" style={{ textDecoration: 'none' }}>
                            <div className={styles.innerContents}>
                                <h4>Un Assigned</h4>
                                <p><FaUserTimes size="2rem" ></FaUserTimes><b>{dataSource4.length}</b></p>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.vehicle}>
                        <Link to="/Permit" style={{ textDecoration: 'none' }}>
                            <div className={styles.innerContents}>
                                <h4>Permit</h4>
                                <p><FaUserMinus size="2rem" ></FaUserMinus><b>{dataSource5.length}</b></p>
                            </div>
                        </Link>
                    </div>

                </div>

                {/* --------------- search --------------- */}

                {Loading ?
                    <p className={styles.loading}>
                        <SyncLoader
                            color={color}
                            Left={margin}
                            loading={Loading}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        /></p>
                    :

                    <>
                        <div className={styles.outer_table} id='myTable'>

                            <div className={styles.vehicle_search}>
                                <p title='search'>
                                    <BsSearch className={styles.icn} size="1.5rem" color='rgb(63, 63, 63)'></BsSearch>
                                    <input type="text" id="myInput" onKeyUp={tableSearch} placeholder="Search"></input>
                                    <button>Search</button>
                                </p>
                            </div>

                            <p>UN ASSIGNED DRIVERS</p>

                            <table className={styles.vehicle_table} id="myTable">

                                <thead>
                                    <tr>
                                        <th>Driver Name</th>
                                        <th>License Number</th>
                                        <th>Experience</th>
                                        <th>LicenseGrade</th>
                                        <th>Status</th>
                                        <th>VehicleOwner</th>
                                        <th>Detail</th>
                                        <th>Tracking</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {currentPage.map(item => (
                                        <tr className={styles.active_row}>

                                            <td>{item.driverName}</td>
                                            <td>{item.licenseNumber}</td>
                                            <td>{item.experience}</td>
                                            <td>{item.licenseGrade}</td>
                                            <td>{item.status}</td>
                                            <td>{item.vehicleOwner}</td>
                                            <td><button onClick={() => {
                                                setEdit(item.id)
                                                setName("true")
                                            }}>Detail</button></td>
                                            <td><button>Manage</button></td>
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
                {name === "true" && <Driver_detail data={edit} changeName={changeName} />}

            </div>

        </div >
    )
}
