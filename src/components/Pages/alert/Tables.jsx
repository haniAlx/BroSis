import React from 'react'
import styles from './alert.module.css';
import { FaUserAlt } from "react-icons/fa";
import "antd/dist/antd"
import { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { BsSearch } from "react-icons/bs";

export default function Cards({ title, datas }) {

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


  const indexOfLastPage = page + postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentPage = list[0].slice(indexOfFirstPage, indexOfLastPage);

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

  return (
    <>
      <div className='vehicle_search'>
        <p title='search'>
          <BsSearch className='icn' size="1.5rem" color='rgb(63, 63, 63)'></BsSearch>
          <input type="text" id="myInput" onKeyUp={tableSearch} placeholder="Search"></input>
          <button>Search</button>
        </p>
      </div>

      <div className='outer_vehicle_tables' id='myTable'>
        <p>{title}</p>

        <table class="vehicle_table" id="myTable">

          <thead>
            <tr>
              <th>Profile</th>
              <th>Driver</th>
              <th>Plate Number</th>
              <th>Alert Location</th>
              <th>Alert Type</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {currentPage.map(item => (
              <tr className='active_row'>

                <td><FaUserAlt className='next' size="1.5rem" color='rgb(63, 63, 63)'></FaUserAlt></td>
                <td>{item.Driver}</td>
                <td>{item.Plate_number}</td>
                <td>{item.Alert_location}</td>
                <td>{item.Alert_type}</td>
                <td>{item.Owner}</td>
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