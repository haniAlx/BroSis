import React from "react";

const VehicleTable = ({ target, handleManage, showDetail }) => {
  return (
    <div>
      <table className="driver-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Vehicle Owner</th>
            <th>Vehicle Name</th>
            <th>Vehice Type</th>
            <th>Plate Number</th>
            <th>Status</th>
            <th>DriverName</th>
            <th>Tracking</th>
            <th>Assign Driver</th>
          </tr>
        </thead>

        <tbody>
          {target.length > 0 ? (
            target.map((item, index) => (
              <tr className="" key={index}>
                <td>{index + 1}</td>
                <td>{item.vehicleOwner}</td>
                <td>{item.vehicleName}</td>
                <td>{item.vehicleCatagory}</td>
                <td>{item.plateNumber}</td>
                <td
                  style={{
                    color: `${
                      item.status.toLowerCase() === "unassigned"
                        ? "red"
                        : item.status.toLowerCase() === "assigned"
                        ? "green"
                        : "orange"
                    }`,
                  }}
                >
                  {item.status}
                </td>
                <td>{item.driverName}</td>
                <td>
                  <button
                    className="table-btn"
                    onClick={() => showDetail(item)}
                  >
                    Detail
                  </button>
                </td>
                <td>
                  <button
                    className="table-btn"
                    onClick={() => handleManage(item)}
                  >
                    Manage
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
  );
};

export default VehicleTable;
