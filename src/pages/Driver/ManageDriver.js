import React, { useEffect, useState } from "react";
import "./manage.css";
import swal from "sweetalert";
function ManageDriver({ setShowManage, driverDetail }) {
  const api = "http://164.90.174.113:9090";
  /*************************Total vehicles***************/
  const allVehicleapi = `${api}/Api/Admin/All/Vehicles`;
  const updateStatusapi =
    `${api}/Api/Vehicle/ChangeDriverStatus`;
  const [allVehicles, setAllVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [plateNumber, setPlateNumber] = useState(driverDetail.plateNumber);
  const [driverStatus, setDriverStatus] = useState(driverDetail.status);
  const jwt = JSON.parse(localStorage.getItem("jwt"));

  useEffect(() => {
    const getAllVehicles = () => {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      };
      fetch(allVehicleapi, options)
        .then((respnse) => respnse.json())
        .then((data) => {
          console.log("allVehicles data", data.vehiclesINF);
          if (data.vehiclesINF) setAllVehicles(data.vehiclesINF);
          setLoading(false);
        })
        .catch((e) => console.log(e));
    };
    getAllVehicles();
  }, []);
  /** Closing modal */
  const hideModal = () => {
    const modal = document.getElementById("driver-manage");
    window.onclick = (event) => {
      if (event.target == modal) {
        setShowManage(false);
      }
    };
  };
  const updateStatus = async () => {
    let update = {
      driverStatus,
      plateNumber,
    };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(update),
    };
    try {
      const response = await fetch(updateStatusapi, options);
      const result = await response.json();
      console.log(result);
      const error = result.error;
      if (response.ok) {
        swal("Successful", `${error}`, "success", {
          buttons: false,
          timer: 2000,
        });
      } else {
        swal(`Failed To update ${error}`, "", "error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStatus();
  };

  return (
    <div className="manage-modal" id="driver-manage" onClick={() => hideModal()}>
      <div className="manage-modal-content">
        <div className="modal-title">
          <p>Mangage Driver Status</p>
        </div>
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label>Licence Number</label>
            <input value={driverDetail.licenseNumber} disabled />
            <label>Driver Name</label>
            <input value={driverDetail.driverName} disabled />
            <label>Vehicles</label>
            {loading ? (
              "please wait while loading.."
            ) : (
              <select
                value={plateNumber || ""}
                onChange={(e) => setPlateNumber(e.target.value)}
              >
                {allVehicles.map((vehicle, index) => (
                  <option value={vehicle.plateNumber} key={index}>
                    {vehicle.plateNumber}
                  </option>
                ))}
              </select>
            )}

            <label>Status</label>
            <select
              value={driverStatus || ""}
              onChange={(e) => setDriverStatus(e.target.value)}
            >
              <option value={"ASSIGNED"}>ASSIGNED</option>
              <option value={"UNASSIGNED"}>UNASSIGNED</option>
              <option value={"ONROUTE"}>ONROUTE</option>
              <option value={"PERMIC"}>PERMIT</option>
            </select>
            {loading ? (
              <button className="btn-manage btn" disabled>
                Please Wait
              </button>
            ) : (
              <button className="btn-manage btn">Update Status</button>
            )}
          </form>
          <button
            className="btn-cancel btn"
            onClick={() => setShowManage(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageDriver;
