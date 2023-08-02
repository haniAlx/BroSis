import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserTable = ({ target }) => {
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
  const navigate = useNavigate();
  const showDetail = (user) => {
    navigate(`/users/${user.roles}/${user.id}`);
  };
  const addDriver = (item) => {
    navigate(`/users/addDriver/${item.phoneNumber}`);
  };
  const addVehicle = (item) => {
    navigate(`/users/addVehicle/${item.phoneNumber}`);
  };
  useEffect(() => {
    setPage(1);
  }, [target]);
  console.log(currentPage)
  return (
    <div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Cargo Owner</th>
              <th>Business Name</th>
              <th>Licence</th>
              <th>Tin Number</th>
              <th>Detail</th>
            </tr>
          </thead>

          <tbody>
            {target.length > 0 ? (
              currentPage.map((item, index) => (
                <tr className="" key={index}>
                  <td>{item.ownerName}</td>
                  {/* <td>{item.businessINF.businessName}</td> */}
                  {/* <td>{item.businessINF.licenseNumber}</td>
                  <td>{item.businessINF.tinNumber}</td> */}
                  <td>
                    <button
                      className="table-btn"
                      onClick={() => showDetail(item)}
                    >
                      Detail
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

export default UserTable;
