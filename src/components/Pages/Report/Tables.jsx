import React from 'react'
import './Report.css';
import { Link } from 'react-router-dom';
import "antd/dist/antd"
import { useState, useEffect } from 'react';
import { Pagination } from 'antd';
// import { total } from './data/jsonData';

const PAGE_SIZE = 3

export default function Table({ title, datas }) {

  const [list, setList] = useState([datas[0]]);
  const [total, setTotal] = useState(datas[0].length);
  const [page, setCurentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(10);

  const onShowSizeChange = (current, pageSize) => {
    setpostPerPage(pageSize);
  }

  useEffect(() => {
    setTotal([datas[0].length])
  }, []);


  

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
              setDataSource2(data.vehicles)
              console.log(dataSource2)
              setLoading(false);

          })
  }, [])
  const indexOfLastPage = page + postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentPage = dataSource2.slice(indexOfFirstPage, indexOfLastPage);


  return (
    <>

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

    </>

  )
}