import React from 'react'
import { FaHome } from 'react-icons/fa';
import styles from './tracking.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SiTripdotcom } from "react-icons/si";
import { SiGoogletagmanager } from "react-icons/si";
import { BiTrip } from "react-icons/bi";
import Header from '../../Header/Header';
import Navigation from '../Navigation/Navigation';
import { Pagination } from 'antd';

export default function () {

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
  const [Loading, setLoading] = useState([])
  const [totalPages, setTotalPage] = useState(1);
  const url2 = "http://64.226.104.50:9090/Api/Admin/All/Vehicles";
  const [dataSource2, setDataSource2] = useState([])
  useEffect(() => {
    setLoading(true);
    fetch(url2, options)
      .then(respnse => respnse.json())
      .then(data => {
        setDataSource2(data.vehiclesINF)
        setTotalPage(data.totalVehicles); 
        setLoading(false);

      })
  }, [])

  const [page, setCurentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(7);

  const indexOfLastPage = page * postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentPage = dataSource2.slice(indexOfFirstPage, indexOfLastPage);

  const onShowSizeChange = (current, pageSize) => {
    setpostPerPage(pageSize);
  }
  const [color, setColor] = useState("green");
  const [margin, setMargin] = useState("");


  return (

    <div className="tacking_container">

      {/*---------------navigation---------------*/}

      <Navigation path="/tracking" title="Tracking"></Navigation>

      {/* --------------- tracking header --------------- */} 

      {/* <Header title="Tracking"></Header> */}

      <div className={styles.main_content}>

        {/*---------------- map clone ------------------- */}
        <div className={styles.mapAndSearch}>

          <div className={styles.map} >
            <iframe width="100%" height="100%" id="gmap_canvas" src="https://maps.google.com/maps?q=bole friendship  business &t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
          </div>

          {/*---------------- search bar ------------------- */}
          <div className={styles.vehiclesOnMap}>
            <div className={styles.search}>
              <input type="text" id="myInput" onKeyUp={tableSearch} placeholder="Search . . ."></input>
              <button>Search</button>
            </div>

            {/*---------------- table ------------------- */}

            <div className={styles.outer_vehicle_table} id='myTable'>
              <p>Total Vehicle</p>

              <table className={styles.vehicle_table} id="myTable">

                <thead>
                  <tr>
                    <th>Assigned Driver</th>
                    <th>Plate Number</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPage.map(item => (
                    <tr className={styles.active_row}>

                      <td>{item.driverName == "null" ? "unassignd" : `${item.driverName}`}</td>
                      <td>{item.plateNumber}</td>
                      <td><Link to={`/vehicle_detail/${item.id}`}><button>Detail</button></Link></td>
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
