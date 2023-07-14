import React from 'react'
import { FaStarOfLife } from 'react-icons/fa';
import { ImUserTie } from "react-icons/im";
import styles from './company_registration.module.css';
import { useForm } from 'react-hook-form';
import { Link, NavLink } from 'react-router-dom';
import { BiTrip } from "react-icons/bi";
import { useState, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import swal from "sweetalert";
import Swal from 'sweetalert2'
import Header from '../../Header/Header';

export default function Individual_registration() {


    const jwt = JSON.parse(localStorage.getItem('jwt'));// Getting the token from login api

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

    const [region, setRegion] = useState("");
    const [city, setCity] = useState("");
    const [subCity, setSubCity] = useState("");
    const [woreda, setWoreda] = useState("");
    const [specificLocation, setSpecficLocation] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [phoneNumber, setPhonenumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastname] = useState("");
    const [ownerPhoneNumber, setPhoneNumber2] = useState("");
    const [email, setEmail] = useState("");
    const [notificationmedia, setNotificationPreference] = useState("");
    const [serviceRequired, setServiceNeeded] = useState("");
    const [vehicleName, setvehicleName] = useState("");
    const [catagory, setVehicleCategory] = useState("");
    const [conditionName, setVehicleCondition] = useState("");
    const [plateNumber, setPlateNumber] = useState("");
    const [manufactureDate, setmanufactureDate] = useState("");
    const [deviceID, setdeviceId] = useState("");

    const handleClick = (e) => {
        signupxx();
    };

    useEffect(() => {

    }, []);



    async function signupxx() {

        let item =
        {
            region,
            city,
            subCity,
            woreda,
            specificLocation,
            houseNumber,
            phoneNumber,
            firstName,
            lastName,
            ownerPhoneNumber,
            email,
            notificationmedia,
            serviceRequired,
            vehicles: [
                {
                    vehicleName,
                    vehicleCatagory: {
                        catagory,
                    },
                    vehicleCondition: {
                        conditionName,
                    },

                    plateNumber,
                    manufactureDate,
                    deviceID,
                },
            ]
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
        const url = "http://64.226.104.50:9090/Api/Individual/CreateIndividual";
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
                setRegion("");
                setCity("");
                setSubCity("");
                setWoreda("");
                setSpecficLocation("");
                setHouseNumber("");
                setPhonenumber("");
                setFirstName("");
                setLastname("");
                setPhoneNumber2("");
                setEmail("");
                setNotificationPreference("");
                setServiceNeeded("");
                setvehicleName("");
                setVehicleCategory("");
                setVehicleCondition("");
                setPlateNumber("");
                setmanufactureDate("");
                setdeviceId("");

            } else {
                // swal(`Failed To Register ${mess}`, "", "error");
                Swal.fire({
                    text: `Failed To Register ${mess}`,
                    icon: 'error',
                    showDenyButton: true,
                    denyButtonText: 'Cancle',
                    showConfirmButton: false,
                    // showCloseButton: true,
                    showClass: {
                        popup: 'animate__animated animate__shakeX'
                    },
                })
            }
        } catch (error) {
            console.error(error);
        }
    }

    const options = {

        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
    };

    const url = "http://64.226.104.50:9090/Api/Admin/All/CompanySector/";

    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        fetch(url, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource(data.companySectors)
                console.log(dataSource)
            })
    }, [])

    const urlTwo = " http://64.226.104.50:9090/Api/Admin/All/NotificationMedium";
    const [dataSource2, setDataSource2] = useState([])
    useEffect(() => {
        fetch(urlTwo, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource2(data.notificationMedias)
                console.log(dataSource2)
            })
    }, [])

    const urlthree = "http://64.226.104.50:9090/Api/Admin/All/VehicleCatagory";
    const [dataSource3, setDataSource3] = useState([])
    useEffect(() => {
        fetch(urlthree, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource3(data.vehicleCatagories)
                console.log(dataSource3)
            })
    }, [])

    const urlFour = "http://64.226.104.50:9090/Api/Admin/All/VehicleCondition";
    const [dataSource4, setDataSource4] = useState([])
    useEffect(() => {
        fetch(urlFour, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource4(data.vehicleConditions)
                console.log(dataSource4)
            })
    }, [])

    const urlFive = "http://64.226.104.50:9090/Api/Admin/All/Services";
    const [dataSource5, setDataSource5] = useState([])
    useEffect(() => {
        fetch(urlFive, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource5(data.service)
                console.log(dataSource4)
            })
    }, [])

    const [popup, setPop] = useState(false);
    const handleClickopen = () => {
        setPop(!popup);
    }

    return (
        <div className="company_container">

            {/*--------------- Company Container ---------------*/}

            <Navigation path="/Company_registration" title="Registation"></Navigation>

            {/* --------------- Company header --------------- */}

            {/* <Header title="Registation"></Header> */}


            {/* --------------- Registration- -------------- */}

            <section className={styles.main_content}>

                <div className={styles.company_individual_header}>
                    <p ><Link style={{ textDecoration: 'none' }} to="/Company_registration"><h1 >Company</h1></Link></p>
                    <p><Link style={{ textDecoration: 'none' }} to="/individual"><h1 className={styles.companyHeader}>Individual</h1></Link></p>
                    <p><Link style={{ textDecoration: 'none' }} to="/Cargo_registration"><h1>Cargo</h1></Link></p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

                    {/* --------------- Company information- -------------- */}

                    {/* --------------- Company Address- -------------- */}
                    <div className={styles.allDiv}>
                        <div className='first_div'>
                            <h1>Owner Information</h1>
                            <div className={styles.company_Address}>
                                <div>
                                    <p>First Name <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='firstName' type="text" value={firstName}
                                        {...register("firstName", { required: true })}
                                        placeholder='Enter Your first name'
                                        onChange={(e) => setFirstName(e.target.value)}>
                                    </input>
                                    {firstName <= 0 && errors.firstName?.type === "required" && <span className={styles.validate_text}>*please enter your name</span>}
                                </div>
                                <div>
                                    <p>Last Name <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='lastName' type="text" value={lastName}
                                        {...register("lastName", { required: true })}
                                        placeholder='Enter Your last name'
                                        onChange={(e) => setLastname(e.target.value)}>
                                    </input>
                                    {lastName <= 0 && errors.lastName?.type === "required" && <span className={styles.validate_text}>*please enter your last name</span>}
                                </div>
                                <div>
                                    <p>Phone Number <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='ownerPhoneNumber' type="text" value={ownerPhoneNumber}
                                        {...register("ownerPhoneNumber", { required: "*please fill your mobile nuber" })}
                                        placeholder='Enter Phone Number'
                                        onChange={(e) => setPhoneNumber2(e.target.value)}>
                                    </input>
                                    {ownerPhoneNumber <= 0 && errors.ownerPhoneNumber && <span className={styles.validate_text}>{errors.ownerPhoneNumber.message}</span>}
                                </div>
                                <div>
                                    <p>Email <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='email' type="email" value={email}
                                        {...register("email", {
                                            required: "*please enter your email address",
                                            pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: 'Please fill a valid Email' }
                                        })}
                                        placeholder='Enter your Email'
                                        onChange={(e) => setEmail(e.target.value)}>
                                    </input>
                                    {email <= 0 && errors.email && <span className={styles.validate_text}>{errors.email.message}</span>}
                                </div>

                                <div>
                                    <p>Region <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='region' value={region}
                                        {...register("region", { required: '*please fill your Region' })}
                                        placeholder="Please enter your Region"
                                        onChange={(e) => setRegion(e.target.value)}>
                                    </input>
                                    {region <= 0 && errors.region && <span className={styles.validate_text}>{errors.region.message}</span>}
                                </div>

                                <div>
                                    <p>Sub City <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='subCity' value={subCity}
                                        {...register("subCity", { required: '*please fill your Sub-city' })}
                                        placeholder="Please enter your Sub-city"
                                        onChange={(e) => setSubCity(e.target.value)}>
                                    </input>
                                    {subCity <= 0 && errors.subCity && <span className={styles.validate_text}>{errors.subCity.message}</span>}
                                </div>


                                <div>
                                    <p>Specfic Location <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='specificLocation' value={specificLocation}
                                        {...register("specificLocation", { required: '*please fill your Specfic Location' })}
                                        placeholder="Please enter your Specfic Location"
                                        onChange={(e) => setSpecficLocation(e.target.value)}>
                                    </input>
                                    {specificLocation <= 0 && errors.specificLocation && <span className={styles.validate_text}>{errors.specificLocation.message}</span>}
                                </div>

                                <div>
                                    <p>City <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='city' value={city}
                                        {...register("city", { required: '*please fill your City' })}
                                        placeholder="Please enter your City"
                                        onChange={(e) => setCity(e.target.value)}>
                                    </input>
                                    {city <= 0 && errors.city && <span className={styles.validate_text}>{errors.city.message}</span>}
                                </div>

                                <div>
                                    <p>Woreda <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='woreda' type="text" value={woreda}
                                        {...register("woreda", {
                                            required: "*please fill your Woreda",
                                            pattern: { value: /^[0-9]+[0-9]*$/, message: 'please enter a vaild number' }
                                        })}
                                        placeholder='Enter Your Woreda'
                                        onChange={(e) => setWoreda(e.target.value)}>
                                    </input>
                                    {woreda <= 0 && errors.woreda && <span className={styles.validate_text}>{errors.woreda.message}</span>}
                                </div>

                                <div>
                                    <p>House Number <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='houseNumber' type="text" value={houseNumber}
                                        {...register("houseNumber", {
                                            required: "*please fill your house number",
                                            pattern: { value: /^[0-9]+[0-9]*$/, message: 'please enter a vaild number' }
                                        })}
                                        placeholder='Enter House Number'
                                        onChange={(e) => setHouseNumber(e.target.value)}>
                                    </input>
                                    {houseNumber <= 0 && errors.houseNumber && <span className={styles.validate_text}>{errors.houseNumber.message}</span>}
                                </div>

                                <div>
                                    <p>Office Phone Number <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='phoneNumber' type="text"
                                        value={phoneNumber}
                                        {...register("phoneNumber", { required: "*please fill your company number" })}
                                        placeholder='Enter Phone Number'
                                        onChange={(e) => setPhonenumber(e.target.value)}>
                                    </input>
                                    {phoneNumber <= 0 && errors.phoneNumber && <span className={styles.validate_text}>{errors.phoneNumber.message}</span>}
                                </div>

                            </div>
                        </div>

                        {/* --------------- Owner information- -------------- */}

                        <div className='Third_div'>
                            <h1>Additional Information</h1>
                            <div className={styles.additional_information}>
                                <div>
                                    <p>Notification Pereference <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <select
                                        name='notificationmedia'
                                        value={notificationmedia}
                                        {...register("notificationmedia", { required: '*please choose your notification preference' })}
                                        onChange={(e) => setNotificationPreference(e.target.value)}>
                                        <option selected disabled value="">Please Notification preference</option>
                                        {
                                            dataSource2.map(item2 => {
                                                return <option >{item2.medium}</option>
                                            })
                                        }
                                    </select>
                                    {notificationmedia <= 0 && errors.notificationmedia && <span className={styles.validate_text}>{errors.notificationmedia.message}</span>}
                                </div>

                                <div>
                                    <p>Service Neded <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <select
                                        // value={serviceRequired}
                                        name='serviceRequired' value={serviceRequired}
                                        {...register("serviceRequired", { required: '*please choose service needed' })}
                                        onChange={(e) => setServiceNeeded(e.target.value)} >
                                        <option selected disabled value="">Select Service Needed</option>
                                        {
                                            dataSource5.map(item => {
                                                return <>
                                                    <option>{item.service}</option>
                                                </>
                                            })
                                        }
                                    </select>
                                    {serviceRequired <= 0 && errors.serviceRequired && <span className={styles.validate_text}>{errors.serviceRequired.message}</span>}
                                </div>
                            </div>
                        </div> 

                        <div className='second_div'> 
                            <h1>Vehicle Information</h1> 
                            <div className={styles.vehicle_information}> 
                                <div> 
                                    <p>Vehicle Category <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <select 
                                        {...register("catagory", { required: '*Vehicle catagoty  is required' })}
                                        name="catagory" 
                                        value={catagory} 
                                        onChange={(e) => setVehicleCategory(e.target.value)} >
                                        <option selected disabled value="">Select Vecicle Catagory</option>
                                        { 
                                            dataSource3.map(item => {  
                                                return <option >{item.catagory}</option>
                                            })  
                                        } 
                                    </select>
                                    {catagory <= 0 && errors.catagory && <span className={styles.validate_text}>{errors.catagory.message}</span>}
                                </div>

                                <div>
                                    <p>Vehicle Name <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='vehicleName' type="text" value={vehicleName}
                                        {...register("vehicleName", { required: true })}
                                        placeholder='Enter Vehicle Name'
                                        onChange={(e) => setvehicleName(e.target.value)} ></input>
                                    {vehicleName <= 0 && errors.vehicleName?.type === "required" && <span className={styles.validate_text}>*please enter vehicle name</span>}
                                </div> 

                                <div>
                                    <p>Vehicle Condition <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <select className='select' value={conditionName} name='conditionName'

                                        {...register("conditionName", { required: '*Vecicle Condition is required' })}
                                        onChange={(e) => setVehicleCondition(e.target.value)} >
                                        <option selected disabled value="">Select Vecicle Condition</option>
                                        { 
                                            dataSource4.map(item => { 
                                                return <option>{item.conditionName}</option>
                                            }) 
                                        } 
                                    </select>
                                    {conditionName <= 0 && errors.conditionName && <span className={styles.validate_text}>{errors.conditionName.message}</span>}
                                </div> 

                                <div>
                                    <p>Plate Number <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <div className='plate_numbera'>
                                        <input placeholder='Please Enter Plate Number'
                                            value={plateNumber} name='conditionName'
                                            {...register("plateNumber", { required: '*please choose service needed' })}
                                            onChange={(e) => setPlateNumber(e.target.value)} >
                                        </input>
                                        {plateNumber <= 0 && errors.plateNumber && <span className={styles.validate_text}>{errors.plateNumber.message}</span>}
                                    </div>
                                </div>

                                <div>
                                    <p>Manufacture Date <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='manufacture_date' type="date" value={manufactureDate}
                                        {...register("manufactureDate", { required: '*Manufacture date is required' })}
                                        placeholder='Enter Manufactureing Date'
                                        onChange={(e) => setmanufactureDate(e.target.value)} ></input>
                                    {manufactureDate <= 0 && errors.manufactureDate && <span className={styles.validate_text}>{errors.manufactureDate.message}</span>}
                                </div>

                                <div>
                                    <p>Device ID <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='deviceID' type="text" value={deviceID}
                                        {...register("deviceID", { required: '*Device ID is required' })}
                                        placeholder='Enter Device ID'
                                        onChange={(e) => setdeviceId(e.target.value)} ></input>
                                    {deviceID <= 0 && errors.deviceID && <span className={styles.validate_text}>{errors.deviceID.message}</span>}
                                </div>
                            </div>
                        </div>
                        <div className={styles.company_button}>
                            <button className={styles.add}>Register</button>
                            {/* <button type='reset' className='add'>Clear</button> */}
                        </div>
                    </div>

                </form>

            </section>


            {/* ---------------end Registaration--------------- */}
        </div>
    )
}
