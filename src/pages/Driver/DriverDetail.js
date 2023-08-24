import React, { useEffect, useState } from "react";
import "./driverdetail.css";
import { MdKeyboardArrowLeft, MdModeEdit } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import swal from "sweetalert";
import { mainAPI } from "../../components/mainAPI";
import { showSuccessMessage } from "../../components/SwalMessages";
import { BsToggleOn,BsToggleOff } from "react-icons/bs"

const DriverDetail = () => {
  //DriverID From Router parameter
  const { driverId } = useParams();
  const apiDriverDetail = `${mainAPI}/Api/Admin/All/Drivers/${driverId}`;
  const apiUpdateDriverDetail = `${mainAPI}/Api/Admin/UpdateDriverInfo/${driverId}`;
  const [driverDetail, setDriverDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [updating, setUpdating] = useState(false);
  const [backup, setBackUp] = useState({});
  const [edit, setEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  const options = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  //*******Getting Driver Detail
  const getDetail = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiDriverDetail, options);
      if (res.status == 401) {
        //showErrorMessage();
        setLoading(false);
        setError("Unable to Load!! server respond with 401");
      }
      const data = await res.json();
      if (data && res.ok) {
        setDriverDetail(data);
        setBackUp(data);
      }
      if (res.status == 400) {
        setError("Invalid API server 400");
      }
    } catch (e) {
      console.log(e.message);
      setError(e.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  //*********USE EFFECT FOR CALLING getDetail
  useEffect(() => {
    setEdit(false);
    setError("");
    getDetail();
  }, [refresh]);
  const showErrorMessage = (e) => {
    swal({
      title: "Error occured ",
      text: `${e.message}`,
      icon: "error",
      dangerMode: true,
      buttons: [false, "OK"],
    });
  };
  // ********************* UPDATE DRIVER INFO FUNCTION
  const updateDriverInfo = async () => {
    setEdit(false);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(driverDetail),
    };

    try {
      const response = await fetch(apiUpdateDriverDetail, options);
      const result = await response.json();
      console.log(result);
      showSuccessMessage(result);
    } catch (e) {
      setError(e.message);
      showErrorMessage(e.message);
      //console.log(e.message);
    } finally {
      setUpdating(false);
      getDetail();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      driverDetail.id.toString() == "" ||
      driverDetail.phoneNumber == "" ||
      driverDetail.birthDate == "" ||
      driverDetail.driverName == "" ||
      driverDetail.experience == "" ||
      driverDetail.licenseGrade == "" ||
      driverDetail.plateNumber == "" ||
      driverDetail.licenseNumber == "" ||
      driverDetail.licenseIssuDate == "" ||
      driverDetail.licenseExpireDate == "" ||
      driverDetail.status == "" ||
      driverDetail.driver == "" ||
      driverDetail.vehicleOwner == ""
    ) {
      swal({
        title: "Fill all Detail below",
        text: `please fill all`,
        icon: "error",
        dangerMode: true,
        buttons: [false, "cancel"],
      });
    } else {
      updateDriverInfo();
      setUpdating(true);
    }
  };
  //HANDLING EDITED DATA
  const handleChange = (e) => {
    setDriverDetail({ ...driverDetail, [e.target.name]: e.target.value });
  };

  /*********Enable disable user */
  const enableUser = async () => {
  
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
      }
    };
    const EnableDisableApi = `${mainAPI}/Api/User/disable/${driverDetail.id}`;
    setLoading(true);
    try {
      const res = await fetch(EnableDisableApi, options);
      if (res.ok) {
        const data = await res.json();
        setRefresh(!refresh)
        showSuccessMessage({ message: data.message });
      }
    } catch (e) {
      showErrorMessage({ message: e });
    } finally {
      setLoading(false);
     // Reloading the Page for getting status;
    }
  };
  return (
    <div className="main-bar">
      <div
        style={{
          display: "flex",
          columnGap: "10px",
          alignItems: "center",
        }}
      >
        <MdKeyboardArrowLeft size={30} />
        <Link to={"/driver"}>Back To Driver</Link>
      </div>
      {loading ? <LoadingPage message={"loading data"} /> : ""}
      {updating ? <LoadingPage message={"updating data"} /> : ""}
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
              {error === "Failed to fetch" ? "NO INTERNET CONNECTION" : error}
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
      {!error && (
        <div className="manage-window  detail-content mx-auto">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div
              className=""
              style={{
                display:'flex',
                alignItems:'center',
                justifyContent:'space-between',
                width: "200px",
                height: "100px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <img
                src={driverDetail.driverPic || ""}
                alt={`${driverDetail.driverName || ""} pic`}
                style={{
                  display: "block",
                  // objectFit: "cover",
                  width: "60%",
                  height: "100%",
                  borderRadius: "50%",
                }}
              />
               {driverDetail.enabled == true ? <BsToggleOn onClick={()=>enableUser()} style={{color:'green'}} size="3rem"></BsToggleOn> : 
             <BsToggleOff onClick={()=>enableUser()}style={{color:'red'}}size="3rem"></BsToggleOff>
                                        }
            </div>

            <p className="driver-name">{driverDetail.driverName || ""}</p>
            <span
              className={`btn ${edit ? "btn-bg-lightred" : "btn-bg-gray"}`}
              style={{
                maxWidth: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                columnGap: "4px",
              }}
              onClick={() => {
                setEdit(!edit);
                setDriverDetail(backup);
              }}
            >
              {edit ? "Cancel" : "Edit"}
              <MdModeEdit color="white" width={25} />
            </span>
            <p className="detail-part">Personal Detail</p>
            <div
              style={{
                display: "flex",
                columnGap: "20px",
                flexWrap: "wrap",
              }}
            >
              <div className="flex-grow">
                <label>Phone Number</label>
                <input
                  value={driverDetail.phoneNumber || ""}
                  name="userName"
                  disabled
                />
              </div>
              <div className="flex-grow">
                <label>ID</label>
                <input
                  value={driverDetail.id || ""}
                  name="id"
                  disabled
                />
              </div>
              <div className="flex-grow">
                <label>Role</label>
                <input
                  value={driverDetail.role || ""}
                  name="role"
                  disabled
                />
              </div>
              <div className="flex-grow">
                <label>Date Of Birth</label>
                <input
                  value={driverDetail.birthDate || ""}
                  name="birthDate"
                  type="date"
                  disabled
                />
              </div>
              <div className="flex-grow " style={{}}>
                <label>Gender</label>
                {!edit ? (
                  <input
                    value={driverDetail.gender || ""}
                    name="gender"
                    disabled
                  />
                ) : (
                  <select
                    value={driverDetail.gender || ""}
                    name="gender"
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                  </select>
                )}
              </div>
              <div className="flex-grow">
                <label>Experience</label>
                <input
                  value={driverDetail.experience || ""}
                  name="experience"
                  disabled={!edit}
                  type="number"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <p className="detail-part">Licence Detail</p>
            <div
              style={{
                display: "flex",
                columnGap: "20px",
                flexWrap: "wrap",
              }}
            >
              <div className="flex-grow">
                <label>Licence IssueDate</label>
                <input
                  value={driverDetail.licenseIssueDate || ""}
                  name="licenseIssueDate"
                  disabled={!edit}
                  type="date"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="flex-grow">
                <label>Licence ExpireDate</label>
                <input
                  value={driverDetail.licenseExpireDate || ""}
                  name="licenseExpireDate"
                  disabled={!edit}
                  type="date"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="flex-grow">
                <label>Licence Grade</label>
                <input
                  value={driverDetail.licenseGrade || ""}
                  name="licenseGrade"
                  disabled={!edit}
                  type="text"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="flex-grow">
                <label>Licence Number</label>
                <input
                  value={driverDetail.licenseNumber || ""}
                  name="licenseNumber"
                  disabled={!edit}
                  type="number"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div
                style={{
                  height: "150px",
                  marginBottom: "25px",
                  position: "relative",
                }}
                className="flex-grow"
              >
                <label>Driver Licence Picture</label>
                <img
                  src={driverDetail.licensePic || ""}
                  alt="licence pic"
                  style={{
                    border: "1px solid black",
                    objectFit: "cover",
                    borderRadius: "5px",
                    display: "block",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    marginBottom: "10px",
                  }}
                  className="img-licence"
                />
              </div>
            </div>
            <p className="detail-part">Driver Status</p>
            <div
              style={{
                display: "flex",
                columnGap: "20px",
                flexWrap: "wrap",
              }}
            >
              <div className="flex-grow">
                <label>Status</label>
                <input
                  value={driverDetail.status || ""}
                  name="status"
                  disabled
                />
              </div>
              <div className="flex-grow">
                <label>Vehicle Owner</label>
                <input
                  value={driverDetail.vehicleOwner || ""}
                  name="vehicleOwner"
                  disabled
                />
              </div>
            </div>

            <button className="btn w-300" disabled={!edit}>
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DriverDetail;
