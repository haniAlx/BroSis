import React , {Component} from 'react'
import {Routes, Route, Link, useNavigate, Navigate, Router} from "react-router-dom";
import {FaHome} from 'react-icons/fa';
import { IconName } from "react-icons/ai";
import Company_registration from './components/Pages/Registration/Company_registration';
import Users from './components/Pages/Users/Users';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import Total_number_of_vehile from './components/Pages/Total_number_of_vehicle/Total_number_of_vehile';
// import Tracking_history from './components/Pages/Tracking/Tracking_history';
import Tracking from './components/Pages/Tracking/Tracking';
import Marketing from './components/Pages/Marketing/Marketing';
import Post_market from './components/Pages/Marketing/Post_market';
import Alert from './components/Pages/alert/Off_road';
import Users_edit from './components/Pages/Users/Users_edit';
import Vehicle_detail from './components/Pages/Total_number_of_vehicle/Vehicle_detail';
import Message_overview from './components/Pages/Message/Message_overview';
import Settings from './components/Pages/Settings/Settings';
import Settingss from './components/Pages/Settings/Settingss';
import Report from './components/Pages/Report/Report';
import Report_detail from './components/Pages/Report/Report_detail'; 
import PopUp from './components/Pages/Settings/PopUp';
import Individual_registration from './components/Pages/Registration/Individual_registration';
import Set_Trip from './components/Pages/Trip Management/Set_Trip';
import Trip_history from './components/Pages/Trip Management/Trip_history';
import Avialable_trip from './components/Pages/Trip Management/Avialable_trip';
import On_route from './components/Pages/Total_number_of_vehicle/On_route';
import On_stock from './components/Pages/Total_number_of_vehicle/On_stock';
import Maintenance from './components/Pages/Total_number_of_vehicle/Maintenance';
import Company from './components/Pages/Users/Company';
import Cargo from './components/Pages/Users/Cargo';
import Cargo_registration from './components/Pages/Registration/Cargo_registration'
import Cargo_detail from './components/Pages/Users/Cargo_detail'
import AddItem from './components/Pages/Settings/AddItem';
import Individual from './components/Pages/Users/Individual';
import Accident from './components/Pages/alert/Accident';
import Driver from './components/Pages/alert/Driver';
import Off_road from './components/Pages/alert/Off_road';
import Parked from './components/Pages/Total_number_of_vehicle/Parked';
import AccidentHistory from './components/Pages/alert/AccidentHistory';
import DriverHistory from './components/Pages/alert/DriverHistory';
import OffRoadHistory from './components/Pages/alert/OffRoadHistory';
import Total_Drivers from './components/Pages/Drivers/Total_Drivers';
import Manage_profile from './components/Pages/Manage_Profile/Manage_profile';
import Driver_OnRoute from './components/Pages/Drivers/Driver_OnRoute';
import Assigned_Driver from './components/Pages/Drivers/Assigned_Driver';
import UnAssigned_Driver from './components/Pages/Drivers/UnAssigned_Driver';
import Permit from './components/Pages/Drivers/Permit';
import SignIn from './components/Pages/Sign in page/SignIn';
import AssigneDriver from './components/Pages/Total_number_of_vehicle/AssigneDriver';
import ChangeDriver from  './components/Pages/Total_number_of_vehicle/ChangeDriver'
import Vehicle_Detail from './components/Pages/Users/Vehicle_Table';
import Market_Progress from './components/Pages/Marketing/Market_Progress'
import FinishedWorks from './components/Pages/Marketing/FinishedWorks'
import Settingtable from './components/Pages/Settings/Settingtable';
import ForgateConfirm from './components/Pages/Sign in page/ForgateConfirm'; 
import Confirm from './components/Pages/Sign in page/Confirm'; 
import FinishedMarketDetail from './components/Pages/Marketing/FinishedMarketDetail'
class App extends Component{
  render(){
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<SignIn />}></Route>  
        <Route path='/ForgateConfirm' element={<ForgateConfirm/>}></Route>
        <Route path='/Confirm' element={<Confirm/>}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route> 
        <Route path="/users" element={<Users />}></Route>
        <Route path="/vehicle_detail/:id" element={<Vehicle_detail></Vehicle_detail>}></Route> 
        <Route path="/User_edit/:role/:id/:companyID" element={<Users_edit />}></Route>
        <Route path="/Company_registration" element={<Company_registration />}></Route>
        <Route path="/individual" element={<Individual_registration />}></Route>
        <Route path="/Total_number_of_vehicle" element={<Total_number_of_vehile />}></Route>
        <Route path="/tracking" element={<Tracking />}></Route>
        <Route path="/marketing" element={<Marketing />}></Route>
        <Route path="/Market_Progress/:id" element={<Market_Progress/>}></Route>
        <Route path="/FinishedWorks" element={<FinishedWorks/>}></Route>
        <Route path="/FinishedMarketDetail/:id" element={<FinishedMarketDetail/>}></Route>
        <Route path="Post_market/:id" element={<Post_market/>}></Route>
        <Route path="/off_road" element={<Off_road />}></Route>
        <Route path="/vehicle_detail" element={<Vehicle_detail />}></Route>
        <Route path="/message_overview" element={<Message_overview />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/settingss" element={<Settingss />}></Route>
        <Route path="/Settingtable" element={<Settingtable />}></Route>
        <Route path="/report" element={<Report />}></Route>
        <Route path="/report_detail/:id/:platenumber" element={<Report_detail />}></Route>
        <Route path="/popup" element={<PopUp />}></Route>
        <Route path="/set_trip/:vehicle/:driver" element={<Set_Trip />}></Route>
        <Route path="/trip_history" element={<Trip_history />}></Route> 
        <Route path="/avialable_trip" element={<Avialable_trip />}></Route>
        <Route path="/on_route" element={<On_route />}></Route>
        <Route path="/on_stock" element={<On_stock />}></Route>
        <Route path="/maintenance" element={<Maintenance />}></Route>
        <Route path="/company" element={<Company />}></Route>
        <Route path="/AddItem" element={<AddItem/>}></Route>
        <Route path="/cargo" element={<Cargo />}></Route>
        <Route path="/cargo/:id" element={<Cargo_detail />}></Route>
        <Route path='/Cargo_registration' element={<Cargo_registration />} ></Route>
        <Route path="/register_individual" element={<Individual />}></Route>
        <Route path="/accident" element={<Accident />}></Route>
        <Route path="/driver" element={<Driver />}></Route> 
        <Route path="/parked" element={<Parked />}></Route> 
        <Route path="/AccidentHistory" element={<AccidentHistory />}></Route> 
        <Route path="/DriverHistory" element={<DriverHistory />}></Route> 
        <Route path="/OffRoadHistory" element={<OffRoadHistory />}></Route> 
        <Route path="/Total_Drivers" element={<Total_Drivers />}></Route> 
        <Route path="/Manage_profile" element={<Manage_profile />}></Route>
        <Route path="/Driver_OnRoute" element={<Driver_OnRoute />}></Route> 
        <Route path="/Assigned_Driver" element={<Assigned_Driver />}></Route> 
        <Route path="/UnAssigned_Driver" element={<UnAssigned_Driver />}></Route> 
        <Route path="/Permit" element={<Permit />}></Route>
        <Route path="/AssignDriver/:plateNumber/:ownerId" element={<AssigneDriver />}></Route> 
        <Route path="/ChangeDriver/:plateNumber/:ownerId" element={<ChangeDriver />}></Route> 

      </Routes>
    </div>
    
  );
}
}

export default App;
