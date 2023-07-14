import React from 'react'
import { FaStarOfLife } from 'react-icons/fa';
import styles from './company_registration.module.css';
import { useForm } from 'react-hook-form';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import swal from "sweetalert";
import Header from '../../Header/Header';
import Navigation from '../Navigation/Navigation'; 
import axios from 'axios';

// import { TbChevronsUpLeft } from 'react-icons/tb';

export default function Cargo_registration() {
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
    // const history = useNavigate();
    const [nname,setName] = useState("");
    const [licenseNumber, setLicenseNumber] = useState("");
    const [tinNumber, setTinNumber] = useState("");
    const [region, setRegion] = useState("");
    const [city, setCity] = useState("");
    const [subCity, setSubCity] = useState("");
    const [woreda, setWoreda] = useState("");
    const [specificLocation, setSpecficLocation] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [phoneNumber, setPhonenumber] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [businessType, setBusinessType] = useState("");
    const [businessSector, setBusinessSector] = useState("");
    const [licenseFile, setLicenseFile] = useState("");
    const [tinFile, setTinFile] = useState("");
    

   
    const handleClick = (e) => {
        // const tin = document.querySelector('#tin').file[0]
        // const license = document.querySelector('#license').file[0]
         registerCargo();
    };

    useEffect(() => {
    }, []);

    

    const registerCargo = async () => 
    {

            const formData = new FormData();
            formData.append("name", nname);
            formData.append("licenseNumber", licenseNumber);
            formData.append("tinNumber", tinNumber);
            formData.append("businessName", businessName);
            formData.append("businessType", businessType);
            formData.append("businessSector", businessSector);
            formData.append("region", region);
            formData.append("subCity", subCity);
            formData.append("specificLocation", specificLocation);
            formData.append("city", city);
            formData.append("woreda", woreda);
            formData.append("houseNumber", houseNumber);
            formData.append("phoneNumber", phoneNumber);
            formData.append("licenseFile", licenseFile);
            formData.append("tinFile", tinFile);

        try{
            const response = await axios.post(
                'http://64.226.104.50:9090/Api/CargoOwner/Register',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "Authorization": `Bearer ${jwt}`,
                    },
                    }
                );
              localStorage.setItem("message", JSON.stringify(response.data["message"]));
                const mess = localStorage.getItem("message");
                console.log(response);
                swal("Successfully Registered", `${mess}`, "success", {
                    button: true,
                });
                setName("");
                setLicenseNumber("");
                setPhonenumber("");
                setRegion("");
                setCity("");
                setSubCity("");
                setWoreda("");
                setSpecficLocation("");
                setHouseNumber("");
                setLicenseFile("");
                setBusinessSector("");
                setBusinessType("");
                setBusinessName("");
                setTinNumber("");
                setTinFile("");

        } catch (error) {
          if (error.response) {
            localStorage.setItem('message', JSON.stringify(error.response.data['message']));
            const messx = localStorage.getItem('message');
            console.log('message', messx);
            console.log(error.response.data);
            swal("Error", `${messx}`, "error", {
              button: true,
            });
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
        }
    }
 

    // const user = JSON.parse(   localStorage.getItem('user'));

    const options = {

        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        },

    };

    const url = "http://64.226.104.50:9090/Api/Admin/All/BusinessSectors";
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        fetch(url, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource(data.businessSectors)
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

    const url5 = "http://64.226.104.50:9090/Api/Admin/All/BusinessTypes";
    const [dataSourc6, setDataSource6] = useState([])
    useEffect(() => {
        fetch(url5, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource6(data.businessSectors)
                console.log(dataSource)
            })
    }, [])

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


    return (
        <div className="company_container">

            {/*--------------- Company Container ---------------*/}

            <Navigation path="/Company_registration" title="Registation"></Navigation>

            {/* --------------- Registration- -------------- */}

            <section className={styles.main_content}>

                <div className={styles.company_individual_header}>
                    <p ><Link style={{ textDecoration: 'none' }} to="/Company_registration"><h1 >Company</h1></Link></p>
                    <p><Link style={{ textDecoration: 'none' }} to="/individual"><h1>Individual</h1></Link></p>
                    <p ><Link style={{ textDecoration: 'none' }} to="/Cargo_registration"><h1 className={styles.companyHeader}>Cargo</h1></Link></p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

                    {/* --------------- Company information- -------------- */}
                    <div className={styles.allDiv}>
                        <div className={styles.first_div}>
                            <h1>Owner Information</h1> 
                            <div className={styles.company_information}>

                                <div>
                                    <p>Name <FaStarOfLife style={{marginBottom:"2px"}} className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input
                                        name='nname'
                                        value={nname}
                                        type="text"
                                        {...register("name", { required: true })}
                                        placeholder='Enter your name'
                                        onChange={(e) => setName(e.target.value)}>
                                    </input>
                                    {nname <= 0 && errors.name?.type === "required" && <span className={styles.validate_text}>*please enter your name</span>}
                                </div>
                                <div>
                                    <p>Phone <FaStarOfLife style={{marginBottom:"2px"}} className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input
                                        name='phoneNumber'
                                        value={phoneNumber}
                                        type="text"
                                        {...register("phoneNumber", { required: true })}
                                        placeholder='Enter phone Number'
                                        onChange={(e) => setPhonenumber(e.target.value)}>
                                    </input>
                                    {phoneNumber <= 0 && errors.phoneNumber?.type === "required" && <span className={styles.validate_text}>*please enter phone number</span>}
                                </div>
                                
                            </div>
                        </div>

                        {/* --------------- Company Address- -------------- */}
                        <div className='second_div'> 
                            <h1>Business information</h1>
                            <div className={styles.company_Address}>
                               <div>
                                    <p>Business name <FaStarOfLife style={{marginBottom:"2px"}} className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input
                                        name='businessName'
                                        value={businessName}
                                        type="text"
                                        {...register("businessName", { required: true })}
                                        placeholder='Enter business name'
                                        onChange={(e) => setBusinessName(e.target.value)}>
                                    </input>
                                    {businessName <= 0 && errors.businessName?.type === "required" && <span className={styles.validate_text}>*please enter the business name</span>}
                                </div>
                                <div>
                                    <p>Region <FaStarOfLife style={{marginBottom:"2px"}} className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='region'
                                        value={region}
                                        {...register("region", { required: '*please fill your Region' })}
                                        placeholder="Please enter your Region"
                                        onChange={(e) => setRegion(e.target.value)}>
                                    </input>
                                    {region <= 0 && errors.region && <span className={styles.validate_text}>{errors.region.message}</span>}
                                </div>

                                <div>
                                    <p>Sub City <FaStarOfLife style={{marginBottom:"2px"}} className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='subCity'
                                        value={subCity}
                                        {...register("subCity", { required: '*please fill your Sub-city' })}
                                        placeholder="Please enter your Sub-city"
                                        onChange={(e) => setSubCity(e.target.value)}>
                                    </input>
                                    {subCity <= 0 && errors.subCity && <span className={styles.validate_text}>{errors.subCity.message}</span>}
                                </div>

                                <div>
                                    <p>Specfic Location <FaStarOfLife style={{marginBottom:"2px"}} className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='specificLocation'
                                        value={specificLocation}
                                        {...register("specificLocation", { required: '*please fill your Specfic Location' })}
                                        placeholder="Please enter your Specfic Location"
                                        onChange={(e) => setSpecficLocation(e.target.value)}>
                                    </input>
                                    {specificLocation <= 0 && errors.specificLocation && <span className={styles.validate_text}>{errors.specificLocation.message}</span>}
                                </div>

                                <div>
                                    <p>City <FaStarOfLife style={{marginBottom:"2px"}} className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='city'
                                        value={city}
                                        {...register("city", { required: '*please fill your City' })}
                                        placeholder="Please enter your City"
                                        onChange={(e) => setCity(e.target.value)}>
                                    </input>
                                    {city <= 0 && errors.city && <span className={styles.validate_text}>{errors.city.message}</span>}
                                </div>

                                <div>
                                    <p>Woreda <FaStarOfLife style={{marginBottom:"2px"}} className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='woreda' type="text"
                                        value={woreda}
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
                                    <p>House Number <FaStarOfLife style={{marginBottom:"2px"}} className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='houseNumber' type="text"
                                        value={houseNumber}
                                        {...register("houseNumber", {
                                            required: "*please fill your house number",
                                            pattern: { value: /^[0-9]+[0-9]*$/, message: 'please enter a vaild number' }
                                        })}
                                        placeholder='Enter House Number'
                                        onChange={(e) => setHouseNumber(e.target.value)}>
                                    </input>
                                    {houseNumber <= 0 && errors.houseNumber && <span className={styles.validate_text}>{errors.houseNumber.message}</span>}
                                </div>

                            </div>
                            
                           
                        </div>

                        {/* --------------- Owner information- -------------- */}

                        <div className='Third_div'>
                            <h1>Business sector</h1>
                            <div className={styles.owner_information}>
                                <div>
                                    <p>Business  Type <FaStarOfLife style={{marginBottom:"2px"}} className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <select
                                        value={businessType}
                                        name='businessType'
                                        {...register("businessType", { required: '*please choose business type' })}
                                        onChange={(e) => setBusinessType(e.target.value)} >
                                        <option selected disabled value="">Select Business Type</option>
                                        {
                                            dataSourc6.map(item => {
                                                return <>
                                                    <option key={item.businessType}>{item.businessType}</option>
                                                </>
                                            })
                                        }
                                    </select>
                                    {businessType <= 0 && errors.businessType && <span className={styles.validate_text}>{errors.businessType.message}</span>}
                                </div>

                                <div>
                                    <p>Business  Sector <FaStarOfLife style={{marginBottom:"2px"}} className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <select
                                        {...register("businessSector", { required: '*Company sector is required' })} name='businessSector'
                                        value={businessSector}
                                        onChange={(e) => setBusinessSector(e.target.value)}>
                                        <option selected disabled value="">Please Select Business Sector Type</option>
                                        {
                                            dataSource.map(item => {
                                                return <>
                                                    <option key={item.businessSector}>{item.businessSector}</option>
                                                </>
                                            })
                                        }
                                    </select>
                                    {businessSector <= 0 && errors.businessSector && <span className={styles.validate_text}>{errors.businessSector.message}</span>}
                                </div>
                                <div>
                                    <p>Business license number  <FaStarOfLife style={{marginBottom:"2px"}} className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='licenseNumber' type="text"
                                        value={licenseNumber}
                                        {...register("licenseNumber", { required: "*please fill your license number" })}
                                        placeholder='Enter Business license number'
                                        onChange={(e) => setLicenseNumber(e.target.value)}>
                                    </input>
                                    {licenseNumber <= 0 && errors.licenseNumber && <span className={styles.validate_text}>{errors.licenseNumber.message}</span>}
                                </div>
                                <div>
                                    <p>Tin Number <FaStarOfLife style={{marginBottom:"2px"}} className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='tinNumber' type="text"
                                        value={tinNumber}
                                        {...register("tinNumber", { required: "*please fill your tin  number" })}
                                        placeholder='Tin Number '
                                        onChange={(e) => setTinNumber(e.target.value)}>
                                    </input>
                                    {tinNumber <= 0 && errors.tinNumber && <span className={styles.validate_text}>{errors.tinNumber.message}</span>}
                                </div>
                            </div>
                        </div>

                        {/* --------------- aditional information- -------------- */}

                        <div className='Third_div'>
                            <h1>Documents</h1>
                            <div className={styles.additional_information}>
                            <div>
                                    <p>Scanned Tin  <FaStarOfLife style={{marginBottom:"2px"}} className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='tinFile' type="file"
                                        // value={tinFile}
                                        {...register("tinFile", { required: "*please enter your tin number image" })}
                                        placeholder='Enter Scanned Tin'
                                        onChange={(e) => setTinFile(e.target.files[0])}
                                        id='tin'>
                                    </input>
                                    {errors.tinFile && <span className={styles.validate_text}>{errors.tinFile.message}</span>}
                                </div>

                                <div>
                                    <p>Scanned business license <FaStarOfLife style={{marginBottom:"2px"}} className='icon' size="0.5rem" color='red'></FaStarOfLife></p>
                                    <input name='licenseFile' type="file"
                                        // value={licenseFile}
                                        {...register("licenseFile", { required: "*please enter your license number image" })}
                                        placeholder='Enter Scanned business license'
                                        onChange={(e) => setLicenseFile(e.target.files[0])}
                                       id='license' >
                                    </input>
                                    {errors.licenseFile && <span className={styles.validate_text}>{errors.licenseFile.message}</span>}
                                </div>
                            </div>
                        </div>
                        <div className={styles.company_button}>
                            <button className={styles.add}>Register</button>
                        </div>

                    </div>

                </form>

            </section>

            {/* ---------------end Registaration--------------- */}
        </div>
    )
}