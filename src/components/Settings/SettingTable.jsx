import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserTable = ({ target,name }) => {
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
          {name  === 'LogoAvatar' ?  <tr className={styles.active_row}>
                            <td>{dataSource2.id}</td>
                            <td>{dataSource2.avatar}</td>
                            <td>{dataSource2.logo}</td>
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
                        <tr className={styles.active_row}>
                            <td>{item.id}</td>
                            { name == 'Alert Type' ?  <td>{item.alertType}</td> :
                            name == 'Roles Type'?  <td>{item.name}</td>:
                            name == 'Driver Status'?  <td>{item.driverStatus}</td>:
                            name == 'Notification Preference'?  <td>{item.medium}</td>:
                            name == 'Vehicle Condition'?  <td>{item.conditionName}</td>:
                            name == 'Service Needed'?  <td>{item.service}</td>:
                            name == 'Vehicle Category'?  <td>{item.catagory}</td>:
                            name == 'Company Type' ?  <td>{item.companyType}</td>:
                            name == 'Company Sector'?  <td>{item.sectorName}</td>:
                            name == 'Business Type' || name == 'Business Sector'?  <td>{item.businessSectors}</td>:
                            name == 'Trip type'?  <td>{item.triptypes}</td>:
                            name == 'Cargo type' ?  <td>{item.cargoType}</td>:
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
