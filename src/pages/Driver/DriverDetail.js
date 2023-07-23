import React from "react";
import "./driverdetail.css";
const DriverDetail = ({ driverDetail, setDetail }) => {
  /** Closing modal */
  const hideModal = () => {
    const modal = document.getElementById("driver-detail");
    window.onclick = (event) => {
      if (event.target == modal) {
        setDetail(false);
      }
    };
    console.log(driverDetail);
  };
  return (
    <div
      className="manage-modal"
      id="driver-detail"
      onClick={() => hideModal()}
    >
      <div className="manage-modal-content detail-content">
        <form>
          <div
            className=""
            style={{
              width: "100px",
              height: "100px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <img
              src={driverDetail.driverPic}
              alt={`${driverDetail.driverName} pic`}
              style={{
                display: "block",
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
              }}
            />
          </div>
          <p className="driver-name">{driverDetail.driverName}</p>
          <p className="detail-part">Personal Detail</p>
          <div>
            <label>Phone Number</label>
            <input value={driverDetail.phoneNumber} name="userName" disabled />
          </div>
          <div>
            <label>Date Of Birth</label>
            <input value={driverDetail.birthDate} name="userName" disabled />
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
              <label>Licence Number</label>
              <input
                value={driverDetail.licenseNumber}
                name="userName"
                disabled
              />
            </div>
            <div className="flex-grow">
              <label>Licence IssueDate</label>
              <input
                value={driverDetail.licenseIssueDate}
                name="userName"
                disabled
              />
            </div>
            <div className="flex-grow">
              <label>Licence ExpireDate</label>
              <input
                value={driverDetail.licenseExpireDate}
                name="userName"
                disabled
              />
            </div>
            <div
              style={{
                height: "200px",
              }}
              className="flex-grow"
            >
              <label>Driver Licence Picture</label>
              <img
                src={driverDetail.licensePic}
                alt="licence pic"
                style={{
                  objectFit: "cover",
                  borderRadius: "5px",
                  display: "block",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverDetail;
