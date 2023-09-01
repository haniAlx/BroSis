import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const UserTable = ({ target,setShowSetting,name }) => {
  console.log(target,name,setShowSetting)
  const [page, setPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(5);
  const lastIndexOfPage = page * postPerPage;
  // const firstIndexPage = lastIndexOfPage - postPerPage;
  // const currentPage = target.slice(firstIndexPage, lastIndexOfPage);
  // const totalPages = target.length;
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
  const hideModal = () => {
    const modal = document.getElementById("setting-manage");
    window.onclick = (event) => {
      if (event.target == modal) {
         setShowSetting(false);
      }
    };
  };
  return (
    <div
    className="manage-modal"
    id="setting-manage"
    onClick={() => hideModal()}
    >
      <div className="manage-modal-content">
      <div className="modal-title"
      >
          <p>Mangage System Setting</p> 
        </div>
        <button className="btn">ADD {name}</button>
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
                            
                            :target.map((item,index) => (
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
                            name === 'BusinessType' ?<td> {item.businessType}</td>:
                            name === 'BusinessSector'?  <td>{item.businessSector}</td>:
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
      {/* <Pagination
        onChange={(page) => setPage(page)}
        pageSize={postPerPage}
        current={page}
        total={totalPages}
        showQuickJumper
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
      /> */}
    </div>
  );
};

// const PopUp = () =>{
//   const Input = () => {

//     Swal.fire({
//         title: title,
//         html: isAvatar ?`<input type="file" id="avatar"   class="swallpop" placeholder=${title}>
//         <input type="file" id="logo" class="swallpop" placeholder="Logo">` :
//         `<input type="text" id="login"  class="swallpop" placeholder=${title}>`,
//         confirmButtonText: 'Add',
//         confirmButtonColor: '#00cc44',
//         // focusConfirm: false,
//         showCloseButton: true,
//         width: "580px",
//         showClass: {
//             popup: 'animate__animated animate__fadeInDown'
//         },
//         hideClass: {
//             popup: 'animate__animated animate__fadeOutUp'
//         },
//         preConfirm: () => {
//             if (isAvatar)
//             {
//                 const avatar = Swal.getPopup().querySelector('#avatar').files[0];
//                 const logo = Swal.getPopup().querySelector('#logo').files[0];
//                 if (!avatar || !logo) {
//                 Swal.showValidationMessage('Please select both files');
//                 }
//                 return { avatar, logo };
//             }
//             else {
//             const login = Swal.getPopup().querySelector('#login').value
//             if (!login) {
//                 Swal.showValidationMessage(`Please enter data`)
//             }
//             return { login: login }}
//         }
//     }).then((result) => {
//         setPopupAdd(false);
//         if (result.isConfirmed) {
//             if (isAvatar)
//             {
//                 const { avatar, logo } = result.value;
//                 console.log(avatar, logo)
//                 onSubmit(avatar, logo)
//             }
//             else {
//                 onSubmit(result.value.login);
//               }
//         }
//         else{
//             setPopupAdd(false);
//         }
//     })
// }


// const onSubmit = (inputData, logo) => {

//   if (title === 'Create_Role') {
//       Create_Role(inputData);
//   }
//   if (title === 'Create_Driver_Status') {
//       Create_Driver_Status(inputData);
//   }
//   if (title === 'Create_Alert_Type') {
//       Create_Alert_Type(inputData);
//   }
//   if (title === 'Create_Trip_Type') {
//       Create_Trip_Type(inputData);
//   }
//   if (title === 'Add_Notification') {
//       Add_Notification(inputData);
//   }
//   if (title === 'Add_Vehicle_Condition') {
//       Add_Vehicle_Condition(inputData);
//   }
//   if (title === 'Add_vehicle_category') {
//       Add_vehicle_category(inputData);
//   }
//   if (title === 'Add_company_sector') {
//       Add_company_sector(inputData);
//   }
//   if (title === 'Add_company_type') {
//       Add_company_type(inputData);
//   }
//   if (title === 'Add_Service_Needed') {
//       Add_Service_Needed(inputData);
//   }
//   // cargo owner
//   if (title === 'Add_Cargo_Type') {
//       Add_Cargo_Type(inputData);
//   }
//   //// Avatar && Logo
//   if (title === 'Avatar') {
      
//       Add_Avatar(inputData, logo);
//   }
//   /// Add_business_type"
//   if (title === 'Add_business_type') {
     
//       Add_business_type(inputData);
//   }
//   // Add_business_sector
//   if (title === 'Add_business_sector') {
      
//       Add_business_sector(inputData);
//   }
//    // Add_driver_state
//    if (title === 'driverState') {
    
//       Add_Driver_State(inputData);
//   }

// };

//   return(
//     <>
    
//     <>
//             <div>
//                 <div className='add_notification' onClick={handleClickopen}>{title}</div>
//             </div>

//             <div>
//                 {popupadd ?
//                     <div>
//                         {Input()}
//                     </div> : ""}
//             </div>
//         </>
//     </>
//   )

// }

export default UserTable;
