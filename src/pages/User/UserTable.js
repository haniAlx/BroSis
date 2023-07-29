import { Pagination } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserTable = ({ target }) => {
  const [page, setCurentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(5);
  const lastIndexOfPage = page * postPerPage;
  const firstIndexPage = lastIndexOfPage - postPerPage;
  const currentPage = target.slice(firstIndexPage, lastIndexOfPage);
  const totalPages = target.length / page;
  const onShowSizeChange = (current, pageSize) => {
    setpostPerPage(pageSize);
    console.log(pageSize);
  };
  const navigate = useNavigate();
  const showDetail = (user) => {
    navigate(`/users/${user.roles}/${user.id}`);
  };
  const addDriver = () => {};
  const addVehicle = () => {};
  return (
    <div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Index</th>
              <th>Vehicle Owner</th>
              <th>First Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Total Driver</th>
              <th>Total Vehicle</th>
              <th>Detail</th>
              <th>Add Vehicle</th>
              <th>Add Driver</th>
            </tr>
          </thead>

          <tbody>
            {target.length > 0 ? (
              currentPage.map((item, index) => (
                <tr className="" key={index}>
                  <td>{index + 1}</td>
                  <td>{item.companyName}</td>
                  <td>{item.firstName}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td
                    style={{
                      color: `${
                        item.roles.toLowerCase() === "maintaining"
                          ? "red"
                          : item.roles.toLowerCase() === "parked"
                          ? "green"
                          : item.roles.toLowerCase() == "instock"
                          ? "blue"
                          : "orange"
                      }`,
                    }}
                  >
                    {item.roles}
                  </td>
                  <td>{item.totalDrivers}</td>
                  <td>{item.totalVehicles}</td>
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
                      onClick={() => addVehicle(item)}
                    >
                      AddVehicle
                    </button>
                  </td>
                  <td>
                    <button
                      className="table-btn"
                      onClick={() => addDriver(item)}
                    >
                      AddDriver
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
        onChange={(page) => setCurentPage(page)}
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

export default UserTable;
