import React from 'react'
import { FaHome } from 'react-icons/fa';
import { AiFillCar } from "react-icons/ai";
import { FaRoute } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { AiFillFilter } from "react-icons/ai";
import { FaParking } from "react-icons/fa";
import { GrSettingsOption } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import styles from './total_vehicle.module.css';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AllApiData from '../../../AllApiData';
import Navigation from '../Navigation/Navigation';
import { Pagination } from 'antd';
import SyncLoader from "react-spinners/SyncLoader";


export default function () {

    function tableSearch() {

        let input, filter, table, tr, td, txtValue, errors;

        //Intialising Variables
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");

        for (let i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[4];
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
    const [popup, setPop] = useState(false);
    const handleClickopen = () => {
        setPop(!popup);
    }

    const jwt = JSON.parse(localStorage.getItem('jwt'));// Getting the token from login api
    const ApiData =JSON.parse(localStorage.getItem('ApiData'))
    const options = {
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
    };

    const [Loading, setLoading] = useState([])
    const [totalPages, setTotalPage] = useState(1);
    

  

    
    const url5 = "http://64.226.104.50:9090/Api/Admin/All/Vehicles/Status/PARKED";
    const [parked, setparked] = useState([])
    useEffect(() => {
        setLoading(true);
        fetch(url5, options)
            .then(respnse => respnse.json())
            .then(data => {
                setparked(data.parkedList)
                setTotalPage(data.parkedVehicles);
                setLoading(false);

            })
    }, [])


    const [page, setCurentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(5);

    const indexOfLastPage = page * postPerPage;
    const indexOfFirstPage = indexOfLastPage - postPerPage;
    const currentPage = parked.slice(indexOfFirstPage, indexOfLastPage);

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
            item.companyName.toLowerCase().includes(value.toLowerCase()) ||
            item.vehicleName.toLowerCase().includes(value.toLowerCase()) ||
            item.driverName.toLowerCase().includes(value.toLowerCase()) ||
            item.vehicleCatagory.toLowerCase().includes(value.toLowerCase())||
            item.plateNumber.toString().includes(value)||
            item.status.toLowerCase().includes(value.toLowerCase())
            
          );
        });
    
        setFilteredRows(filteredData);
      };
    const searchResult = searchValue === '' ? currentPage : filteredRows;
    return (

        <div className="vehicle_container">

            {/*---------------navigation---------------*/}
            <AllApiData/>
            <Navigation path="/Total_number_of_vehicle" title="Parked"></Navigation>

            {/* --------------- header --------------- */}

            {/* <Header title="Parked"></Header> */}

            {/* --------------- users --------------- */}

            <div className={styles.main_content}>
                <div className={styles.allcards}>
                    <div className={styles.vehicle}>
                        <Link to="/Total_number_of_vehicle" style={{ textDecoration: 'none' }}>
                            <div className={styles.innerContents}>
                                <h4>Total Vehicle</h4>
                                <div className={styles.icon}>
                                    <p><AiFillCar size="2.2rem"></AiFillCar><b>{ApiData.allvehicles}</b></p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.vehicle}>
                        <Link to="/on_route" style={{ textDecoration: 'none' }}>
                            <div className={styles.innerContents}>
                                <h4>On Route</h4>
                                <p><FaRoute size="2rem" ></FaRoute><b>{ApiData.onRoute}</b></p>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.vehicle}>
                        <Link to="/on_stock" style={{ textDecoration: 'none' }}>
                            <div className={styles.innerContents}>
                                <h4>In Stock</h4>
                                <p><FaParking size="2rem" ></FaParking><b>{ApiData.inStock}</b></p>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.activeCard}>
                        <Link to="/parked" style={{ textDecoration: 'none' }}>
                            <div className={styles.innerContents1}>
                                <h4>Parked</h4>
                                <p><IoSettingsOutline size="2rem" ></IoSettingsOutline><b>{ApiData.parked}</b></p>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.vehicle}>
                        <Link to="/maintenance" style={{ textDecoration: 'none' }}>
                            <div className={styles.innerContents}>
                                <h4>Maintenance</h4>
                                <p><IoSettingsOutline size="2rem" ></IoSettingsOutline><b>{ApiData.Maintaining}</b></p>
                            </div>
                        </Link>
                    </div>

                </div>

                {/* --------------- search --------------- */}

                {Loading ?
                    <p className={styles.loading} >
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
                        <div className={styles.outer_vehicle_table} id='myTable'>

                            <div className={styles.vehicle_search}>
                                <p title='search'>
                                    <BsSearch className={styles.icn} size="1.5rem" color='rgb(63, 63, 63)'></BsSearch>
                                    <input type="text" id="myInput" value={searchValue} onChange={handleSearch}  placeholder="Search"></input>
                                    <button>Search</button>
                                </p>
                            </div>
                            <p>PARKED</p>

                            <table className={styles.vehicle_table} id="myTable">

                                <thead>
                                    <tr>
                                        <th>Vehicle Owner</th>
                                        <th>Vehicle Name</th>
                                        <th>Assigned Driver</th>
                                        <th>Vehicle Type</th>
                                        <th>Plate Number</th>
                                        <th>Status</th>
                                        <th>Detail</th>
                                        <th>Tracking</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {searchResult.map(item => (
                                        <tr className={styles.active_row}>
                                            <td>{item.companyName}</td>
                                            <td>{item.vehicleName}</td>
                                            <td>{item.driverName == "null" ? "unassignd" : `${item.driverName}`}</td>
                                            <td>{item.vehicleCatagory}</td>
                                            <td>{item.plateNumber}</td>
                                            <td>{item.status}</td>
                                            <td><Link to={`/vehicle_detail/${item.id}`}><button>Detail</button></Link></td>
                                            <td><Link to="/tracking"><button>Tracking</button></Link></td>
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

            </div>

        </div >
    )
}
