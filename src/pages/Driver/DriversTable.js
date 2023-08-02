import { Pagination } from "antd";
import React, { useEffect, useState } from "react";

const DriversTable = ({ target, handleManage, showDetail }) => {
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
              <th>Driver Name</th>
              <th>License Number</th>
              <th>Experience</th>
              <th>License Grade</th>
              <th>Status</th>
              <th>Vehicle Owner</th>
              <th>Detail</th>
              <th>Manage</th>
            </tr>
          </thead>

          <tbody>
            {target.length > 0 ? (
              currentPage.map((item, index) => (
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
                  <td>{item.vehicleOwner}</td>
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

export default DriversTable;
