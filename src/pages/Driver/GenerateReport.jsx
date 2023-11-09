// PDFGenerator.js

import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import ReportTable from './ReportTable';

const GenerateReport = ({ data }) => {
  const componentRef = useRef(null);

  return (
    <div>
    
      <ReactToPrint
        trigger={() => <button className='printBtn'>Print Report</button>}
        content={() => componentRef.current}
      />
      <div style={{ display: 'none' }}>
        {/* <ReportTable data={data}ref={componentRef} /> */}
        <table className="data-table" ref={componentRef}>
          <thead>
            <tr>
              <th>Index</th>
              <th>Driver Name</th>
              <th>Phone Number</th>
              <th>License Number</th>
              <th>Experience</th>
              <th>License Grade</th>
              <th>Status</th>
              <th>Plate Number</th>
              <th>Vehicle Owner</th>
            </tr>
          </thead>
      <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr className="" key={index}>
                  <td>{index + 1}</td>
                  <td>{item.driverName}</td>
                  <td>{item.phoneNumber}</td>
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
    </div>
  );
};

export default GenerateReport;
