import React from 'react'
import { FaEdit } from "react-icons/fa";
import styles from './Settingtable.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SiTripdotcom } from "react-icons/si";
import { SiGoogletagmanager } from "react-icons/si";
import { BiTrip } from "react-icons/bi";
import Header from '../../Header/Header';
import Navigation from '../Navigation/Navigation';
import { Pagination } from 'antd';
import { useLocation } from 'react-router-dom';

export default function Settingtable(props) {

  function tableSearch() {

    let input, filter, table, tr, td, txtValue, errors;

    //Intialising Variables
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
  // const location = useLocation();
  // const { prop1, prop2 } = location.state;
  const [popup, setPop1] = useState(false);
  const handleClickopen = () => {
    setPop1(!popup);
  }

  const jwt = JSON.parse(localStorage.getItem('jwt'));// Getting the token from login api
  const dataa= localStorage.getItem('info');
  const data = JSON.parse(dataa);
  let isAvatar =false;
  if (data.name == 'Avatar and Logo')
  isAvatar = true
  console.log(data.url, data.name)
  const options = {

    headers: {
      'Content-Type': 'application/json',
      "Accept": "application/json",
      "Authorization": `Bearer ${jwt}`
    },

  };
  const [Loading, setLoading] = useState([])
  const [totalPages, setTotalPage] = useState(1);
  const [dataSource2, setDataSource2] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch(`${data.url}`, options)
      .then(respnse => respnse.json())
      .then(datta => {

        if (data.name == 'Alert Type') {
          console.log('true')
          setDataSource2(datta)
          console.log(dataSource2)
      }
      if (data.name == 'Roles Type') {
        console.log('true')
        setDataSource2(datta.roles)
      }
      if (data.name == 'Driver Status') {
        setDataSource2(datta.driverStatus)
      }  
       if (data.name == 'Trip type') {
        setDataSource2(datta.triptypes)
        }
        if (data.name == 'Notification Preference') {
          setDataSource2(datta.notificationMedias)
        }
        if (data.name == 'Vehicle Condition') {
          setDataSource2(datta.vehicleConditions)
        }    
        if (data.name == 'Service Needed') {
          setDataSource2(datta.service)
        }  
        if (data.name == 'Vehicle Category') {
          setDataSource2(datta.vehicleCatagories)
        }
        if (data.name == 'Company Type') {
          setDataSource2(datta.companyTypes)
        }
        if (data.name == 'Company Sector') {
          setDataSource2(datta.companySectors)
        }  
      if (data.name == 'Business Sector' || data.name == 'Business Type') {
        setDataSource2(datta.businessSectors)
      }  
      if (data.name == 'Cargo type') {
        setDataSource2(datta.cargoTypes)
      } 
      if (data.name == 'Avatar and Logo') {
       
        setDataSource2(datta)
      }
      if(data.name == ' ') 
        setDataSource2(datta.driverState)
  
        
        // setTotalPage(data.cargos.length); 
        setLoading(false);

      })
  }, [])

  const [page, setCurentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(7);

  const indexOfLastPage = page * postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  // const currentPage = dataSource2.slice(indexOfFirstPage, indexOfLastPage);

  const onShowSizeChange = (current, pageSize) => {
    setpostPerPage(pageSize);
  }
  const [color, setColor] = useState("green");
  const [margin, setMargin] = useState("");
 

  return (

    <div className="tacking_container">

      {/*---------------navigation---------------*/}

      <Navigation path="/settingss" title="Setting Detail" link='/settingss' past="Settings"></Navigation>

      {/* --------------- tracking header --------------- */} 

      {/* <Header title="Tracking"></Header> */}

      <div className={styles.main_content}>

        {/*---------------- map clone ------------------- */}
        <div className={styles.mapAndSearch}>

          {/* <div className={styles.map} >
            <iframe width="100%" height="100%" id="gmap_canvas" src="https://maps.google.com/maps?q=bole friendship  business &t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
          </div> */}

          {/*---------------- search bar ------------------- */}
          <div className={styles.vehiclesOnMap}>
            <div className={styles.search}>
              <input type="text" id="myInput" onKeyUp={tableSearch} placeholder="Search . . ."></input>
              <button>Search</button>
            </div>

            {/*---------------- table ------------------- */}

            <div className={styles.outer_vehicle_table} id='myTable'>
              <p>{data.name} </p>
              <table className={styles.vehicle_table} id="myTable">
                                            <thead>
                                                <tr>
                                                   <th>ID</th>
                                                    <th> {data.name == 'Avatar and Logo' ? 'Avatar' : 'name'}</th>
                                                    {data.name == 'Avatar and Logo' && <th> Logo </th>}
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {isAvatar ?  <tr className={styles.active_row}>
                                                        <td>{dataSource2.id}</td>
                                                        <td>{dataSource2.avatar}</td>
                                                        <td>{dataSource2.logo}</td>
                                                        <td>
                                                    <p className='notification_actions'>
                                                        <FaEdit title='Edit' className='action_edit' size="1.4rem" color='green'
                                                            onClick={() => {
                                                              //  dleClickEdit21(avatar.avatar, avatar.logo, "Update_Avatar", "Edit Avatar and logo ")
                                                             }}>

                                                            </FaEdit>
                                                    </p>
                                                </td>
                                                        </tr>
                                                        
                                                        :dataSource2.map(item => (
                                                    <tr className={styles.active_row}>
                                                        <td>{item.id}</td>
                                                     { data.name == 'Alert Type' ?  <td>{item.alertType}</td> :
                                                       data.name == 'Roles Type'?  <td>{item.name}</td>:
                                                       data.name == 'Driver Status'?  <td>{item.driverStatus}</td>:
                                                       data.name == 'Notification Preference'?  <td>{item.medium}</td>:
                                                       data.name == 'Vehicle Condition'?  <td>{item.conditionName}</td>:
                                                       data.name == 'Service Needed'?  <td>{item.service}</td>:
                                                       data.name == 'Vehicle Category'?  <td>{item.catagory}</td>:
                                                       data.name == 'Company Type' ?  <td>{item.companyType}</td>:
                                                       data.name == 'Company Sector'?  <td>{item.sectorName}</td>:
                                                       data.name == 'Business Type' || data.name == 'Business Sector'?  <td>{item.businessSectors}</td>:
                                                       data.name == 'Trip type'?  <td>{item.triptypes}</td>:
                                                       data.name == 'Cargo type' ?  <td>{item.cargoType}</td>:
                                                                <td>{item.driverState}</td>}
                                                       
                                                       <td>
                                                    <p className='notification_actions'>
                                                        <FaEdit title='Edit' className='action_edit' size="1.4rem" color='green'
                                                            onClick={() => {
                                                              //  dleClickEdit21(avatar.avatar, avatar.logo, "Update_Avatar", "Edit Avatar and logo ")
                                                             }}>

                                                            </FaEdit>
                                                    </p>
                                                </td>
                                                        
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
              // showQuickJumper
              // showSizeChanger
              // onShowSizeChange={onShowSizeChange}
              />
            </div>

          </div>
        </div>

      </div>
    </div>


  )
}