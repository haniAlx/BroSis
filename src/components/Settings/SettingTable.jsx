import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const UserTable = ({ target,name }) => {
  console.log(target,name)
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
  return (
    <div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
            <th>ID</th>
            <th> {name == 'LogoAvatar' ? 'Avatar' : 'name'}</th>
            {name == 'LogoAvatar' && <th> Logo </th>}
            <th>Action</th>
            </tr>
          </thead>

          <tbody>
          {name  === 'LogoAvatar' ?  <tr className="active_row">
                            <td>{target.id}</td>
                            <td>{target.avatar}</td>
                            <td>{target.logo}</td>
                            <td>
                                <p className='notification_actions'>
                                    <FaEdit title='Edit' className='action_edit' size="1.4rem" color='green'
                                        onClick={() => {
                                            //  dleClickEdit21(avatar.avatar, avatar.logo, "Update_Avatar", "Edit Avatar and logo ")
                                            }}>

                                    </FaEdit>
                                </p>
                            </td>
                           </tr>
                            
                            :target.map(item => (
                        <tr className="active_row" key={item.id}>
                            <td>{item.id}</td>
                            { name === 'AlertType' ?  <td>{item.alertType}</td> :
                            name === 'Role'?  <td>{item.name}</td>:
                            name === 'DriverStatus'?  <td>{item.driverStatus}</td>:
                            name === 'DriverState'?  <td>{item.driverState}</td>:
                            name === 'Notification'?  <td>{item.medium}</td>:
                            name === 'VehicleCondition'?  <td>{item.conditionName}</td>:
                            name === 'service'?  <td>{item.service}</td>:
                            name === 'VehicleCatagory'?  <td>{item.catagory}</td>:
                            name === 'CompanyType' ?  <td>{item.companyType}</td>:
                            name === 'CompanySector'?  <td>{item.sectorName}</td>:
                            name === 'BusinessType' || name === 'BusinessSector'?  <td>{item.businessSectors}</td>:
                            name === 'TripType'?  <td>{item.triptypes}</td>:
                            name === 'CargoType' ?  <td>{item.cargoType}</td>:
                                    <td>{item.driverState}</td>}
                            
                            <td>
                        <p className='notification_actions'>
                            <FaEdit title='Edit' className='action_edit' size="1.4rem" color='green'
                                onClick={() => {
                                    //  dleClickEdit21(avatar.avatar, avatar.logo, "Update_Avatar", "Edit Avatar and logo ")
                                    }}>

                                                            </FaEdit>
                                                    </p>
                                                </td>
                                                        
                                                    </tr>
                                                ))}

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
