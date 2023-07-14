import React from 'react'
// import './available.css';
import styles from './available.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SiTripdotcom } from "react-icons/si";
import { useForm } from 'react-hook-form';
import Header from '../../Header/Header';
import Navigation from '../Navigation/Navigation';
import { total } from './data/data';
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { BsPlusLg } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import SyncLoader from "react-spinners/SyncLoader";
import { BsSearch } from "react-icons/bs";
import { Pagination } from 'antd';
import { getRoles } from '@testing-library/react';

export default function ({ id, role, name, from }) {

    function tableSearch() {

        let input, filter, table, tr, td, txtValue, errors;

        //Intialising Variables for search bar
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");

        for (let i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[4];
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

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };

    const jwt = JSON.parse(localStorage.getItem('jwt'));// Getting the token from login api
    const options = {

        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
    };

    // const urlFour = "http://64.226.104.50:9090/Api/SignIn/Admin";
    // const [dataSource4, setDataSource4] = useState([])
    // useEffect(() => {
    //     fetch(urlFour, options)
    //         .then(respnse => respnse.json())
    //         .then(data => {
    //             setDataSource4(data)
    //             console.log(dataSource4)
    //         })
    // }, [])

    const [popup, setPop] = useState(false);
    const [state, setState] = useState("");
    const handleClickopen = () => {
        setPop(!popup);
    }

    const [search, setSearch] = useState('');

    const [loading, setLoading] = useState(false);
    const [popup1, setPop1] = useState(true);

    const [totalPages, setTotalPage] = useState(1);
    const [dataSource01, setDataSource501] = useState([])
    // const [dataSource2, setDataSource2] = useState([])
    const [dataSource3, setDataSource3] = useState([])
    const [dataSource5, setDataSource5] = useState([])

    const [visiblelist, setvisiblelist] = useState(true);
    const [visible, setVisible] = useState(true);
    const displaylist = () => {
        setVisible(!visible);
        console.log(id);
        console.log(role);
    }

    let url2;

    if (role === "OWNER") { 
        url2 = `http://64.226.104.50:9090/Api/Admin/All/CompanyVehicleOwner/${id}`;
    }
    if (role === "INDIVIDUAL") {
        url2 = `http://64.226.104.50:9090/Api/Admin/All/IndividualVehicleOwner/${id}`;
    }
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        setLoading(true)
        fetch(url2, options)
            .then((response) => response.json())
            .then((json) => {
                setDataSource(json.ownerINF.vehicles)
                setTotalPage(json.ownerINF.vehicles.length)
                setLoading(false)
            });
    }, [])



    const [list, setList] = useState([dataSource]);
    const [total, setTotal] = useState(dataSource.length);
    const [page, setCurentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(5);

    const indexOfLastPage = page * postPerPage;
    const indexOfFirstPage = indexOfLastPage - postPerPage;
    const currentPage = dataSource.slice(indexOfFirstPage, indexOfLastPage);

    const onShowSizeChange = (current, pageSize) => {
        setpostPerPage(pageSize);
    } 

    const [color, setColor] = useState("green");
    const [margin, setMargin] = useState("");

    return (

        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <div className='' >
                {visible ?
                    <>
                        {
                            loading ?
                                <p className={styles.loading}>
                                    <SyncLoader
                                        color={color}
                                        loading={loading}
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

                                        <p>{name}</p>

                                        <table className={styles.vehicle_table} id="myTable">

                                            <thead>
                                                <tr>
                                                    <th>Vehicle Name</th>
                                                    <th>Assigned Driver</th>
                                                    <th>Current Location</th>
                                                    <th>Vehicle Type</th>
                                                    <th>Plate Number</th>
                                                    <th>Set Trip</th>
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
                                                        {from == "availavleCars" ?
                                                            <td><Link to={`/set_trip/${item.plateNumber}/${item.driverName == "null" ? "unassignd" : `${item.driverName}`}`}><button>Set Trip</button></Link></td>
                                                            :
                                                            <td><Link to={`/report_detail/${item.vehicleName}/${item.plateNumber}`}><button>Report</button></Link></td>
                                                        }
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

                    </> : ""}




            </div>
        </form>


    )
}
