// ReportComponent.js

import React from 'react';

const ReportTable = ({ data }) => {
  const reportData = [
    { name: 'Item 1', quantity: 10, price: 20 },
    { name: 'Item 2', quantity: 5, price: 15 },
    // Add more data as needed
  ];
  console.log('print',data)

  return (
    <div>
      <h1>Report</h1>
      <table className="data-table">
          <thead>
            <tr>
              <th>Index</th>
              <th>Driver Name</th>
              <th>License Number</th>
              <th>Experience</th>
              <th>License Grade</th>
              <th>Status</th>
              <th>Plate Number</th>
              <th>Vehicle Owner</th>
              <th>Detail</th>
              <th>Manage</th>
            </tr>
          </thead>
      <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr className="" key={index}>
                  <td>{index + 1}</td>
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
                  <td>{item.plateNumber}</td>
                  <td>{item.vehicleOwner}</td>
                  
             
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

export default ReportTable;
