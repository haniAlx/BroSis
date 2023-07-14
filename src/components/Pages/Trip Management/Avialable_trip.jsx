import React from 'react'
// import './available.css';
import styles from './available.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SiTripdotcom } from "react-icons/si";
import { useForm } from 'react-hook-form';
import Header from '../../Header/Header';
import Navigation from '../Navigation/Navigation';
import { total } from './data/data';
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { BsPlusLg } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import SyncLoader from "react-spinners/SyncLoader";
import { Pagination } from 'antd';
import { BsSearch } from "react-icons/bs";
import Table from './Table';
import { ToggleContext } from "./Toggle"

export default function () {

    function tableSearch() {

        let input, filter, table, tr, td, txtValue, errors;

        //Intialising Variables for search bar
        input = document.getElementById("myInputs");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTables");
        tr = table.getElementsByTagName("trs");

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

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };

    const jwt = JSON.parse(localStorage.getItem('jwt'));// Getting the token from login api
    const options = {

        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
    };

    // const urlFour = "http://64.226.104.50:9090/Api/SignIn/Admin";
    // const [dataSource4, setDataSource4] = useState([])
    // useEffect(() => {
    //     fetch(urlFour, options)
    //         .then(respnse => respnse.json())
    //         .then(data => {
    //             setDataSource4(data)
    //             console.log(dataSource4)
    //         })
    // }, [])

    const [popup, setPop] = useState(false);
    const [state, setState] = useState("");
    const handleClickopen = () => {
        setPop(!popup);
    }


    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const [id, setId] = useState("");
    const [role, setRole] = useState("");

    const [visiblelist, setvisiblelist] = useState(false);
    const [visible, setVisible] = useState(false);

    // let url2;

   
    const setVisible2 = () => {
        console.log(role)
        setVisible(!visible);
    }
/***************************Toggle****************** */
// const {on, toggle} = React.useContext(ToggleContext)
const displaylist = () => {
    // toggle()
}
    const [dataSource, setDataSource] = useState([])
    // const [Loading, setLoading] = useState([])
    const url = "http://64.226.104.50:9090/Api/Admin/All/VehicleOwners";
    useEffect(() => {
        setLoading(true)
        fetch(url, options)
            .then(respnse => respnse.json())
            .then(data => {
                const modifiedData = data.vehicleOwnerINF.map(old => ({ ...old, on: false }));
                console.log(modifiedData)
                setDataSource(modifiedData)
                console.log(dataSource)
                setLoading(false)
            })
    }, [])
    
    const handleData = (id) =>{
        setDataSource(old => old.map(prev =>({ ...prev, on: prev.id == id && !prev.on })))
    }
    const [page, setCurentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(5);
    const indexOfLastPage = page * postPerPage;
    const indexOfFirstPage = indexOfLastPage - postPerPage;
    // const currentPage = dataSource2.slice(indexOfFirstPage, indexOfLastPage);

    const onShowSizeChange = (current, pageSize) => {
        setpostPerPage(pageSize);
    }
    let [active, setActive] = useState("");
    const [color, setColor] = useState("green");
    const [margin, setMargin] = useState("");

    return (

        <div className="">

            {/*---------------navigation---------------*/} 

            <Navigation path="/avialable_trip" title="Avialable Trip"></Navigation>


            <section className={styles.main_content}>

                <div className={styles.tripHeader}>
                    <Link style={{ textDecoration: 'none' }} to="/avialable_trip"><p><h1 className={styles.avaliableVehicles}>Avialable Vehicles</h1></p></Link>
                    <Link style={{ textDecoration: 'none' }} to="/trip_history"><p><h1>Vehicles History</h1></p></Link>
                </div>

                <form className='form' onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.allDiv}>
                        <div>
                            <div className={styles.vehicle_search}>
                                <p title='search'>
                                    <BsSearch className={styles.icn} size="1.5rem" color='rgb(63, 63, 63)'></BsSearch>
                                    <input type="text" id="myInputa" placeholder="Search"></input>
                                    <button>Search</button>
                                </p>
                            </div>
                            <h1 className={styles.greentrip}>List Of Owners</h1>
                            {

                                loading ?
                                    <p className={styles.loading} >
                                        <SyncLoader
                                            color={color}
                                            loading={loading}
                                            size={10}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        /></p>
                                    :
                                    <>
                                        {
                                            dataSource.map(item => ( 
                                                <>
                                                    <div className={styles.companyList}
                                                        onClick={()=>handleData(item.id)}
                                                        key={item.id}
                                                         >
                                                        <p>Company Name : <b className='green'>{item.roles == "OWNER" ? `${item.companyName}` : `${item.firstName}`}</b></p>
                                                        <label>Available Vehicle : <b className='green'>{item.totalVehicles}</b></label>
                                                        <p className={styles.dropdownVehicle}>{item.on ? <AiOutlineMinus top="10px" size="1rem" color='White' onChange={displaylist}></AiOutlineMinus> :
                                                            <BsPlusLg size="1rem" color='White'></BsPlusLg>}</p>
                                                    </div>
                                                    {item.on && <Table style={{ transition: "0.5s" }} role={item.roles} id={item.id} 
                                                    name={item.role == "OWNER" ? `${item.companyName}` : `${item.firstName}` + " " + `${item.lastName}`} from={"availavleCars"} />}

                                                </>
                                            ))
                                        }
                                    </>
                            }

                        </div>

                    </div>
                </form>
            </section>


            {/* ---------------end contents--------------- */}


        </div>

    )
}
