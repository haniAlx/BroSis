import React, { useState, useRef } from 'react'
import './Report_detail.css';
import { Link, useParams } from 'react-router-dom';
import { Report_Data } from "./data/jsonData";
import Navigation from '../Navigation/Navigation';
import DonutChart from "./donutChart"
import ChartLine from "./lineChart";
import Header from '../../Header/Header';
import { useReactToPrint } from 'react-to-print';
import swal from "sweetalert";
import ReactHTMLTableToExcel from 'react-html-table-to-excel'; 
import { Pagination } from 'antd';
import { useEffect } from 'react'; 
import { CSVLink, CSVDownload } from "react-csv"; 

export default function () {

    {/*-------------- For the popup message part  ----------------*/ }

    const [popup, setPop] = useState(false);
    const [popup1, setPop1] = useState(false);

    const handleClickopen = () => {
        setPop({ popup: false });
    }
    const handleClickopen1 = () => {
        setPop1(!popup1);
    }

    const closePopup = () => {
        setPop(false);
        setPop1(false);
    }
    const closePopup1 = () => {
        setPop1(false);
    }

    const [Avarage_speed, setAvargeSpeed] = useState("");

    const AvargeSpeed = (average_speed) => {
        Report_Data.map(item => {
            return setAvargeSpeed(`${average_speed}`)
        })
    }
    const [search, setSearch] = useState('');

    const { id, platenumber } = useParams();

    const pageStyle = `{ width:"10%" }`;

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Bazra Report',
        onafterprint: () => swal("Successful", `Printed Sucessfully`, "success", { button: true, }),
    });

    const jwt = JSON.parse(localStorage.getItem('jwt'));// Getting the token from login api

    const options = {

        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        },

    };
    const [totalPages, setTotalPage] = useState(1);
    const [Loading, setLoading] = useState([])
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
    const [postPerPage, setpostPerPage] = useState(5);
    const indexOfLastPage = page * postPerPage;
    const indexOfFirstPage = indexOfLastPage - postPerPage;
    const currentPage = dataSource2.slice(indexOfFirstPage, indexOfLastPage);

    const onShowSizeChange = (current, pageSize) => {
        setpostPerPage(pageSize);
    }

    return (
        <div className="dashboard_container">

            {/*---------------navigation---------------*/}

            <Navigation path="/report" title="Report Detail"></Navigation>

            <div className='main_content77'>

                <div className="Report-main">
                    <div className="vehicle-detail">
                        <div className="vehicle-name">
                            <table class="table-report">
                                <tbody>
                                    <tr>
                                        <td><b>Vehicle Name</b></td>
                                        <td>{id}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="plate-number">
                            <table class="table-report">
                                <tbody>
                                    <tr>
                                        <td><b>Plate Number</b></td>
                                        <td>{platenumber}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* <div className="row-two">
                        <div className="report-status">
                            <table class="table-report-status" >
                                <tbody>
                                    <tr>
                                        <td><b>Current Status</b></td>
                                        <td className='colors-report'><b>On route</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div> */}

                    <div className='outer_vehicle_table' ref={componentRef}>

                        <div className='report-date'>
                            <p><input onChange={(e) => {
                                setSearch(e.target.value)
                                // nandu()

                            }} type="date" placeholder='Select date'></input></p>
                        </div>
                        <p>Trip History</p>

                        {/* <table class="vehicle_table" id="table-to-xls">
                            <thead>
                                <tr>
                                    <th>Trip</th>
                                    <th>Total Travel Time</th>
                                    <th>Average Speed</th>
                                    <th>Start Date/Time</th>
                                    <th>End Date/Time</th>
                                    <th>Detail</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    currentPage
                                        .filter((item) => {
                                            return search.toLowerCase() === ''? item: item.start_date.toLowerCase().includes(search);})
                                        .map(item => {
                                            return <tr className='active_row'>
                                                <td>{item.trip}</td>
                                                <td>{item.total_travel_time}</td>
                                                <td>{item.average_speed}</td>
                                                <td>{item.start_date}</td>
                                                <td>{item.end_date}</td>
                                                <td>
                                                    <h4 className='notification_actions0'>
                                                        <button onClick={() => {
                                                            handleClickopen()
                                                            AvargeSpeed(item.average_speed)
                                                        }}>Detail</button>

                                                    </h4>
                                                </td>
                                            </tr>

                                        })
                                }
                            </tbody>
                        </table> */}

                        <table className="vehicle_table" id="table-to-xls">

                            <thead>
                                <tr>
                                    <th>Vehicle Owner</th>
                                    <th>Vehicle Name</th>
                                    <th>Assigned Driver</th>
                                    <th>Plate Number</th>
                                    <th>Status</th>
                                    <th>Detail</th>
                                    <th>Tracking</th>
                                    <th>Assign Driver</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentPage.map(item => ( 
                                    <tr className="active_row">
                                        <td>{item.companyName}</td>
                                        <td>{item.vehicleName}</td>
                                        <td>{item.driverName == "null" ? "unassignd" : `${item.driverName}`}</td>
                                        <td>{item.plateNumber}</td>
                                        <td>{item.status}</td>
                                        <td><Link to={`/vehicle_detail/${item.id}`}><button>Detail</button></Link></td>
                                        <td><Link to="/tracking"><button>Tracking</button></Link></td>
                                        <td><Link to={`/AssignDriver/${item.plateNumber}`}><button>Assaign</button></Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="page">
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
                    <div className='page22'>
                        <button className='print' onClick={handleClickopen1}>Export</button>
                    </div>


                    {popup ?
                        <div ref={componentRef} style={{ width: "100%", height: window.innerHeight }}>
                            <div className='popup'>
                                <div className='popup-inner0'>
                                    <button className='close-btn' onClick={closePopup}>X</button>
                                    <div className='startEndPoint'>
                                        <p>Addis Ababa To Jimma</p>
                                        <p>Addis Ababa To Jimma</p>
                                        <p>Addis Ababa To Jimma</p>
                                    </div>
                                    <div className='chart-donat'>
                                        <div className='travelTime'>
                                            <DonutChart />
                                        </div>
                                        <div className='speedHistory'>
                                            Average Speed : <b className='green'>{Avarage_speed}/hr</b>
                                            <ChartLine></ChartLine>
                                        </div>
                                        <button className='print2' onClick={handleClickopen1}>print</button>
                                    </div>

                                </div>
                            </div>
                        </div> : ""}

                    {popup1 ?
                        <div>
                            <div className='popup3'>
                                <div className='popup-innerr'>
                                    <button className='close-btn' onClick={closePopup}>X</button>
                                    <div className='pdfandexcelouter'>
                                        <div className='selectAction'>Select the Action You Want</div>
                                        <div className='pdfandexcel'>
                                            <button onClick={() => {
                                                handlePrint();
                                                handleClickopen1();
                                            }}>Print or Save As PDF</button> 
                                            {/* <CSVLink data={dataSource2}>Download me</CSVLink> */}
                                            <button onClick={closePopup}><CSVLink style={{textDecoration:"none", color:"white"}} data={dataSource2}>Download me</CSVLink></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : ""}

                </div>
            </div>



        </div>

    )
}
