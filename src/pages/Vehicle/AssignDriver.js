import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdSearch } from "react-icons/md";
import ReactLoading from "react-loading";
import { mainAPI } from "../../components/mainAPI";
import { Link, useParams } from "react-router-dom";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";

import {
  showConfirmationMessage,
  showErrorMessage,
  showSuccessMessage,
} from "../../components/SwalMessages";
const AssignDriver = () => {
  const { ownerId, plateNumber, assign } = useParams();
  console.log(assign, plateNumber)
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unassigned, setUnassigned] = useState([]);
  const [licenseNumber, setLicenseNumber] = useState("");
  const navigate = useNavigate();
  const apiOwnerDrivers = `${mainAPI}/Api/Admin/Drivers/All/${ownerId}`;
  let changeDriverApi 
 if (assign == 'changeDriver' )
 {
  changeDriverApi ='/Api/Vehicle/ChangeAssignedDriver'
 }else if(assign == 'assignDriver')
 {
  changeDriverApi='/Api/Vehicle/AssignDriver'
 }
  useEffect(() => {
    setError("");
    getUnAssigned();
  }, [refresh]);
  const jwt = JSON.parse(localStorage.getItem("jwt"));

  const options = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  //   ******* GET UNASSIGNED DRIVER FROM DRIVER API **********
  const getUnAssigned = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiOwnerDrivers, options);
      const data = await res.json();
      if (data.drivers && res.ok) {
        const unassigned = data.drivers.filter(
          (item) => item.status == "UNASSIGNED"
        );
        setUnassigned(unassigned);
        setTableData(unassigned);
        console.log(unassigned);
      }
      if (res.status == 400) {
        setError("Invalid API server 400");
      }
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const filterTable = (e) => {
    const { value } = e.target;
    const result = unassigned.filter((item) => {
      return (
        item.driverName.toLowerCase().includes(value.toLowerCase()) ||
        item.vehicleOwner.toLowerCase().includes(value.toLowerCase()) ||
        item.phoneNumber.toLowerCase().includes(value.toLowerCase()) ||
        item.licenseNumber.toLowerCase().includes(value.toLowerCase()) ||
        item.status.toLowerCase().includes(value.toLowerCase())
      );
    });
    setTableData(result);
    if (value == "") setTableData(unassigned);
  };
  //   ASSIGNING DRIVER
  const assignDriver = async (driver) => {
    let licenseNumber = driver.licenseNumber;
    let item = {
      plateNumber,
      driver: licenseNumber,
    };
    console.log(item);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(item),
    };
    const url = `${mainAPI}${changeDriverApi}`;
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      const mess = result["message"];
      console.log(mess);
      if (response.ok) {
        showSuccessMessage({ message: mess });
        setRefresh(!refresh);
      } else {
        showErrorMessage({ message: mess });
      }
    } catch (error) {
      console.log(error + "error");
      showErrorMessage({ message: "net::ERR_INTERNET_DISCONNECTED" });
    }
  };
  //   HANDLING ASSIGN BUTTON DRIVER TO VEHICLE
  const handleAssign = async (driver) => {
    const confirm = await showConfirmationMessage();
    if (confirm) assignDriver(driver);
  };
  const showDetail = (item) => {
    navigate(`/driver/detail/${item.id}`);
  };
  return (
    <div className="main-bar">
      <div>
        <div
          style={{
            display: "flex",
            columnGap: "10px",
            alignItems: "center",
          }}
        >
          <MdKeyboardArrowLeft size={30} />
          <Link to={"/vehicle"}>Back To Vehicle</Link>
        </div>
        <h2 style={{}}>{assign == 'assignDriver' ? 'Assign Driver' : 'Change Driver'}</h2>
        <hr className="hr" />
        <div className="main-bar-content">
          {error ? (
            <>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "25px",
                  marginTop: "50px",
                  color: "red",
                }}
              >
                {error}
              </p>
              <button
                className="btn center w-300"
                onClick={() => setRefresh(!refresh)}
              >
                Refresh Page
              </button>
            </>
          ) : (
            ""
          )}
          {loading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                flexDirection: "column",
                rowGap: "50px",
              }}
            >
              <ReactLoading type="bars" width={100} height={50} color="black" />
              <p>Loading Data Please Wait</p>
            </div>
          ) : (
            !error && (
              <>
                <div className="">
                  <div className="search-bar">
                    <input
                      type="text"
                      name="search"
                      placeholder="Search..."
                      onChange={(e) => filterTable(e)}
                    />
                    <MdSearch size={25} />
                  </div>
                  <UnassignedTable

                    assign ={assign}
                    target={tableData}
                    handleAssign={handleAssign}
                    showDetail={showDetail}
                  />
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignDriver;
const UnassignedTable = ({ target, handleAssign, assign,showDetail }) => {

  console.log(assign)
  const [page, setPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(5);
  const lastIndexOfPage = page * postPerPage;
  const firstIndexPage = lastIndexOfPage - postPerPage;
  const currentPage = target.slice(firstIndexPage, lastIndexOfPage);
  const totalPages = target.length;
  const onShowSizeChange = (current, pageSize) => {
    setpostPerPage(pageSize);
    console.log(pageSize);
  };
  useEffect(() => {
    setPage(1);
  }, [target]);
  return (
    <div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Index</th>
              <th>Vehicle Owner</th>
              <th>DriverName</th>
              <th>License Number</th>
              <th>Phone Number</th>
              <th>Status</th>
              <th>Assign / change Driver</th>
              <th>Detail</th>
            </tr>
          </thead>

          <tbody>
            {target.length > 0 ? (
              currentPage.map((item, index) => (
                <tr className="" key={index}>
                  <td>{index + 1}</td>
                  <td>{item.vehicleOwner}</td>
                  <td>{item.driverName}</td>
                  <td>{item.licenseNumber}</td>
                  <td>{item.phoneNumber}</td>
                  <td
                    style={{
                      color: `${
                        item.status.toLowerCase() === "maintaining"
                          ? "red"
                          : item.status.toLowerCase() === "parked"
                          ? "green"
                          : item.status.toLowerCase() == "instock"
                          ? "blue"
                          : "orange"
                      }`,
                    }}
                  >
                    {item.status}
                  </td>

                  <td>
                    <button
                      className="table-btn"
                      onClick={() => handleAssign(item)}
                    >
                      {assign == 'changeDriver' ? 'Change Driver' : 'Assign Driver'}
                    </button>
                  </td>
                  <td>
                    <button
                      className="table-btn"
                      onClick={() => showDetail(item)}
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>NoRecored Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        onChange={(page) => setPage(page)}
        pageSize={postPerPage}
        current={page}
        total={totalPages}
        showQuickJumper
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
      />
    </div>
  );
};
