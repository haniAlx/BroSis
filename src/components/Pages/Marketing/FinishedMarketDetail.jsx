import React, { Component } from 'react'
import styles from './Post_market.module.css';
import { useForm } from 'react-hook-form';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../../Header/Header';
import Navigation from '../Navigation/Navigation';
import axios from "axios";
import swal from "sweetalert";

export default function Market_Progress() {
const send = false
const { id } = useParams()
    const {
        register,
        handleSubmit,
        watch, 
        formState: { errors }, 
    } = useForm();
    
    const onSubmit = (e) => {
        e.preventDefault();
        handleClick();
    };


    const handleClick = async () => {
        
        console.log('Im on submit function');
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
           
        };
        const url =`http://64.226.104.50:9090/Api/Admin/AcceptedCargo/${id}`; 
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            localStorage.setItem("message", JSON.stringify(result["message"])); 
            const mess = localStorage.getItem("message");
            console.log(mess);
            if (response.ok) {
                console.log("Posted successful");
                swal("Successfully Posted to cargo owner", `${mess}`, "success", {
                    button: true,
                    timer: 60000,
                });
               
            } else {
                console.log("failed");
                swal(`Failed To Post ${mess}`, "Error", "error");
            }
        } catch (error) {
            console.error(error);
        }
    }



    const [state, setState] = useState(false);

    const toggle = () => {
        setState(!state);
    };

    const [diabled, setPop] = useState(true);
    const handleChange = () => {
        setPop(!diabled);
    }

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
   
    const url2 = `http://64.226.104.50:9090/Api/Admin/All/CargoDrivers/${id}`;

    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        // setLoading(true);
        fetch(url2, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource(data.cargoDriversINFs)
                console.log(dataSource.cargoDriversINFs)
                // setLoading(false);
            })
    }, [])
 console.log(dataSource);
 const url1 = `http://64.226.104.50:9090/Api/Admin/All/Cargos/${id}`;

 const [dataSource1, setDataSource1] = useState([])
 useEffect(() => {
     // setLoading(true);
     fetch(url1, options)
         .then(respnse => respnse.json())
         .then(data => {
             setDataSource1(data)
             console.log(dataSource1)
             // setLoading(false);
         })
 }, [])
console.log(dataSource1);


    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
  
    const remaining = dataSource1.remaining == dataSource1.weight ? 0 : dataSource1.remaining == 0 ? dataSource1.weight : dataSource1.remaining
    let percent = (remaining/dataSource1.weight) * 100;

    return (

        <div>

          {dataSource.status ='ACTIVE' ?<Navigation path="/marketing" title="Post progress" link="/marketing" past="marketing"></Navigation>:
           <Navigation path="/marketing" title="Post progress" link={`/Post_market/${id}`} past="post marketing"></Navigation>}

            <div className={styles.main_content}>

                <div className={styles.tripHeader}>
                    <p><h1 className={styles.avaliableVehicles}>Post cargo Detail</h1></p>
                    <p ><h4>Cargo Owner Name : {dataSource1.cargoOwner} <br /> Pakaging : {dataSource1.packaging}</h4></p>
                </div>
                <div className={styles.allDiv}>
                   
                    <form onSubmit={onSubmit}>


                        <div className={styles.forms}>
                        <div>
                                        <p>Neded</p>
                                        <input  value={dataSource1.weight} type="text" disabled={diabled}></input>
                                </div> 
                                <div>
                                    <p>Remaining</p>
                                        <input  value={dataSource1.remaining} type="text" disabled={diabled}></input>
                                </div>
                                
                                    <div className={styles.progressBar}>
                                    <p> Progress Bar </p>
                                    <div className={styles.progressDiv}>
                                        
                                      <div></div><div className={styles.progress}style={{ width: `${percent}%`, backgroundColor: percent <= 25 ?'red' : 'green' }} >
                                        </div>
                                    </div><span>{percent}%</span>
                                 </div>
                                                      
                        </div>  
                       {dataSource1.status == 'ACCEPTED' ? <p  className={styles.button3}>already send to cargo owner</p>: <button className={styles.button3}>Send to Cargo Owner</button>}
                    </form>
                 </div>

                        
            {/*---------------- table ------------------- */}

            <div className={styles.outer_vehicle_table} id='myTable'>
              <p>Vihecles list</p>
              <table className={styles.vehicle_table} id="myTable">
                                            <thead>
                                                <tr>
                                                <th>cargo Id</th>
                                                    <th>vihicle owner Name</th>
                                                    <th>Driver Name</th>
                                                    <th>Plate number</th>
                                                    <th>State</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                              {dataSource.map(item =>(
                                                    <tr className={styles.active_row} key={item.id}>
                                                        <td>{item.cargo}</td>
                                                        <td>{item.vehicleOwner}</td>
                                                        <td>{item.driver}</td>
                                                        <td>{item.plateNumber}</td>
                                                        <td>{item.state}</td>                          
                                                    </tr>
                                              ))}
                                            </tbody>
                                        </table>
            </div>
            <div className={styles.page}>
              {/* <Pagination 
                onChange={(page) => setCurentPage(page)}
                pageSize={postPerPage}
                current={page}
                total={totalPages}
              showQuickJumper
              showSizeChanger
              onShowSizeChange={onShowSizeChange} 
               /> */}
           
                 
            </div>

            

            {/* ---------------end Registaration--------------- */}
        </div>
 </div>
    )
}
