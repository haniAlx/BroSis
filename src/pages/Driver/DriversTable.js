import React from "react";

const DriversTable = ({ target }) => {
  return (
    <div>
      <table className="driver-table">
        <thead>
          <tr>
            <th>Driver Name</th>
            <th>License Number</th>
            <th>Experience</th>
            <th>LicenseGrade</th>
            <th>Status</th>
            <th>VehicleOwner</th>
            <th>Detail</th>
            <th>Manage</th>
          </tr>
        </thead>

        <tbody>
          {target.length > 0 ? (
            target.map((item, index) => (
              <tr className="" key={index}>
                <td>{item.driverName}</td>
                <td>{item.licenseNumber}</td>
                <td>{item.experience}</td>
                <td>{item.licenseGrade}</td>
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
                <td>{item.vehicleOwner}</td>
                <td>
                  <button className="table-btn">Detail</button>
                </td>
                <td>
                  <button className="table-btn">Manage</button>
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

export default DriversTable;
