import React from 'react'
import { FaHome } from 'react-icons/fa';
import { AiFillCar } from "react-icons/ai";
import { FaRoute } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { AiFillFilter } from "react-icons/ai";
import { FaParking } from "react-icons/fa";
import { GrSettingsOption } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import styles from './mangeProfile.module.css';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import swal from "sweetalert";
import Navigation from '../Navigation/Navigation';
import { Pagination } from 'antd';
import SyncLoader from "react-spinners/SyncLoader";
import { useForm } from 'react-hook-form';



export default function () {

    function tableSearch() {

        let input, filter, table, tr, td, txtValue, errors;

        //Intialising Variables
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");

        for (let i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[2];
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
    const [error, setError] = useState(false);
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
    const user = JSON.parse(localStorage.getItem('user'))
    const options = {

        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        },

    };
    const phone = "0927272727";
    console.log(phone)

    const [totalPages, setTotalPage] = useState(1);
    const [dataSource, setDataSource] = useState([])
    const [Loading, setLoading] = useState([])
    const url = `http://64.226.104.50:9090/Api/Admin/All/VehicleOwners/${phone}`;
    useEffect(() => {
        setLoading(true)
        fetch(url, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource(data)
                // setTotalPage(data.totalPages)
                setLoading(false)
            })
    }, [])

    const url2 = "http://64.226.104.50:9090/Api/Admin/All/VehicleOwners/";
    const [dataSource2, setDataSource2] = useState([])
    useEffect(() => {
        setLoading(true);
        fetch(url2, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource2(data && data.vehicleOwnerINF)
                setTotalPage(data ? data.vehicleOwnerINF.length : 0);
                setLoading(false);

            })
    }, [])

    const [page, setCurentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(5);
    const indexOfLastPage = page * postPerPage;
    const indexOfFirstPage = indexOfLastPage - postPerPage;
    const currentPage = dataSource2 && dataSource2.slice(indexOfFirstPage, indexOfLastPage);
    // const currentPage2 = dataSource3.slice(indexOfFirstPage, indexOfLastPage);

    const onShowSizeChange = (current, pageSize) => {
        setpostPerPage(pageSize);
    }
    const [color, setColor] = useState("green");
    const [margin, setMargin] = useState("");

/******************************Generate pin********************* */

    async function handleChange(phoneNumber) {
        let item =
        {
            phoneNumber,
        };
        console.log(item)
        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 
            "Accept": "application/json"},
            body: JSON.stringify(item),
        };
        const url = "http://64.226.104.50:9090/Api/User/GeneratePIN";
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
            const  mess = localStorage.getItem("message");
            if (response.ok) {
                console.log(mess)
                swal("Get your Pin beffore it's to late ", `${mess}`, "success", { buttons: false, timer: 5000, });
                
            } else {
                console.log("failed");
                swal(`Failed To Register ${mess}`, "error");
            }
        } catch (error) {
            console.error(error);
        }
    }
    /********cargo owners***** */
    const urlCargo = "http://64.226.104.50:9090/Api/Admin/All/CargoOwners";
    const [cargo,setCargo]= useState('')
    useEffect(() => {
        fetch(urlCargo, options)
            .then(respnse => respnse.json())
            .then(data => {
                setCargo(data.cargoOwners)
             
            })
    }, [])


    /****************Enable and disable user********** */
    const enableDisable = async (enable) => {
        console.log('Im on submit function');
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
           
        };
        const url =`http://64.226.104.50:9090/Api/User/disable/${enable}`; 
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            localStorage.setItem("message", JSON.stringify(result["message"])); 
            const mess = localStorage.getItem("message");
            console.log(mess);
            if (response.ok) {
                swal("Successfully", `${mess}`, "success", {
                    button: true,
                    timer: 60000,
                });
            } else {
                console.log("failed");
                swal(`Failed To ${mess}`, "Error", "error");
            }
        } catch (error) {
            console.error(error);
        }
    }
/************handle popup********* */
const handlePoup = () => {
    setPop(!popup);
}
const closePopup5 = () => {
    setPop(false);
}

