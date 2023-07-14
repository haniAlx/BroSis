import React from 'react'
import { FaHome } from 'react-icons/fa';
import { FaUsers } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { FaStarOfLife } from 'react-icons/fa';
// import { useState } from 'react';
import styles from './users.module.css';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../../Header/Header';
import Navigation from '../Navigation/Navigation';
import SyncLoader from "react-spinners/SyncLoader";
import { useForm } from 'react-hook-form';
import swal from "sweetalert";
import { Pagination } from 'antd';
import axios from "axios";


export default function () {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    {/*---------------- handle submit values ----------------- */ }

    function tableSearch() {

        let input, filter, table, tr, td, txtValue, errors;
        //Intialising Variables
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");

        for (let i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
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

    let [active, setActive] = useState("total_users");
    let [state, setState] = useState("false");

    const closePopup5 = () => {
        setPop1(false);
        setPop(false);
    }

    const jwt = JSON.parse(localStorage.getItem('jwt'));// Getting the token from login api

    const options = {

        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
    };

    const [totalPages, setTotalPage] = useState(1);
    const [dataSource, setDataSource] = useState([])
    const [Loading, setLoading] = useState([])
    const url = "http://64.226.104.50:9090/Api/Admin/All/VehicleOwners/";
    useEffect(() => {
        setLoading(true)
        fetch(url, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource(data.vehicleOwnerINF)
                console.log(dataSource)
                setLoading(false)
            })
    }, [])


    const [dataSource2, setDataSource2] = useState([])
    // const [Loading, setLoading] = useState([])
    const url2 = "http://64.226.104.50:9090/Api/Admin/All/VehicleOwners/Role/owner";
    useEffect(() => {
        setLoading(true)
        fetch(url2, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource2(data.totalusers)
                setLoading(false)
            })
    }, [])

    const [individual, setIndividual] = useState([])
    // const [Loading, setLoading] = useState([])
    const url4 = "http://64.226.104.50:9090/Api/Admin/All/VehicleOwners/Role/individual";
    useEffect(() => {
        setLoading(true)
        fetch(url4, options)
            .then(respnse => respnse.json())
            .then(data => {
                setIndividual(data.totalusers)
                setLoading(false)
            })
    }, [])

    const [dataSource3, setDataSource3] = useState([])
    const [dataSource03, setDataSource03] = useState([])
    const url3 = "http://64.226.104.50:9090/Api/Admin/All/CargoOwners";
    useEffect(() => {
        setLoading(true)
        fetch(url3, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource3(data.cargoOwners)
                setDataSource03(data.cargoOwners.length)
                setTotalPage(data.cargoOwners.length)
                setLoading(false)
            })
    }, [])


    const [popup, setPop] = useState(false);
    const [popup1, setPop1] = useState(false);
    const handleClickopen = () => {
        setPop(!popup);
    }
    const handleClickopen1 = () => {
        setPop1(!popup1);
    }
    const [page, setCurentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(5);
    const indexOfLastPage = page * postPerPage;
    const indexOfFirstPage = indexOfLastPage - postPerPage;
    const currentPage = dataSource3.slice(indexOfFirstPage, indexOfLastPage);

    const [vehicleName, setvehicleName] = useState("");
    const [vehicleCatagory, setVehicleCategory] = useState("");
    const [vehicleCondition, setVehicleCondition] = useState("");
    const [plateNumber, setPlateNumber] = useState("");
    const [manufactureDate, setmanufactureDate] = useState("");
    const [deviceID, setdeviceId] = useState("");
    const [ownerPhone, setOwnerPhone] = useState();

    const [error, setError] = useState(false);
    const [error1, setError1] = useState(false);
    console.log(ownerPhone);

    const handlechange = (e) => {
        console.log(e.target.files)
    }

    const onShowSizeChange = (current, pageSize) => {
        setpostPerPage(pageSize);
    }

    const urlthree = "http://64.226.104.50:9090/Api/Admin/All/VehicleCatagory";
    const [dataSource5, setDataSource5] = useState([])
    useEffect(() => {
        fetch(urlthree, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource5(data.vehicleCatagories)
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

    const onSubmit = (data) => {
        console.log(data);
        Addvehicle();
    };

    useEffect(() => {
    }, []);

    async function Addvehicle() {
        let item =
        {
            vehicleName,
            vehicleCatagory,
            vehicleCondition,
            plateNumber,
            manufactureDate,
            deviceID,
            ownerPhone,
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
        const url = "http://64.226.104.50:9090/Api/Vehicle/AddVehicle";
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
                    buttons: false,
                    timer: 2000,
                });
                // companyName = ''
                setvehicleName("");
                setVehicleCategory("");
                setVehicleCondition("");
                setPlateNumber("");
                setmanufactureDate("");
                setdeviceId("")

            } else {
                console.log("failed");
                swal(`Failed To Register ${mess}`, "Error", "error");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const onSubmit2 = (data) => {
        console.log(data);
        AddDriver();
    };

    const [driverName, setDriverName] = useState("");
    const [licenseNumber, setLicenseNumber] = useState("");
    const [licensePic, SetTinCertificate] = useState("");
    const [driverPic, setTreadCertificate] = useState("");
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [driverPhone, setDriverPhone] = useState("");
    const [experience, setExperience] = useState("");
    const [licenseGrade, setLicenseGrade] = useState("");
    const [licenseIssueDate, setLicenseIssueDate] = useState("");
    const [licenseExpireDate, setLicenseExpireDate] = useState("");
    const [imgData, setImgData] = useState(null);
    const [selectedFile, setSelectedFile] = useState();

    async function AddDriver() {
        const formData = new FormData();
        formData.append("driverName ", driverName)
        formData.append("licenseNumber", licenseNumber);
        formData.append("licensePic", licensePic);
        formData.append("driverPic", driverPic);
        formData.append("ownerPhone", ownerPhone);
        formData.append("gender", gender);
        formData.append("birthDate", birthDate)
        formData.append("driverPhone", driverPhone)
        formData.append("experience", experience)
        formData.append("licenseGrade", licenseGrade)
        formData.append("licenseIssueDate", licenseIssueDate)
        formData.append("licenseExpireDate", licenseExpireDate)
        formData.append("file", selectedFile);
        console.log(formData)

        axios.post("http://64.226.104.50:9090/Api/Driver/AddDriver", formData, {
            headers: {
                'Content-Type': 'Auto',
                "Authorization": `Bearer ${jwt}`,
            }
        })
            .then((res) => {
                localStorage.setItem("message", JSON.stringify(res.data["message"]));
                const mess = localStorage.getItem("message");
                console.log(res);
                swal("Successfully Registerd", `${mess}`, "success", {
                    button: true,
                })

                setDriverName("");
                setLicenseNumber("");
                SetTinCertificate("");
                setTreadCertificate();
                setGender("");
                setBirthDate("");
                setDriverPhone("");
                setLicenseGrade("");
                setLicenseIssueDate("");
                setLicenseExpireDate("");
                setSelectedFile("");
                setImgData(null);
                setSelectedFile();
            })
            .catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    localStorage.setItem('message', JSON.stringify(error.response.data['message']))
                    const messx = localStorage.getItem('message')
                    console.log('message', messx)
                    console.log(error.response.data);
                    swal("Error", `${messx}`, "error", {
                        button: true,

                    })
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }

            }) 
    };

    const FileUploadTinCertificate = (e) => {
        if (e.target.files[0]) {
            console.log("fileImage: ", e.target.files);
            SetTinCertificate(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
        if (e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };
    const FileUploadTreadCertificate = (e) => {
        if (e.target.files[0]) {
            console.log("fileID: ", e.target.files);
            setTreadCertificate(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
        if (e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };
    const [color, setColor] = useState("green");

    return (

        <div className="containerr">

            {/*---------------navigation---------------*/}
            <Navigation path="/users" title="Users"></Navigation>

            {/* --------------- header --------------- */}

            {/* <Header title="Users"></Header> */}

            {/* --------------- users --------------- */}

            <div className={styles.main_content} >

                <div className={styles.allcards}>
                    <div className={styles.vehicle}>
                        <Link style={{ textDecoration: 'none' }} to="/users">
                            <div className={styles.innerContents}>
                                <h4>Total Users</h4>
                                <div>
                                    <p><FaUsers size="2.2rem"></FaUsers><b>{dataSource.length}</b></p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.vehicle}>
                        <Link style={{ textDecoration: 'none' }} to="/company">
                            <div className={styles.innerContents}>
                                <h4>Company</h4>
                                <div>
                                    <p><FaWarehouse size="2.2rem"></FaWarehouse><b>{dataSource2}</b></p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.vehicle}>
                        <Link style={{ textDecoration: 'none' }} to="/register_individual">
                            <div className={styles.innerContents}>
                                <h4>Individual</h4>
                                <div>
                                    <p><FaUserAlt size="2rem"></FaUserAlt><b>{individual}</b></p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.activeCard}>
                        <Link style={{ textDecoration: 'none' }} to="/cargo">
                            <div className={styles.innerContents1}>
                                <h4>cargo</h4>
                                <div>
                                    <p><FaUserAlt size="2rem"></FaUserAlt><b>{dataSource03}</b></p>
                                </div>
                            </div>
                        </Link>
                    </div>


                </div>
              

                {/* --------------- search --------------- */}


                <div className={styles.vehicle_search}>
                    <p title='search'>
                        <BsSearch className={styles.icn} size="1.5rem" color='rgb(63, 63, 63)'></BsSearch>
                        <input type="text" id="myInput" onKeyUp={tableSearch} placeholder="Search"></input>
                        <button>Search</button>
                    </p>
                </div>

                {/* --------------------- Table ------------------- */}
                <div>
                    <>
                        {
                            Loading ?
                                <p className={styles.loading} >
                                    <SyncLoader
                                        loading={Loading}
                                        color={color}
                                        size={10}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    /></p>
                                :
                                <>
                                    <div className={styles.outer_vehicle_table} id='myTable'>
                                        <p>Cargo OWNERS</p>

                                        <table className={styles.vehicle_table} id="myTable">
                                            <thead>
                                                <tr>
                                                <th>Id</th>
                                                    <th>Owner Name</th>
                                                    <th>Phone Number</th>
                                                    <th>enabled</th>
                                                    <th>roles name</th>
                                                    <th>Detail</th>
                                                    </tr>
                                            </thead>
                                            <tbody>
                                                {currentPage.map(item => (
                                                    <tr className={styles.active_row}>
                                                        <td>{item.id}</td>
                                                        <td>{item.ownerName}</td>
                                                        <td>{item.phoneNumber}</td>
                                                        <td>{item.enabled ? 'Enabled' : 'Disabled'}</td>
                                                        <td>{item.roles[0].name}</td>
                                                        <td><Link to={`/cargo/${item.id}`}>
                                                            <button>Detail</button></Link>
                                                            </td>
                                                        
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            {popup ?
                                                <div>
                                                    <div className={styles.popup}>

                                                        <div className='animate__animated animate__slideInDown'>
                                                            
                                                            <div className={styles.popupInner}>

                                                                <div className={styles.allForms1}>

                                                                    <button className={styles.closeBtn} onClick={closePopup5}>X</button>
                                                                    <lable className={styles.addHeader}>Add Vehicle</lable>

                                                                    <div className={styles.formDiv1}>

                                                                        <div className={styles.input}>
                                                                            <lable>Vehicle Catagory <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></lable>
                                                                            <select className='select' placeholder='Select Vecicle Catagory'
                                                                                {...register("vehicleCatagory", { required: '*Vehicle catagoty  is required' })}
                                                                                name="vehicleCatagory"
                                                                                value={vehicleCatagory}
                                                                                onChange={(e) => setVehicleCategory(e.target.value)} >
                                                                                <option selected disabled value="">Select Vecicle Catagory</option>
                                                                                {
                                                                                    dataSource5.map(item => {
                                                                                        return <option >{item.catagory}</option>
                                                                                    })
                                                                                }
                                                                            </select>
                                                                            {vehicleCatagory <= 0 && errors.vehicleCatagory && <span className='validate_text'>{errors.vehicleCatagory.message}</span>}
                                                                        </div>

                                                                        <div className={styles.input}>
                                                                            <lable>Vehicle Name <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></lable>
                                                                            <input name='vehicleName' type="text"
                                                                                value={vehicleName}
                                                                                {...register("vehicleName", { required: true })}
                                                                                placeholder='Enter Vehicle Name'
                                                                                onChange={(e) => setvehicleName(e.target.value)} ></input>
                                                                            {vehicleName <= 0 && errors.vehicleName?.type === "required" && <span className='validate_text'>*please enter vehicle name</span>}
                                                                        </div>

                                                                        <div className={styles.input}>
                                                                            <lable>Vehicle Condition <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></lable>
                                                                            <select className='select' name='conditionName'
                                                                                value={vehicleCondition}
                                                                                {...register("vehicleCondition", { required: '*Vecicle Condition is required' })}
                                                                                onChange={(e) => setVehicleCondition(e.target.value)} >
                                                                                <option value="">Select Vecicle Condition</option>
                                                                                {
                                                                                    dataSource4.map(item => {
                                                                                        return <option>{item.conditionName}</option>
                                                                                    })
                                                                                }
                                                                            </select>
                                                                            {vehicleCondition <= 0 && errors.vehicleCondition && <span className='validate_text'>{errors.vehicleCondition.message}</span>}
                                                                        </div>

                                                                        <div className={styles.input}>
                                                                            <lable>Plate Number <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></lable>
                                                                            <input placeholder='Please Enter Plate Number' name='conditionName'
                                                                                value={plateNumber}
                                                                                {...register("plateNumber", { required: '*please choose service needed' })}
                                                                                onChange={(e) => setPlateNumber(e.target.value)} >
                                                                            </input>
                                                                            {plateNumber <= 0 && errors.plateNumber && <span className='validate_text'>{errors.plateNumber.message}</span>}
                                                                        </div>

                                                                        <div className={styles.input}>
                                                                            <lable>Manufacture Date <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></lable>
                                                                            <input name='manufacture_date' type="date"
                                                                                value={manufactureDate}
                                                                                {...register("manufactureDate", { required: '*Manufacture date is required' })}
                                                                                placeholder='Enter Manufactureing Date'
                                                                                onChange={(e) => setmanufactureDate(e.target.value)} ></input>
                                                                            {manufactureDate <= 0 && errors.manufactureDate && <span className='validate_text'>{errors.manufactureDate.message}</span>}
                                                                        </div>

                                                                        <div className={styles.input}>
                                                                            <lable>Plate Number <FaStarOfLife className='icon' size="0.5rem" color='red'></FaStarOfLife></lable>
                                                                            <input name='deviceID' type="text"
                                                                                value={deviceID}
                                                                                {...register("deviceID", { required: '*Device ID is required' })}
                                                                                placeholder='Enter Device ID'
                                                                                onChange={(e) => setdeviceId(e.target.value)} ></input>
                                                                            {deviceID <= 0 && errors.deviceID && <span className='validate_text'>{errors.deviceID.message}</span>}
                                                                        </div>

                                                                    </div>
                                                                    <div className={styles.addButton}>
                                                                        <button>Submit </button>
                                                                    </div>

                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> : ""}
                                        </form>

                                        <form onSubmit={handleSubmit(onSubmit2)}>

                                            {popup1 ?
                                                <div>
                                                    <div className={styles.popup}>

                                                        <div className='animate__animated animate__slideInDown'>

                                                            <div className={styles.popupInner}>

                                                                <div className={styles.allForms1}>

                                                                    <button className={styles.closeBtn} onClick={closePopup5}>X</button>
                                                                    <lable className={styles.addHeader}>Add Driver</lable>

                                                                    <div className={styles.formDiv1}>

                                                                        <div className={styles.input}>
                                                                            <lable>Full Name</lable>
                                                                            <input name='driverName' type="text"
                                                                                value={driverName}
                                                                                {...register("driverName", { required: '*Driver Name is required' })}
                                                                                placeholder='Enter Vehicle Name'
                                                                                onChange={(e) => setDriverName(e.target.value)} ></input>
                                                                            {driverName <= 0 && errors.driverName && <span className='validate_text'>{errors.driverName.message}</span>}
                                                                        </div>

                                                                        <div className={styles.input}>
                                                                            <lable>Gender</lable>
                                                                            <select className='select' name='gender'
                                                                                value={gender}
                                                                                {...register("gender", { required: '*gender is required' })}
                                                                                onChange={(e) => setGender(e.target.value)} >
                                                                                <option value="">Select Gender</option>
                                                                                <option value="MALE">Male</option>
                                                                                <option value="FEMAIL">Femaile</option>
                                                                            </select>
                                                                            {gender <= 0 && errors.gender && <span className='validate_text'>{errors.gender.message}</span>}
                                                                        </div>

                                                                        <div className={styles.input}>
                                                                            <lable>License Number</lable>
                                                                            <input name='licenseNumber' type="text"
                                                                                value={licenseNumber}
                                                                                {...register("licenseNumber", { required: '*License Number is required' })}
                                                                                placeholder='Enter Vehicle Name'
                                                                                onChange={(e) => setLicenseNumber(e.target.value)} ></input>
                                                                            {licenseNumber <= 0 && errors.licenseNumber && <span className='validate_text'>{errors.licenseNumber.message}</span>}
                                                                        </div>

                                                                        <div className={styles.input}>
                                                                            <lable>Driver Licence Picture</lable>
                                                                            <input name='licensePic' type="file"
                                                                                // value={licensePic}
                                                                                {...register("licensePic", { required: '*License Picture is required' })}
                                                                                placeholder='Enter License Picture'
                                                                                onChange={FileUploadTinCertificate} ></input>
                                                                            {licensePic <= 0 && errors.licensePic && <span className='validate_text'>{errors.licensePic.message}</span>}
                                                                        </div>

                                                                        <div className={styles.input}>
                                                                            <lable>Driver Picture</lable>
                                                                            <input name='driverPic' type="file"
                                                                                // value={driverPic}
                                                                                {...register("driverPic", { required: '*Driver Picture is required' })}
                                                                                placeholder='Please Enter Driver Picture'
                                                                                onChange={FileUploadTreadCertificate} ></input>
                                                                            {driverPic <= 0 && errors.driverPic && <span className='validate_text'>{errors.driverPic.message}</span>}
                                                                        </div>

                                                                        <div className={styles.input}>
                                                                            <lable>Date Of Birth</lable>
                                                                            <input name='birthDate' type="date"
                                                                                value={birthDate}
                                                                                {...register("birthDate", { required: '*Gender is required' })}
                                                                                placeholder='Enter Vehicle Name'
                                                                                onChange={(e) => setBirthDate(e.target.value)} ></input>
                                                                            {birthDate <= 0 && errors.birthDate && <span className='validate_text'>{errors.birthDate.message}</span>}
                                                                        </div>

                                                                        <div className={styles.input}>
                                                                            <lable>Phone Number</lable>
                                                                            <input name='driverPhone' type="text"
                                                                                value={driverPhone}
                                                                                {...register("driverPhone", { required: '*driver Phone is required' })}
                                                                                placeholder='Enter Phone Number'
                                                                                onChange={(e) => setDriverPhone(e.target.value)}
                                                                            ></input>
                                                                            {driverPhone <= 0 && errors.driverPhone && <span className='validate_text'>{errors.driverPhone.message}</span>}
                                                                        </div>

                                                                        <div className={styles.input}>
                                                                            <lable>Exeperiance</lable>
                                                                            <input name='experience' type="text"
                                                                                value={experience}
                                                                                {...register("experience", { required: '*experience is required' })}
                                                                                placeholder='Enter Exeperiance '
                                                                                onChange={(e) => setExperience(e.target.value)}
                                                                            ></input>
                                                                            {experience <= 0 && errors.experience && <span className='validate_text'>{errors.experience.message}</span>}
                                                                        </div>

                                                                        <div className={styles.input}>
                                                                            <lable>License Grade</lable>
                                                                            <input name='licenseGrade' type="text"
                                                                                value={licenseGrade}
                                                                                {...register("licenseGrade", { required: '*license Grade is required' })}
                                                                                placeholder='Enter License Grade '
                                                                                onChange={(e) => setLicenseGrade(e.target.value)}
                                                                            ></input>
                                                                            {licenseGrade <= 0 && errors.licenseGrade && <span className='validate_text'>{errors.licenseGrade.message}</span>}
                                                                        </div>

                                                                        {/*  */}

                                                                        <div className={styles.input}>
                                                                            <lable>Issue Date</lable>
                                                                            <input name='Issue Date' type="date"
                                                                                value={licenseIssueDate}
                                                                                {...register("licenseIssueDate", { required: '*license IssueDate is required' })}
                                                                                placeholder='Enter Issue Date'
                                                                                onChange={(e) => setLicenseIssueDate(e.target.value)}
                                                                            ></input>
                                                                            {licenseIssueDate <= 0 && errors.licenseIssueDate && <span className='validate_text'>{errors.licenseIssueDate.message}</span>}
                                                                        </div>

                                                                        <div className={styles.input}>
                                                                            <lable>Expire Date</lable>
                                                                            <input name='Expire Date' type="date"
                                                                                value={licenseExpireDate}
                                                                                {...register("licenseExpireDate", { required: '*license ExpireDate is required' })}
                                                                                placeholder='Enter Expire Date'
                                                                                onChange={(e) => setLicenseExpireDate(e.target.value)}
                                                                            ></input>
                                                                            {licenseExpireDate <= 0 && errors.licenseExpireDate && <span className='validate_text'>{errors.licenseExpireDate.message}</span>}
                                                                        </div>

                                                                    </div>
                                                                    <div className={styles.addButton}>
                                                                        <button>Submit </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> : ""}
                                        </form>
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

                    </>

                </div>

            </div>
        </div >
    )
}
