import React, { Component } from 'react'
import styles from './users_edit.module.css';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { HiMenuAlt1 } from "react-icons/hi";
import { useState, useEffect } from 'react';
import { Pagination } from 'antd';

export default function Vehicle_Table({ id, role, title }) {

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
    const [dataSource2, setDataSource2] = useState([])
    const [dataSource3, setDataSource3] = useState([])
    const [dataSource5, setDataSource5] = useState([])
    const [dataSource6, setDataSource6] = useState([])
    const [dataSource7, setDataSource7] = useState([])
    const [dataSource8, setDataSource8] = useState([])
    const [dataSource9, setDataSource9] = useState([])



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
                setDataSource2(json.ownerINF.companyAddressINF)
                setDataSource3(json.ownerINF.drivers)
                setDataSource5(json.ownerINF.vehicles)
                setDataSource6(json.ownerINF.inStockVehicles)
                setDataSource7(json.ownerINF.onRouteVehicles)
                setDataSource8(json.ownerINF.parkedVehicles)
                setDataSource9(json.ownerINF.maintainingVehicles)
                if (title == "Total Vehicles") {
                    setTotalPage(json.ownerINF.vehicles.length);
                }
                if (title == "On Route Vehicles") {
                    setTotalPage(json.ownerINF.onRouteVehicles.length);
                }
                if (title == "On Stock Vehicles") {
                    setTotalPage(json.ownerINF.inStockVehicles.length);
                }
                if (title == "Parked Vehicles") {
                    setTotalPage(json.ownerINF.parkedVehicles.length);
                }
                if (title == "Maintenance Vehicles") {
                    setTotalPage(json.ownerINF.maintainingVehicles.length);
                }

                setTotalPage2(json.ownerINF.drivers.length);
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
    if (title == "Total Vehicles") {
        currentPage = dataSource5.slice(indexOfFirstPage, indexOfLastPage);
    }
    if (title == "On Route Vehicles") {
        currentPage = dataSource7.slice(indexOfFirstPage, indexOfLastPage);
    }
    if (title == "On Stock Vehicles") {
        currentPage = dataSource6.slice(indexOfFirstPage, indexOfLastPage);
    }
    if (title == "Parked Vehicles") {
        currentPage = dataSource8.slice(indexOfFirstPage, indexOfLastPage);
    }
    if (title == "Maintenance Vehicles") {
        currentPage = dataSource9.slice(indexOfFirstPage, indexOfLastPage);
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

    return (
        <>
        <div className={styles.outer_vehicle_table} id='myTable'>
         

                <label>{title}</label>

                <table class={styles.vehicle_table} id="myTable">

                    <thead>
                        <tr>
                            <th>Vehicle Name</th>
                            <th>Assigned Driver</th>
                            <th>Vehicle ID</th>
                            <th>Vehicle Type</th>
                            <th>Plate Number</th>
                            <th>Status</th>
                            <th>Detail</th>
                            <th>Tracking</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPage.map(item => (
                            <tr className={styles.active_row}>

                                <td>{item.vehicleName}</td>
                                <td>{item.driverName == "null" ? "unassignd" : `${item.driverName}`}</td>
                                <td>{item.id}</td>
                                <td>{item.vehicleCatagory}</td>
                                <td>{item.plateNumber}</td>
                                <td>{item.status}</td>
                                <td><Link to={`/vehicle_detail/${item.id}`}><button>Detail</button></Link></td>
                                <td><Link to="/tracking"><button>Tracking</button></Link></td>
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
        
    )
}
