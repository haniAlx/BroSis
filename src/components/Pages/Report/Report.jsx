import React from 'react'
import { FaHome } from 'react-icons/fa';
import { AiFillCar } from "react-icons/ai";
import { FaRoute } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { AiFillFilter } from "react-icons/ai";
import { FaParking } from "react-icons/fa";
import { GrSettingsOption } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
// import './total_no_of_vehicle.css';
import './Report.css';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { total } from './data/jsonData';
import { on_route } from './data/jsonData';
import { parked } from './data/jsonData';
import { maintenance } from './data/jsonData';
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

    let [active, setActive] = useState("total_vehicle");
    let [state, setState] = useState("false");
    // const color = () => {
    //     setState(state);
    // }
    const [popup, setPop] = useState(false);
    const handleClickopen = () => {
        setPop(!popup);
    }

    const jwt = JSON.parse(localStorage.getItem('jwt'));// Getting the token from login api

    const options = {

        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
    };

    const url = "http://64.226.104.50:9090/Api/Admin/All/Vehicles/Status/ONROUTE";

    const [dataSource, setDataSource] = useState([])
    const [Loading, setLoading] = useState([])
    useEffect(() => {
        setLoading(true);
        fetch(url, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource(data.inRoutelist)
                console.log(dataSource)
                setLoading(false);

            })
    }, [])

    const url2 = "http://64.226.104.50:9090/Api/Admin/All/Vehicles";

    const [dataSource2, setDataSource2] = useState([])
    useEffect(() => {
        setLoading(true);
        fetch(url2, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource2(data.vehiclesINF)
                console.log(dataSource2)
                setLoading(false);

            })
    }, [])

    const [list, setList] = useState(dataSource2);
    const [total, setTotal] = useState(dataSource2.length);
    const [page, setCurentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(10);
  
    const onShowSizeChange = (current, pageSize) => {
      setpostPerPage(pageSize);
    }
  
    useEffect(() => {
      setTotal([dataSource2.length])
    }, []);

    const indexOfLastPage = page + postPerPage;
    const indexOfFirstPage = indexOfLastPage - postPerPage;
    const currentPage = dataSource2.slice(indexOfFirstPage, indexOfLastPage);
  

    return (

        <div className="vehicle_container">

            {/*---------------navigation---------------*/}

            <Navigation path="/report" title="Total Vehicles"></Navigation>


            {/* --------------- users --------------- */}

            <div className='main_content'>

            <div className='outer_vehicle_tables' id='myTable'>
        <p>Total Vehicle</p>

        <table class="vehicle_table" id="myTable">

          <thead>
            <tr>
              <th>Profile</th>
              <th>Assigned Driver</th>
              <th>Vehicle ID</th>
              <th>Vehicle Type</th>
              <th>Plate Number</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {currentPage.map(item => (
              <tr className='active_row'>

                <td>{item.vehicleName}</td>
                <td>{item.driver}</td>
                <td>{item.id}</td>
                <td>{item.vehicleCatagory.catagory}</td>
                <td>{item.plateNumber}</td>
                <td><Link to={`/report_detail/${item.id}`}><button>Report</button></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='page'>
        <Pagination
          onChange={(page) => setCurentPage(page)}
          pageSize={postPerPage}
          current={page}
          total={total}
          showQuickJumper
          showSizeChanger
          onShowSizeChange={onShowSizeChange}

        />
      </div>

            </div>
        </div >
    )
}