/************handleConfirm************ */
const [username, setusername] = useState(user.username);
const [pin, setpin]= useState("")
const [newpassword, setnewpassword] =useState("")
const [confirmPassword, setconfirmpassword]= useState("")
const {
    
    handleSubmit,
    formState: { errors },
} = useForm();
const onSubmit = (data) => {
    console.log(data);
    handleConfirm();
};
async function handleConfirm() {

    let item = { 
                newpassword,
               confirmPassword,
               username,
               pin
             }
                 console.log(item)
     const options = {
         method: "POST",
         headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer`, },
         body: JSON.stringify(item),
     };
     const url = "http://64.226.104.50:9090/Api/User/SetPin";
     try {
         const response = await fetch(url, options);
         const result = await response.json();
         localStorage.setItem("message", JSON.stringify(result["message"]));
       const  mess = localStorage.getItem("message");
       console.log(mess)
         if (response.ok) {
             console.log(mess)
             swal("Successful",`${mess}`, "success", { buttons: false, timer: 2000, })
         } else {
            swal(`Failed To Change ${mess}`, "Error", "error");
         }
     } catch (error) {
         console.log(error + "error");
         console.error(error)
         // window.location.href = "/dashboard"; 
     }
 }
    console.log(currentPage)
    const allusers = [...currentPage, ...cargo ]
    console.log(allusers)
    return (

        <div className="vehicle_container">

            {/*---------------navigation---------------*/}

            <Navigation path="/Manage_profile" title="Manage Profile"></Navigation>


            {/* --------------- users --------------- */}
            <div className='main_content'>
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
                            <p>Super Admin</p>

                            <table className={styles.vehicle_table} id="myTable">
                                <thead>
                                    <tr>
                                        <th>Phone</th>
                                        <th>Role</th>
                                        <th>Profile</th>
                                        <th>Change Password</th>
                                        <th>Confirm password</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className={styles.active_row}>
                                        <td>{user.username}</td>
                                        <td>{user.role}</td>
                                        <td><Link to='#'>
                                            <button>Detail</button></Link></td>
                                        <td><Link style={{ textDecoration: 'none' }} to="#">
                                            <lable className={styles.mangProfileButton} onClick={() => { handleChange(user.username) }}>
                                                Change Password</lable></Link></td>
                                        <td><button onClick={() => {
                                                    handlePoup()
                                                   }}>Confirm</button></td>
                                    </tr>

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
                    {popup ?
                                        <div>
                                            <div className={styles.popup}>
                                                <div className={styles.popupInner}>
                                                    <div className={styles.ewq}>
                                                        <button className={styles.closeBtn} onClick={closePopup5}>X</button>
                                                        <div>
                                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                                <div className={styles.assignetDiver}>
                                                                    <lable className={styles.lable}>New Password</lable>
                                                                    <label>Pin</label>
                                                                    <input type="text" placeholder="PIN" onChange={e => setpin(e.target.value)} name="pin"></input>
                                                                    {error && pin.length <= 0 ? <span className={styles.validateText}>please enter your password</span> : ""}
                                                                    <label>New Password</label>
                                                                    <input type="password" placeholder="Password" onChange={e =>setnewpassword(e.target.value)} name="newpassword"></input>
                                                                    {error && newpassword.length <= 0 ? <span className={styles.validateText}>please enter your password</span> : ""}
                                                                    <label>Confirm Password</label>
                                                                    <input type="password" placeholder="Confirm Password" onChange={e => setconfirmpassword(e.target.value)} name='confirmpassword'></input>
                                                                    {error && confirmPassword !== newpassword ? <span className={styles.validateText}>Your password is not identical</span> : ""}
                                                                    <button >Confirm</button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div> : ""}

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
                                    <input type="text" id="myInput" onKeyUp={tableSearch} placeholder="Search"></input>
                                    <button>Search</button>
                                </p>
                            </div>
                            
                            <p>Total Vehicle Owner</p>

                            <table className={styles.vehicle_table} id="myTable">
                                <thead>
                                    <tr>
                                        <th>Full Name</th>
                                        <th>Role</th>
                                        {/* <th>Assign Role</th> */}
                                        <th>Profile</th>
                                        <th>Change Password</th>
                                        <th>Account</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPage.map(item => (
                                       <tr className={styles.active_row} key={item.id}>
                                            <td>{item.roles == "OWNER" ? `${item.companyName}` : `${item.firstName}` + " " + `${item.lastName}`}</td>
                                            <td>{item.roles}</td>
                                            {/* <td><Link style={{ textDecoration: 'none' }} to={`/user_edit/${item.role}/${item.id}/${item.companyId}`}>
                                                <button className={styles.mangProfileButton}>Assign</button></Link></td> */}
                                            <td><Link style={{ textDecoration: 'none' }} to={`/user_edit/${item.roles}/${item.id}/${item.companyId}`}>
                                                <button className={styles.mangProfileButton}>Detail</button></Link></td>
                                            <td><Link style={{ textDecoration: 'none' }} to="#">
                                                <lable className={styles.mangProfileButton} onClick={() => {handleChange(item.phoneNumber)  }}>Change Password</lable></Link></td>
                                            <td><Link style={{ textDecoration: 'none' }} to="#"><lable className={styles.DeleteProfileButton} 
                                            onClick={() => {enableDisable(item.id)}} style={{background: item.enabled == false ?'green':'red'}} >{item.enabled ==false ? 'Enable' : 'Disable'}</lable></Link></td>

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

        </div>

    )
}
