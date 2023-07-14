import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './setTrip.module.css';
import { useForm } from 'react-hook-form';
import { FaStarOfLife } from 'react-icons/fa';
import Header from '../../Header/Header';
import Navigation from '../Navigation/Navigation';
import swal from "sweetalert";
import SyncLoader from "react-spinners/SyncLoader";
import { BsSearch } from "react-icons/bs";
import { Pagination } from 'antd';

export default function () {

    function tableSearch() {

        let input, filter, table, tr, td, txtValue, errors;

        //Intialising Variables for search bar
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

    const { vehicle, driver, companyID } = useParams(); 
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const jwt = JSON.parse(localStorage.getItem('jwt'));// Getting the token from login api
    const options = {

        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
    };


    const [popup, setPop] = useState(false);
    const handleClickopen = () => {
        setPop(!popup);
    }

    const [tripType, setTripType] = useState("");
    const [startLocation, setStartLocation] = useState("");
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");

    const [loading, setLoading] = useState(false)
    const url10 = "http://64.226.104.50:9090/Api/Admin/TripType/All";
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        setLoading(true)
        fetch(url10, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource(data.triptypes)
                setLoading(false)
            })
    }, [])

    const onSubmit = (data) => {
        console.log(data);
        setTrip()
    };

    async function setTrip() {
        let item =
        {
            vehicle,
            startLocation,
            destination,
            startDate,
            tripType,
        };
        const jwt = JSON.parse(localStorage.getItem('jwt'));// Getting the token from login api
        const options = {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify(item),
        };

        const url = "http://64.226.104.50:9090/Api/Admin/CreateTrip";
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            console.log(mess);
            if (response.ok) {
                console.log("Signup successful");
                swal("Successful", `${mess}`, "success", {
                    button: true,
                    // timer: 60000,
                });
                setTripType("");
                setStartLocation("");
                setDestination("");
                setStartDate("");

            } else {
                console.log("failed");
                swal(`Failed To Register ${mess}`, "Error", "error");
            }
        } catch (error) {
            console.error(error);
        }
    }
    const [totalPages, setTotalPage] = useState(1);
    const [page, setCurentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(5);


    const url2 = "http://64.226.104.50:9090/Api/Admin/Trip/All";
    const [dataSource2, setDataSource2] = useState([])
    useEffect(() => {
        fetch(url2, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource2(data.setTrips)
                setTotalPage(data && data.setTrips.length)
            })
    }, [])

    const indexOfLastPage = page * postPerPage;
    const indexOfFirstPage = indexOfLastPage - postPerPage;
    const currentPage = dataSource2.slice(indexOfFirstPage, indexOfLastPage);

    const onShowSizeChange = (current, pageSize) => {
        setpostPerPage(pageSize);
    }

    const [color, setColor] = useState("green");
    const [margin, setMargin] = useState("");


    return (
        <div className="dashboard_container"> 

            {/*---------------navigation---------------*/}

            <Navigation path="/avialable_trip" title="Set Trip"></Navigation>

            <section className={styles.main_content21}>

                <div className={styles.tripHeader}>
                    <Link style={{ textDecoration: 'none' }} to="/avialable_trip"><p><h1 className={styles.avaliableVehicles}>Set Trip</h1></p></Link>
                </div>
                <div className={styles.allDiv}>

                    <form className='form' onSubmit={handleSubmit(onSubmit)}>

                        <div className={styles.forms}>

                            <div>
                                <p>Trip Type <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                <select name="tripType"
                                    value={tripType}
                                    {...register("tripType", { required: '*Trip type  is required' })}
                                    onChange={(e) => setTripType(e.target.value)}
                                >
                                    <option selected disabled value="">Select Trip Type</option>
                                    {
                                        dataSource.map(item => {
                                            return <>
                                                <option>{item.tripType}</option>
                                            </>
                                        })
                                    }
                                </select>
                                {tripType <= 0 && errors.tripType && <span className={styles.validate_text}>{errors.tripType.message}</span>}
                            </div>

                            <div>
                                <p>Vehicle Plate Number <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                <input name='vehicleName' type="text"
                                    {...register("vehicleName", { required: true })}
                                    placeholder='Enter Vehicle Plate Number'
                                    value={vehicle}
                                ></input>
                                {vehicle <= 0 && errors.vehicleName?.type === "required" && <span className={styles.validate_text}>*please enter vehicle plate number</span>}
                            </div>

                            <div>
                                <p>Driver <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                <input name='driver' type="text"
                                    {...register("driver", { required: true })}
                                    placeholder='Enter Deriver Name'
                                    value={driver}
                                ></input>
                                {driver <= 0 && errors.driver?.type === "required" && <span className={styles.validate_text}>*Deriver Is required </span>}
                            </div>

                            <div>
                                <p>Start Location <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                <div className='plate_numbera'>
                                    <input placeholder='Please insert Start Location'
                                        name='startLocation'
                                        value={startLocation}
                                        {...register("startLocation", { required: '*Start location is required' })}
                                        onChange={(e) => setStartLocation(e.target.value)}
                                    >
                                    </input>
                                    {startLocation <= 0 && errors.startLocation && <span className={styles.validate_text}>{errors.startLocation.message}</span>}
                                </div>

                            </div>

                            <div>
                                <p>Destination<FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                <div className='plate_numbera'>
                                    <input placeholder='Please insert Sestination' type="text"
                                        name='destination'
                                        value={destination}
                                        {...register("destination", { required: '*Destination is required' })}
                                        onChange={(e) => setDestination(e.target.value)}
                                    >
                                    </input>
                                    {destination <= 0 && errors.destination && <span className={styles.validate_text}>{errors.destination.message}</span>}
                                </div>
                            </div>

                            <div>
                                <p>Start Date<FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                <div className='plate_numbera'>
                                    <input placeholder='Please insert Sestination' type="date"
                                        name='startDate'
                                        value={startDate}
                                        {...register("startDate", { required: '*Start location is required' })}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    >
                                    </input>
                                    {startDate <= 0 && errors.startDate && <span className={styles.validate_text}>{errors.startDate.message}</span>}
                                </div>
                            </div>

                        </div>
                        <div className={styles.setButton}>
                            <button className={styles.button}>Set</button>
                        </div>
                    </form>

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
                                    <p>List of Active Trips</p>

                                    <table className={styles.vehicle_table} id="myTable">

                                        <thead>
                                            <tr>
                                                <th>Driver Name</th>
                                                <th>Platenumber</th>
                                                <th>Start Location</th>
                                                <th>Destination</th>
                                                <th>Current Location</th>
                                                <th>Star tDate</th>
                                                <th>Trip type</th>
                                                <th>Manage</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {currentPage.map(item => (
                                                <tr className={styles.active_row}>
                                                    <td>{item.driver}</td>
                                                    <td>{item.plateNumber}</td>
                                                    <td>{item.startLocation}</td>
                                                    <td>{item.destination}</td>
                                                    <td>{item.currentLocation == "NULL" ? "unassignd" : `${item.currentLocation}`}</td>
                                                    <td>{item.startDate}</td>
                                                    <td>{item.tripType}</td>
                                                    <td><button>Cancle</button></td>
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


            </section>

            {/* ---------------end contents--------------- */}

        </div>

    )
}
