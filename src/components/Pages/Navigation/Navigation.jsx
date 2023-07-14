import React, { useState, useEffect } from 'react'
import { FaHome } from 'react-icons/fa';
import { AiFillCar } from "react-icons/ai";
import { RiGpsFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { HiBellAlert } from "react-icons/hi2";
import { HiDocumentReport } from "react-icons/hi";
import { FaRegIdCard } from 'react-icons/fa';
import { BsFillChatDotsFill, BsFillBriefcaseFill  } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { BiTrip } from "react-icons/bi";
import { ImUserTie } from "react-icons/im";
import { Link, useLocation } from 'react-router-dom'; 
import { IoMdArrowDropdownCircle } from "react-icons/io"; 
import { IoMdArrowDropupCircle } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import swal from "sweetalert";
import Swal from 'sweetalert2'
import 'animate.css';
import "./header.css"
import './navigation.css';

export default function Navigation({ path, title, link, past }) {

    const [popup, setPop] = useState(false);
    const handleClickopen = () => {
        setPop(!popup);
    }

    const location = useLocation();

    const getColor = () => {
        return '#00cc44'
    }
    const getColor2 = () => {
        return 'white'
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const roles = user.role;
    const username = user.username;
    const id = user.id;
    const toggle = () => {

        Swal.fire({
            position: 'top-end',
            html: `<p><img class="popImg" src="https://unsplash.it/400/200"></p>
                   <p style="color: #f09053; "">ID  : ${id}</p>
                   <p style="color: #f09053; ""> ${roles}</p>
                   <p style="color: #f09053; padding-bottom: 5px;"">${username}</p>`,
            showConfirmButton: false, 
            showDenyButton: true,
            width: "300px",
            denyButtonText: 'Logout',
            imageClass: 'img-responsive',
            imageAlt: 'Custom image',
        }).then((result) => {
            if (result.isDenied) {
                handleClickopen2()
            }
        })
    };

    const [logout, setLogout] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("jwt")) { 
            window.location.href = "/";
        }
    }, [])

    const [popup2, setPop2] = useState(false);
    const handleClickopen2 = () => {
        Swal.fire({
            text: "Are you sure You Want to Logout",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00cc44',
            cancelButtonColor: '#d33', 
            confirmButtonText: 'Ok!',  
            showCloseButton: true, 
            showClass: {
                popup: 'animate__animated animate__shakeX'
            },

        }).then((result) => { 
            if (result.isConfirmed) { 
                remove()
            }
        })
    }
    const [popup3, setPop3] = useState(false);
    const handleClickopen3 = () => {
        setPop3(!popup3);
        setLogout(false);
        setState(false);
    }
    const remove = () => { 
        localStorage.removeItem("jwt"); 
        window.location.href = "/";
    }
    const [state, setState] = useState(false);
    const [action, setAction] = useState(true);

    const [toggles, setToggle] = useState("All_navigation");
    const showMenu = () => {
        setToggle("All_navigation active");
        setAction(!action)
    }
    const hideMenu = () => {
        setToggle("All_navigation");
        setAction(!action)
    }

    const jwt = JSON.parse(localStorage.getItem('jwt'));// Getting the token from login api
    const options = {

        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
    };

    const url3 = "http://64.226.104.50:9090/Api/Admin/Alerts/OFFROAD";
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        fetch(url3, options) 
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource(data.activeAlerts)
            })
    }, [])

    const [dataSource2, setDataSource2] = useState([])
    const url2 = "http://64.226.104.50:9090/Api/Message/All";
    useEffect(() => {
        fetch(url2, options)
            .then(respnse => respnse.json())
            .then(data => {
                setDataSource2(data.messages)
            })
    }, [])

    return (
        <>
            <div>
                <div className={toggles}>
                    <ul>
                        <li>
                            <Link to="/dashboard" style={path == "/dashboard" ? { color: getColor() } : { color: getColor2() }}>
                                <p className="hovertext" data-hover="Home"><FaHome size="1.8rem" ></FaHome></p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Total_number_of_vehicle" style={path == "/Total_number_of_vehicle" ? { color: getColor() } : { color: getColor2(path) }}>
                                <p className="hovertext" data-hover="Vehicle"><AiFillCar size="1.8rem"></AiFillCar></p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Total_Drivers" style={path == "/Total_Drivers" ? { color: getColor() } : { color: getColor2() }}>
                                <p className="hovertext" data-hover="Driver"><ImUserTie size="1.8rem"></ImUserTie></p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/marketing" style={path == "/marketing" ? { color: getColor() } : { color: getColor2() }}>
                                <p className="hovertext" data-hover="Market"><BsFillBriefcaseFill size="1.8rem"></BsFillBriefcaseFill></p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/tracking" style={path == "/tracking" ? { color: getColor() } : { color: getColor2() }}>
                                <p className="hovertext" data-hover="Tracking"><RiGpsFill size="1.8rem" ></RiGpsFill></p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/avialable_trip" style={path == "/avialable_trip" ? { color: getColor() } : { color: getColor2() }}>
                                <p onClick={handleClickopen} className="hovertext" data-hover="Trip Management"><BiTrip size="1.8rem" ></BiTrip></p>
                            </Link>

                        </li>
                        <li>
                            <Link to="/users" style={path == "/users" ? { color: getColor() } : { color: getColor2() }}>
                                <p className="hovertext" data-hover="Users"><FaUsers size="1.8rem" ></FaUsers></p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Company_registration" style={path == "/Company_registration" ? { color: getColor() } : { color: getColor2() }}>
                                <p className="hovertext" data-hover="Registration"><FaRegIdCard size="1.7rem" ></FaRegIdCard></p>
                            </Link>
                            {/* <Link to="/individual"  style={{ color: getColor('/individual') }}><p>gg</p></Link> */}
                        </li>
                        <li>
                            <Link to="/accident" style={path == "/accident" ? { color: getColor() } : { color: getColor2() }}>
                                <p className="hovertext" data-hover="Alert"><HiBellAlert size="1.8rem" ></HiBellAlert></p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/report" style={path == "/report" ? { color: getColor() } : { color: getColor2() }}>
                                <p className="hovertext" data-hover="Report"><HiDocumentReport size="1.8rem" ></HiDocumentReport>
                                </p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/message_overview" style={path == "/message_overview" ? { color: getColor() } : { color: getColor2() }}>
                                <p className="hovertext" data-hover="Communication"><BsFillChatDotsFill size="1.6rem" ></BsFillChatDotsFill></p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Manage_profile" style={path == "/Manage_profile" ? { color: getColor() } : { color: getColor2() }}>
                                <p className="hovertext" data-hover="Manage profile"><FaUserAlt size="1.7rem"></FaUserAlt></p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings" style={path == "/settings" ? { color: getColor() } : { color: getColor2() }}>
                                <p className="hovertext" data-hover="Setting"><AiFillSetting size="1.8rem" ></AiFillSetting></p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/settingss" style={path == "/settingss" ? { color: getColor() } : { color: getColor2() }}>
                                <p className="hovertext" data-hover="Setting"><AiFillSetting size="1.8rem" ></AiFillSetting></p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div>

                {/* ----------------- all content ------------------- */}

                <div className="dashboard_headers"> 

                    <div className='headerTitle'>
                        <h2>Bazra Motors /</h2>
                        { past && <h5><Link to={link}  className='headerLink'>{past}/</Link></h5>}
                        <h5>{title}</h5>
                    </div>
                    <div className='headercontents'>
                        <div className='headerIcon'>
                            <p className='makeGrid'><p><HiBellAlert size="2.2rem" color='red' ></HiBellAlert></p><p className='count' style={{color:"red"}}>{dataSource && dataSource.length}</p></p>
                            <p className='makeGrid'><BsFillChatDotsFill size="1.9rem" color='green' ></BsFillChatDotsFill><p className='count' style={{color:"green"}}>{dataSource2 && dataSource2.length}</p></p>
                        </div>

                    </div>
                    <div className='dashbordProfile'>
                        <p className='displayUser'><FaUserAlt className='FaUserAlt' size="1.6rem" color='green'></FaUserAlt></p>
                        <p className='displayUser role'>{user.role}</p>
                        <p onClick={() => { toggle() }}><IoMdArrowDropdownCircle size="1.2rem" color='green'></IoMdArrowDropdownCircle></p>
                    </div>
                    <p className='toggle'>
                        <label onClick={action ? showMenu : hideMenu}><BsThreeDotsVertical className='FaUserAlt' size="1.6rem" color='green'></BsThreeDotsVertical></label>
                        <label onClick={() => { toggle() }}>{state ? <FaUserAlt size="1.2rem" color='green'></FaUserAlt> : <FaUserAlt size="1.2rem" color='green'></FaUserAlt>}</label>
                    </p>

                </div>

            </div>
        </>

    )
}