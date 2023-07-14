import React from 'react'
import { FaHome } from 'react-icons/fa';
import styles from './markating.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SiTripdotcom } from "react-icons/si";
import { SiGoogletagmanager } from "react-icons/si";
import { BiTrip } from "react-icons/bi";
import Header from '../../Header/Header';
import Navigation from '../Navigation/Navigation';
import { Pagination } from 'antd';

export default function FinishedWorks () {

 
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
  const url2 = "http://64.226.104.50:9090/Api/Admin/All/CargosBy/FINISHED";
  const [dataSource2, setDataSource2] = useState([])
  useEffect(() => {
    setLoading(true);
    fetch(url2, options)
      .then(respnse => respnse.json())
      .then(data => {
        setDataSource2(data.cargos)
        setTotalPage(data.cargos); 
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

  const [filteredRows, setFilteredRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');


  const handleSearch = (e) => {
      const value = e.target.value;
      setSearchValue(value);
   
      const filteredData = currentPage.filter((item) => {
        // Customize the conditions as per your search requirements
        return (
          item.cargoOwner.toLowerCase().includes(value.toLowerCase()) ||
          item.packaging.toLowerCase().includes(value.toLowerCase()) ||
          item.weight.toString().toLowerCase().includes(value.toLowerCase())||
          item.status.toLowerCase().includes(value.toLowerCase())
          
        );
      });
  
      setFilteredRows(filteredData);
    };
  const searchResult = searchValue === '' ? currentPage : filteredRows;



  return (
    <>


    <div className="company_container">

{/*--------------- Company Container ---------------*/}
<Navigation path="/marketing" title="marketing"></Navigation>

{/* --------------- Registration- -------------- */}

<section className={styles.main_content}>

    <div className={styles.company_individual_header}>
        <p ><Link style={{ textDecoration: 'none' }} to="/marketing"><h1 >Available Works</h1></Link></p>
        <p><Link style={{ textDecoration: 'none' }} to="#"><h1 className={styles.companyHeader}>FINISHED WORKS</h1></Link></p>
    </div>
    <div className={styles.allDiv}>

    <div className={styles.search}>
            
            
            
              <input type="text" id="myInput" onChange={handleSearch}  placeholder="Search . . ."></input>
              <button>Search</button>
           
            </div>

            {/*---------------- table ------------------- */}

            <div className={styles.outer_vehicle_table} id='myTable'>
              <p>Available  markate</p>
              <table className={styles.vehicle_table} id="myTable">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>packaging</th>
                                                    <th>weight</th>
                                                    <th>Trip From To</th>
                                                    <th>Status</th>
                                                    <th>Detail</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {searchResult.map(item => (
                                                    <tr className={styles.active_row} key = {item.id}>
                                                        <td>{item.cargoOwner}</td>
                                                        <td>{item.packaging}</td>
                                                        <td>{item.weight}</td>
                                                        <td>{item.pickUp +' => '+ item.dropOff }</td>
                                                        <td>{item.status}</td>
                                                        <td><Link to={`/FinishedMarketDetail/${item.id}`}><button>Detail</button></Link></td>
                                                       
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
                total={totalPages && totalPages.length}
              showQuickJumper
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              />
            </div>

          </div>
    
    </section>
  </div>

</>
  )
}
