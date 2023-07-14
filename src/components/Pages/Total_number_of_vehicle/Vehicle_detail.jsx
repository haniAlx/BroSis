import React, { Component } from 'react'
import styles from './vehicle_detail.module.css';
import { useForm } from 'react-hook-form';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../../Header/Header';
import Navigation from '../Navigation/Navigation';
import axios from "axios";
import swal from "sweetalert";

export default function Users_edit() {

    const [state, setState] = useState(false);

    const toggle = () => {
        setState(!state);
    };

    const [diabled, setPop] = useState(true);
    const handleChange = () => {
        setPop(!diabled);
    }

    /************reload page******** */
    const [reloadKey, setReloadKey] = useState(0);

    const handleReload = () => {
        setReloadKey((prevKey) => prevKey + 1);
        };
        
    const [popup, setPop1] = useState(false);
    const handleClickopen = () => {
        setPop1(!popup);
    }

    const jwt = JSON.parse(localStorage.getItem('jwt'));// Getting the token from login api
    const options = {
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        },

    };
    const [updated,setUpdated]=useState(false)
    const { id } = useParams()
    const url2 = `http://64.226.104.50:9090/Api/Admin/All/Vehicles/${id}`;

    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        // setLoading(true);
        fetch(url2, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource(data)
                console.log(dataSource)
            })
    }, [reloadKey])

    const [selecttag, setSelectTag] = useState(false)
    const [inputtag, setinputTag] = useState(true)
    const select = () => {
        setSelectTag(!selecttag);
        setinputTag(!inputtag);
    }

    const urlthree = "http://64.226.104.50:9090/Api/Admin/All/VehicleCatagory";
    const [dataSource5, setDataSource5] = useState([])
    useEffect(() => {
        fetch(urlthree, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource5(data.vehicleCatagories)
                // console.log(dataSource3)
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
    const [updatedData, setUpdatedData] = useState(dataSource)
 
    const handleUpdateChange = (e) => {
        console.log('handleUpdateChange')
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({
          ...prevData,
          [name]: value || prevData[name],// Keep the existing value if the input is empty
        }));
        console.log(updatedData)
      };

    
    const onSubmit =(e)=>{
        
        e.preventDefault();
        update()
    }
        async function update(){

        const options = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify(updatedData),
        };
        const url = `http://64.226.104.50:9090/Api/Admin/UpdateVehicleInfo/${id}`;
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const mess = localStorage.getItem("message");
            console.log(mess);
            if (response.ok) {
                console.log("updated successful");
                swal("Successful", `${mess}`, "success", {
                    buttons: false,
                    timer: 2000,
                });
                setTimeout(() => {
                    handleReload();
                  }, 2500);
            } else {
                console.log("failed");
                swal(`Failed To update ${mess}`, "Error", "error");
            }
        } catch (error) {
            console.error(error);
        }
    }
      

    // const onSubmit = (e) =>{

    // }
        console.log(dataSource)
       

            const navigate = useNavigate();
            const goBack = () => {
                navigate(-1);
            }
            
    
        const plateNumber = dataSource.plateNumber;
        console.log(plateNumber)

    async function addToMaintenance(status){
                                        let item =
                                        {
                                            status,
                                            plateNumber,
                                        };
                                        const options = {
                                            method: "POST",
                                            headers: {'Content-Type': 'application/json', "Accept": "application/json", "Authorization": `Bearer ${jwt}`
                                            },
                                            body: JSON.stringify(item),
                                        };
                                        const url = "http://64.226.104.50:9090/Api/Vehicle/SetStatus";
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
                                                    } else {
                                                        swal(`Failed To Add ${mess}`, "", "error");
                                                    }
                                        } catch (error)
                                            {
                                            console.error(error);
                                            }
    }
console.log(updated)
    return (

        <div>

            <Navigation path="/Total_number_of_vehicle" title="Vehicles Detail"></Navigation>

            <div className={styles.main_content}>

                <div className={styles.tripHeader}>
                    <p><h1 className={styles.avaliableVehicles}>Vehicle Detail</h1></p>
                    <p ><h4>Driver Name : {dataSource.driver == null ? "Unassigned" : dataSource.driver} <br /> User ID : {dataSource.plateNumber}</h4></p>
                </div>
                <div className={styles.allDiv}>
                    <div className={styles.addToMaintenance}>
                        <p onClick={() => { 
                            {dataSource.status != "MAINTAINING" && addToMaintenance("MAINTAINING")}
                            }}> {dataSource.status != "MAINTAINING" ? 'Add to Maintenance':'It is On Maintainance'}</p>
                    </div>

                    <form onSubmit={(onSubmit)}>

                        <div className={styles.forms}> 

                            <div>
                                <p>Vehicle Catagory</p>
                                <input Value={dataSource.vehicleCatagory} className='select' disabled="true"></input>
                                
                            </div>

                            <div>
                                <p>Vehicle Name </p>
                              <input
                                 name ='vehicleName' 
                                defaultValue={dataSource.vehicleName} 
                                type="text" disabled
                                 ></input>
                            </div>
                            <div>
                                <p>Vehicle Condition </p>
                                {!selecttag ?  <input defaultValue={dataSource.vehicleCondition} className='select' disabled={diabled}></input>:
                                
                                    <select className='select' name='vehicleCondition' 
                                    defaultValue={dataSource.vehicleCondition} 
                                     onChange={handleUpdateChange} 

                                    >
                                      <option defaultValue=" " >Select Vehicle Condition</option>

                                        {
                                            dataSource4.map(item => {
                                                return <option key={item.conditionName}>{item.conditionName}</option>
                                            })
                                        }
                                    </select> }
                            </div>
                            <div>
                                <p>Plate Number </p>
                                <input 
                                 defaultValue={dataSource.plateNumber} 
                                 name='plateNumber' type="text" 
                                 onChange={handleUpdateChange} 
                                 disabled={diabled}></input>
                            </div>

                            <div>
                                <p>Manufacture Date </p>
                                <input  value={dataSource.manufactureDate} type="Date" disabled="true"></input>

                            </div>
                            <div>
                                <p>Device ID</p>
                                <input  value={dataSource.deviceID} type="text" disabled={diabled}></input>
                            </div>
                            <div>
                                <p>Status</p>
                          <input value={dataSource.status} className='select' disabled></input>:
                                
                        
                               
                                   
                            </div>
                            <div>
                                <p>Vehicle owner</p>
                                <input value={dataSource.vehicleOwner} type="text" disabled="true"></input>
                            </div>
                            <div>
                                <p>Capacity</p>
                                <input  
                                name ='capacity' 
                                onChange={handleUpdateChange} 
                                defaultValue={dataSource.capacity} 
                                type="text" disabled={diabled}
                                ></input>
                            </div>
                        </div>
                        <div className={styles.setButton}>
                            <p className={state ? styles.button : styles.button2} onClick={() => {
                                handleChange()
                                toggle()
                                select()
                            }}>{state ? "Cancle" : "Edit"}</p>
                            <button className={state ? styles.button3 : styles.button4} type='submit' onClick={()=>setUpdated(!updated)} disabled={diabled}>Update</button>
                        </div>

                    </form>
                </div>

            </div>

            {/* ---------------end Registaration--------------- */}
        </div>

    )
                        
}