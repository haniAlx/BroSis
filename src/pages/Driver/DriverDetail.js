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
                value={driverDetail.phoneNumber}
                name="userName"
                disabled
              />
            </div>
            <div className="flex-grow">
              <label>ID</label>
              <input value={driverDetail.id} name="driverid" disabled />
            </div>
            <div className="flex-grow">
              <label>Role</label>
              <input value={driverDetail.roles} name="driverrole" disabled />
            </div>
            <div className="flex-grow">
              <label>Date Of Birth</label>
              <input value={driverDetail.birthDate} name="dob" disabled />
            </div>
            <div className="flex-grow " style={{}}>
              <label>Gender</label>
              <input value={driverDetail.gender} name="gender" disabled />
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
                name="licenseIssueDate"
                disabled
              />
            </div>
            <div className="flex-grow">
              <label>Licence ExpireDate</label>
              <input
                value={driverDetail.licenseExpireDate}
                name="LicenceExpireDate"
                disabled
              />
            </div>
            <div className="flex-grow">
              <label>Licence Grade</label>
              <input
                value={driverDetail.licenseGrade}
                name="LicenceGrade"
                disabled
              />
            </div>
            <div className="flex-grow">
              <label>Experience</label>
              <input
                value={driverDetail.experience}
                name="LicenceGrade"
                disabled
              />
            </div>
            <div
              style={{
                height: "150px",
                marginBottom: "25px",
              }}
              className="flex-grow"
            >
              <label>Driver Licence Picture</label>
              <img
                src={driverDetail.licensePic}
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
              <input value={driverDetail.status} name="driverstatus" disabled />
            </div>
            <div className="flex-grow">
              <label>Vehicle Owner</label>
              <input
                value={driverDetail.vehicleOwner}
                name="driverid"
                disabled
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverDetail;
