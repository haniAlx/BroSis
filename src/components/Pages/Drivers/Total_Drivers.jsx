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
import swal from "sweetalert";

export default function () {

   

    let [state, setState] = useState("false");
    const [popUp, setPop] = useState(false);
    const handleClickopen = () => {
        setPop(!popUp);
    }

    const jwt = JSON.parse(localStorage.getItem('jwt'));// Getting the token from login api
    const options = {

        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
    };
const [refresh, serRefresh] = useState(false)
    const [Loading, setLoading] = useState([]);
    const url = "http://64.226.104.50:9090/Api/Admin/All/Drivers";
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        setLoading(true);
        fetch(url, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource(data.drivers)
                setTotalPage(data.totalDrivers);
                setLoading(false);

            })
    }, [refresh])

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
                setDataSource3(data.drivers)
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

    const [page, setCurentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(5);

    const indexOfLastPage = page * postPerPage;
    const indexOfFirstPage = indexOfLastPage - postPerPage;
    const currentPage = dataSource && dataSource.slice(indexOfFirstPage, indexOfLastPage);

    const onShowSizeChange = (current, pageSize) => {
        setpostPerPage(pageSize);
    }

    const [color, setColor] = useState("green");
    const [margin, setMargin] = useState("");

    const [popup1, setPop1] = useState(false);

    const [id, setId] = useState();

    const [edit, setEdit] = useState("");
    let [active, setActive] = useState(false);
    let [show, setShow] = useState("false");

    function changeName(show) {
        setShow(show);
    }
    /*************************Total vehicles***************/
    const VehUrl = "http://64.226.104.50:9090/Api/Admin/All/Vehicles";
    const [AllVehicles, setAllVehicles] = useState([])
    useEffect(() => {
        setLoading(true); 
        fetch(VehUrl, options)
            .then(respnse => respnse.json())
            .then(data => {
                setAllVehicles(data.vehiclesINF)

            })
    }, [])
    const [selectVehicles, setSelect] =useState(false)
    const [plateNumber,setPlateNumber] =useState('')
    const handlePlateChange = (e) =>{
        setPlateNumber(e.target.value)
    }
    console.log(AllVehicles)

/**********************pop */
const [pop,setpop] = useState(false)
const [driverLicense, setdriverLicense] = useState('')
const [driverName,setdriverName] = useState('')
const [driverStatus, setdriverStatus] = useState('')
const handleSubmit =(e)=>{
    e.preventDefault();
    console.log('on submit')
    console.log(driverStatus)
    updateStatus()
}
const handleChange =(e)=>{
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
/****************search */
    
    const [filteredRows, setFilteredRows] = useState([]);
    const [searchValue, setSearchValue] = useState('');


    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);
     
        const filteredData = currentPage.filter((item) => {
          // Customize the conditions as per your search requirements
          return (
            item.driverName.toLowerCase().includes(value.toLowerCase()) ||
            item.vehicleOwner.toLowerCase().includes(value.toLowerCase()) ||
            item.experience.toString().toLowerCase().includes(value.toLowerCase())||
            item.licenseNumber.toString().toLowerCase().includes(value.toLowerCase()) ||
            item.status.toLowerCase().includes(value.toLowerCase())
            
          );
        });
    
        setFilteredRows(filteredData);
      };
    const searchResult = searchValue === '' ? currentPage : filteredRows;

console.log(searchResult)
    return (

        <div className="vehicle_container">

            {/*---------------navigation---------------*/}

            
            <Navigation path="/Total_Drivers" title="Total Drivers"></Navigation>


            {/* --------------- users --------------- */}

            <div className={styles.main_content}>
                <div className={styles.allcards}> 
                    <div className={styles.activeCard}>
                        <Link to="/Total_Drivers" style={{ textDecoration: 'none' }}> 
                            <div className={styles.innerContents1}>
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

                    <div className={styles.vehicle}>
                        <Link to="/Assigned_Driver" style={{ textDecoration: 'none' }}>
                            <div className={styles.innerContents}>
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
                                    <input type="text" id="myInput" value={searchValue}  onChange={handleSearch} placeholder="Search"></input>
                                    <button>Search</button>
                                </p>
                            </div>
                            <p>TOTAL DRIVERS</p>

                            <table className={styles.vehicle_table} id="myTable">

                                <thead>
                                    <tr>
                                        <th>Driver Name</th>
                                        <th>License Number</th>
                                        <th>Experience</th>
                                        <th>LicenseGrade</th>
                                        <th>Status</th>
                                        <th>Owner</th>
                                        <th>Detail</th>
                                        <th>Manage</th> 
                                       
                                    </tr>
                                </thead>

                                <tbody>
                                    {searchResult.map(item => (
                                        <tr className={styles.active_row}>

                                            <td>{item.driverName}</td>
                                            <td>{item.licenseNumber}</td>
                                            <td>{item.experience}</td>
                                            <td>{item.licenseGrade}</td>
                                            <td>{item.status}</td>
                                            <td>{item.vehicleOwner}</td>
                                            <td><button onClick={() => {
                                                setId(item.id) 
                                                setShow("true")
                                            }}>Detail</button></td>
                                            <td><button onClick={() => {
                                                    handleClickopen()
                                                    setdriverLicense(item.licenseNumber)
                                                    setdriverName(item.driverName)
                                                    setdriverStatus(item.status)
                                                    }}>
                                                        Manage</button></td>
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
                {show === "true" && <Driver_detail id={id} changeName={changeName} />}


                {popUp ?
                    <div>
                        <div className={styles.popup}>
                            <div className={styles.popupInner}>
                                <div className={styles.ewq}>
                                    <button className={styles.closeBtn} onClick={()=>{setPop(!popUp)}}>X</button>
                                    <div>
                                        <form onSubmit={handleSubmit}>
                                            <div className={styles.assignetDiver}>
                                                <lable className={styles.lable}>Change Status for Driver</lable>
                                                <lable >Licence number</lable>
                                                <input value={driverLicense}></input>
                                                <label>Driver name</label>
                                                <input value={driverName}></input>
                                                <button type='button' onClick={()=>{setSelect(!selectVehicles)}}
                                                 style={{background:'yellow'}}>Select Vehicle</button>
                                                 {selectVehicles &&
                                                 <div className={styles.vehicleOption}> <label>Vehicles</label>
                                                  <select className='select' value={plateNumber} onChange={handlePlateChange}>
                                                      <option  value="">Select Vehicles</option>
                                                      {
                                                          AllVehicles.map(item => {
                                                              return <option>{item.plateNumber}</option>
                                                          })
                                                      }
                                                  </select>
                                                  </div>
                                                  }
                                                <label>Status</label>
                                                <select className='select' value={driverStatus} onChange={handleChange}>
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



            </div>

        </div >
    )
}
