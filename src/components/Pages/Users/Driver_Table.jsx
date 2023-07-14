import React, { Component } from 'react'
import styles from './users_edit.module.css';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { HiMenuAlt1 } from "react-icons/hi";
import { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import Driver_detail from '../Drivers/Driver_detail';
import swal from "sweetalert";

export default function Driver_Table({ id, role, title }) {

    const [state, setState] = useState(false);
    const toggle = () => {
        setState(!state);
    };

    const [diabled, setPop] = useState(true);
    const handleChange = () => {
        setPop(!diabled);
    }

    const [popup1, setPop1] = useState(false);
    const handleClickopen = () => {
        setPop1(!popup1);
    }

    const jwt = JSON.parse(localStorage.getItem('jwt'));// Getting the token from login api

    const options = {

        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
    };

    // const [Loading, setLoading] = useState(false)
    const [totalPages, setTotalPage] = useState(1);
    const [totalPages2, setTotalPage2] = useState(1);
    const [dataSource, setDataSource] = useState([])
    const [dataSource1, setDataSource1] = useState([])
    const [dataSource2, setDataSource2] = useState([])
    const [dataSource3, setDataSource3] = useState([])
    const [dataSource4, setDataSource4] = useState([])
    const [dataSource5, setDataSource5] = useState([])

    const [Loading, setLoading] = useState([]);
    // const { id, role, companyID } = useParams(); 

    let url;
 
    if (role === "OWNER") {
        url = `http://64.226.104.50:9090/Api/Admin/All/CompanyVehicleOwner/${id}`;
    }
    if (role === "INDIVIDUAL") {
        url = `http://64.226.104.50:9090/Api/Admin/All/IndividualVehicleOwner/${id}`;
    }

    useEffect(() => {
        setLoading(true)
        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                setDataSource(json.ownerINF)
                setDataSource1(json.ownerINF.drivers) 
                setDataSource2(json.ownerINF.onRouteDriverINFs)
                setDataSource3(json.ownerINF.assignedDriverINFs)
                setDataSource4(json.ownerINF.unassignedDriverINFs)
                setDataSource5(json.ownerINF.permitDriverINFs)
                if (title == "Total Drivers") {
                    setTotalPage(json.ownerINF.drivers.length);
                }
                if (title == "On Route Drivers") {
                    setTotalPage(json.ownerINF.onRouteDriverINFs.length);
                }
                if (title == "Assigned Drivers") {
                    setTotalPage(json.ownerINF.assignedDriverINFs.length);
                }
                if (title == "Unassigned Drivers") {
                    setTotalPage(json.ownerINF.unassignedDriverINFs.length);
                }
                if (title == "Permit Vehicles") {
                    setTotalPage(json.ownerINF.permitDriverINFs.length);
                }

                setLoading(false)
            });
    }, [])

    const [selecttag, setSelectTag] = useState(false)
    const [inputtag, setinputTag] = useState(true)
    const select = () => {
        setSelectTag(!selecttag);
        setinputTag(!inputtag);
    }
    const [page, setCurentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(5);
    const indexOfLastPage = page * postPerPage;
    const indexOfFirstPage = indexOfLastPage - postPerPage;

    let currentPage;
    if (title == "Total Drivers") {
        currentPage = dataSource1.slice(indexOfFirstPage, indexOfLastPage);
    }
    if (title == "On Route Drivers") {
        currentPage = dataSource2.slice(indexOfFirstPage, indexOfLastPage);
    }
    if (title == "Assigned Drivers") {
        currentPage = dataSource3.slice(indexOfFirstPage, indexOfLastPage);
    }
    if (title == "Unassigned Drivers") {
        currentPage = dataSource4.slice(indexOfFirstPage, indexOfLastPage);
    }
    if (title == "Permit Vehicles") {
        currentPage = dataSource5.slice(indexOfFirstPage, indexOfLastPage);
    }

    const onShowSizeChange = (current, pageSize) => {
        setpostPerPage(pageSize);
    }

    const [color, setColor] = useState("green");
    const [edit, setEdit] = useState("");
    let [active, setActive] = useState(false);
    let [name, setName] = useState("false");

    function changeName(name) {
        setName(name);
    }
/****************** */
const [driverLicense, setdriverLicense] = useState('')
const [driverName,setdriverName] = useState('')
const [driverStatus, setdriverStatus] = useState('')
const [refresh, serRefresh] = useState(false)

const handleSubmit =(e)=>{
    e.preventDefault();
    console.log('on submit')
    console.log(driverStatus)
    updateStatus()
}
const handleStatusChange =(e)=>{
setdriverStatus(e.target.value);

}
async function updateStatus(){
    let item =
    {
        driverStatus,
        driverLicense,
    };
    const options = {
        method: "PUT",
        headers: {'Content-Type': 'application/json',
         "Accept": "application/json",
          "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify(item),
    };
    const url = "http://64.226.104.50:9090/Api/Vehicle/ChangeDriverStatus";
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
                        timer: 2000,
                    });
                    serRefresh(!refresh)
                } else {
                    swal(`Failed To update ${mess}`, "", "error");
                }
    } catch (error)
        {
        console.error(error);
        }
     }
     const statusUrl = "http://64.226.104.50:9090/Api/Admin/DriverStatus/All"
    const [status, setStatus] = useState([])
    useEffect(() => {
        fetch(statusUrl, options)
        .then(response => response.json())
        .then(data =>{
            setStatus(data.driverStatus)
            console.log(status)
        })
    },[])
    return (
        <>
            <div className={styles.outer_vehicle_table} id='myTable'>


                <label>{title}</label>

                <table className={styles.vehicle_table} id="myTable">

                    <thead>
                        <tr>
                            <th>Driver Name</th>
                            <th>License Number</th>
                            <th>Experience</th>
                            <th>LicenseGrade</th>
                            <th>Status</th>
                            <th>Company</th>
                            <th>Id</th>
                            <th>Detail</th>
                            <th>Manage</th>
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
                                <td>{item.id}</td>
                                <td><button onClick={() => {
                                    setEdit(item.id)
                                    setName("true")
                                }}>Detail</button></td>
                                <td><button onClick={() => {
                                                    handleClickopen()
                                                    setdriverLicense(item.licenseNumber)
                                                    setdriverName(item.driverName)
                                                    setdriverStatus(item.status)
                                                    }}>Manage</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {popup1 ?
                    <div>
                        <div className={styles.popup}>
                            <div className={styles.popupInner}>
                                <div className={styles.ewq}>
                                    <button className={styles.closeBtn} onClick={()=>{setPop1(!popup1)}}>X</button>
                                    <div>
                                        <form onSubmit={handleSubmit}>
                                            <div className={styles.assignetDiver}>
                                                <lable className={styles.lable}>Change Status for Driver</lable>
                                                <lable >Licence number</lable>
                                                <input value={driverLicense}></input>
                                                <label>Driver name</label>
                                                <input value={driverName}></input>
                                                <label>Status</label>
                                                <select className='select' value={driverStatus} onChange={handleStatusChange}>
                                                    <option  value="">Select Driver status</option>
                                                    {
                                                        status.map(item => {
                                                            return <option>{item.driverStatus}</option>
                                                        })
                                                    }
                                                </select>
                                                <button>Assign</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div> : ""}

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
            {name === "true" && <Driver_detail data={edit} changeName={changeName} />}
        </>

    )
}
