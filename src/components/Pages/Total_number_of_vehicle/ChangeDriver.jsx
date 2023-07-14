import React from 'react'
import { FaHome } from 'react-icons/fa';
import { BsSearch } from "react-icons/bs";
import styles from './total_vehicle.module.css';
import { Link, NavLink, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../Header/Header';
import Navigation from '../Navigation/Navigation';
import SyncLoader from "react-spinners/SyncLoader";
import swal from "sweetalert";
import { useForm } from 'react-hook-form';

export default function () {

    const { plateNumber, ownerId } = useParams()

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

    const closePopup5 = () => {
        setPop(false);
    }

    let [active, setActive] = useState("total_vehicle");
    let [state, setState] = useState("false");
    const [popup, setPop] = useState(false);
    const handleClickopen = () => {
        setPop(!popup);
    }

    const location = useLocation();
    console.log(location.pathname);
    const [color, setColor] = useState("");
    const getColor = (curr) => {
        if (location.pathname === curr) {
            return 'green'
        }
        else {
            return 'white'
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

    const url = `http://64.226.104.50:9090/Api/Admin/Drivers/All/${ownerId}`;
    const [dataSource, setDataSource] = useState([])
    const [Loading, setLoading] = useState([])
    useEffect(() => {
        setLoading(true);
        fetch(url, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource(data.drivers.filter(item => item.status == 'UNASSIGNED'))
                setLoading(false);
            })
    }, [])

    const [driver, setDriverName] = useState();

   

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        handleClick();
    };
    async function handleClick() {

        let item =
        {
            plateNumber,
            driver,
        };
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify(item),
        };
        const url = "http://64.226.104.50:9090/Api/Vehicle/ChangeAssignedDriver";
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            console.log(mess);
            if (response.ok) {
                swal("Successful", `${mess}`, "success", {
                    buttons: false,
                    timer: 3000,
                }).then((value) => {
                    setPop(!popup);
                }).finally(() => {
                });
            } else {
                console.log("failed");
                swal("Failed", "Failed To Change", "error");
            }
        } catch (error) {
            console.log(error + "error");
            swal({
                title: "Something Went Wrong?",
                text: `net::ERR_INTERNET_DISCONNECTED `,
                icon: "warning",
                dangerMode: true,
            })
        }
    }

    return (

        <div className="vehicle_container">

            {/*---------------navigation---------------*/}

            <Navigation path="/Total_Drivers" title="Total Vehicles"></Navigation>

            <div className={styles.main_content}> 

                {/* --------------------- Table ------------------- */}

                {
                    Loading ?
                        <p className='loading'><SyncLoader
                            loading={Loading}
                            // cssOverride={override}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        /></p>

                        :

                        <div className={styles.outer_vehicle_table} id='myTable'>
                            <div className={styles.vehicle_search}>
                                <p title='search'>
                                    <BsSearch className={styles.icn} size="1.5rem" color='rgb(63, 63, 63)'></BsSearch>
                                    <input type="text" id="myInput" onKeyUp={tableSearch} placeholder="Search"></input>
                                    <button>Search</button>
                                </p>
                            </div>
                            <p>Unassigned Driver</p>

                            <table className={styles.vehicle_table} id="myTable">

                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Driver Name</th>
                                        <th>Licence Number</th>
                                        <th>Driver</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataSource.map(item => (
                                         <tr className={styles.active_row}>
                                            <td>{item.id}</td>
                                            <td>{item.driverName}</td>
                                            <td>{item.licenseNumber}</td>
                                            <td>
                                                <button onClick={() => {
                                                    handleClickopen()
                                                    setDriverName(item.licenseNumber)
                                                }}>Select</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                } 
                {/* <div className='addMangeAssign'>
                    <button> Add Driver</button>
                    <button> Manage Driver</button>
                    <button onClick={() => { handleClickopen() }}> Assigne Driver</button>
                </div> */}

                {popup ?
                    <div>
                        <div className={styles.popup}>
                            <div className={styles.popupInner}>
                                <div className={styles.ewq}>
                                    <button className={styles.closeBtn} onClick={closePopup5}>X</button>
                                    <div>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className={styles.assignetDiver}>
                                                <lable className={styles.lable}>Assign Driver</lable>
                                                <lable >Driver Name</lable>
                                                <input value={driver}></input>
                                                <lable >Plate number</lable>
                                                <input value={plateNumber}></input>
                                                <button>Assign</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div> : ""}

            </div>
        </div >
    )
}
