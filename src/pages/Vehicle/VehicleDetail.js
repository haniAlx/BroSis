import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./vehicledetail.css";
import { MdKeyboardArrowLeft, MdModeEdit } from "react-icons/md";
import swal from "sweetalert";
import LoadingPage from "../../components/LoadingPage";
const VehicleDetail = () => {
  const { vehicleId } = useParams();
  const api = "http://164.90.174.113:9090";
  const apiVehicleDetail = `${api}/Api/Admin/All/Vehicles/${vehicleId}`;
  const [vehicleDetail, setVehicleDetail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [edit, setEdit] = useState(false);
  const [backup, setBackUp] = useState();
  const [updating, setUpdating] = useState(false);
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  const options = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  const getDetail = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiVehicleDetail, options);
      console.log("response", res.status);
      if (res.status == 401) {
        //showErrorMessage();
        setLoading(false);
        setError("Unable to Load!! server respond with 401");
      }
      const data = await res.json();
      if (data && res.ok) {
        setVehicleDetail(data);
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
  useEffect(() => {
    getDetail();
  }, []);
  const showSuccessMessage = (e) => {
    swal({
      title: "Server Message",
      text: `${e}`,
      icon: "success",
      dangerMode: true,
      buttons: [false, "OK"],
    });
  };
  const showErrorMessage = (e) => {
    swal({
      title: "Error occured ",
      text: `${e.message}`,
      icon: "error",
      dangerMode: true,
      buttons: [false, "OK"],
    });
  };
  const updateVehicleInfo = async () => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(vehicleDetail),
    };
    const url = `${api}/Api/Admin/UpdateVehicleInfo/${vehicleId}`;
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      showSuccessMessage(result.message);
    } catch (e) {
      setError(e);
      showErrorMessage(e);
      console.log(e);
    } finally {
      setEdit(false);
      setUpdating(false);
      getDetail();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      vehicleDetail.id.toString() == "" ||
      vehicleDetail.manufactureDate == "" ||
      vehicleDetail.plateNumber == "" ||
      vehicleDetail.vehicleCondition == "" ||
      vehicleDetail.vehicleCatagory == "" ||
      vehicleDetail.capacity == "" ||
      vehicleDetail.status == "" ||
      vehicleDetail.driver == "" ||
      vehicleDetail.vehicleOwner == ""
    ) {
      swal({
        title: "Fill all Detail below",
        text: `please fill all`,
        icon: "error",
        dangerMode: true,
        buttons: [false, "cancel"],
      });
    } else {
      updateVehicleInfo();
      setUpdating(true);
    }
  };
  const handleChange = (e) => {
    setVehicleDetail({ ...vehicleDetail, [e.target.name]: e.target.value });
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
        <Link to={"/vehicle"}>Back To Vehicle</Link>
      </div>
      <div className="manage-window  detail-content mx-auto">
        {loading ? <LoadingPage message={"loading data"} /> : ""}
        {updating ? <LoadingPage message={"updating data"} /> : ""}
        <form onSubmit={(e) => handleSubmit(e)}>
          <p className="detail-part">Vehicle Detail</p>
          <hr />

          <div
            style={{
              display: "flex",
              columnGap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div className="flex-grow">
              <label>ID</label>
              <input value={vehicleDetail.id || ""} name="id" disabled />
            </div>
            <div className="flex-grow">
              <label>Manufacture Date</label>
              <input
                value={vehicleDetail.manufactureDate || ""}
                name="manufactureDate"
                disabled={!edit}
                onChange={(e) => handleChange(e)}
                type="date"
              />
            </div>
            <div className="flex-grow">
              <label>Plate Number</label>
              <input
                value={vehicleDetail.plateNumber || ""}
                name="plateNumber"
                disabled={!edit}
                onChange={(e) => handleChange(e)}
                type="number"
              />
            </div>
            <div className="flex-grow">
              <label>Vehicle Type</label>
              <input
                value={vehicleDetail.vehicleCatagory || ""}
                name="vehicleCatagory"
                disabled={!edit}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex-grow " style={{}}>
              <label>Vehicle Condition</label>
              {!edit ? (
                <input value={vehicleDetail.vehicleCondition || ""} disabled />
              ) : (
                <select
                  value={vehicleDetail.vehicleCondition || ""}
                  name="vehicleCondition"
                  onChange={(e) => handleChange(e)}
                >
                  <option value={"OLD"}>OLD</option>
                  <option value={"USED"}>USED</option>
                </select>
              )}
            </div>
            <div className="flex-grow " style={{}}>
              <label>Vehicle Capacit</label>
              <input
                value={vehicleDetail.capacity || ""}
                name="capacity"
                disabled={!edit}
                onChange={(e) => handleChange(e)}
                type="number"
              />
            </div>
          </div>
          <p className="detail-part">Vehicle Status</p>
          <div
            style={{
              display: "flex",
              columnGap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div className="flex-grow">
              <label>Status</label>
              {!edit ? (
                <input
                  value={vehicleDetail.status || ""}
                  name="status"
                  disabled
                />
              ) : (
                <select
                  onChange={(e) => handleChange(e)}
                  name="status"
                  value={vehicleDetail.status || ""}
                >
                  <option value={"ONROUTE"}>ONROUTE</option>
                  <option value={"INSTOCK"}>INSTOCK</option>
                </select>
              )}
            </div>

            <div className="flex-grow">
              <label>Vehicle Driver</label>
              <input
                value={vehicleDetail.driver || ""}
                name="driver"
                disabled={!edit}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex-grow">
              <label>Vehicle Owner</label>
              <input
                value={vehicleDetail.vehicleOwner || ""}
                name="vehicleOwner"
                disabled={!edit}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
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
                setVehicleDetail(backup);
              }}
            >
              {edit ? "Cancel" : "Edit"}
              <MdModeEdit color="white" width={25} />
            </span>
            <button className="btn w-300" disabled={!edit}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleDetail;
