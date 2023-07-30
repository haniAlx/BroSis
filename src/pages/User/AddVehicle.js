import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaStarOfLife } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import { showErrorMessage } from "../../components/SwalMessages";
import { mainAPI } from "../../components/mainAPI";

const CustomInput = ({ value, name, label, type }) => {
  return (
    <div className="flex-grow">
      <label>{label}</label>
      <input name={name} type={type} />
    </div>
  );
};

const AddVehicle = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  const apiVehicleCatagory = `${mainAPI}/Api/Admin/All/VehicleCatagory`;
  const [loading, setLoading] = useState(true);
  const [vehicleCatagory, setVehicleCatagory] = useState([]);
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  const options = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  const vehicleinputForms = [
    {
      label: "Vehicle Name",
      name: "vehicleName",
      type: "text",
      placeholder: "Vehicle Name",
    },
    {
      label: "PlateNumber",
      name: "plateNumber",
      type: "number",
      placeholder: "Plate Number",
    },
    {
      label: "ManuFacture Date",
      name: "manufactrueDate",
      type: "date",
      placeholder: "Manufacture Date",
    },
    {
      label: "Device ID",
      name: "deviceID",
      type: "text",
      placeholder: "Device ID",
    },
    {
      label: "Capacity",
      name: "capacity",
      type: "text",
      placeholder: "Capactiy",
    },
  ];
  const handleFormSubmit = (formdata) => {
    console.log(formdata);
  };
  const getVehicleCatagory = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiVehicleCatagory, options);
      if (res.status == 401) {
        //showErrorMessage();
        showErrorMessage({ message: "401 server respond" });
      }
      const data = await res.json();
      if (data && res.ok) {
        setVehicleCatagory(data.vehicleCatagories);
      }
    } catch (e) {
      showErrorMessage(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getVehicleCatagory();
  }, []);
  return (
    <div className="main-bar">
      <div
        style={{
          display: "flex",
          columnGap: "10px",
          alignItems: "center",
        }}
      >
        <MdKeyboardArrowLeft size={30} />
        <Link to={"/users"}>Back To Users</Link>
      </div>
      <div className="manage-window  detail-content mx-auto">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <p className="detail-part">Company Information</p>
          <hr />
          <div
            style={{
              display: "flex",
              columnGap: "20px",
              flexWrap: "wrap",
            }}
          >
            {/* LOOPING THROUGH VEHICLE INPUT FORMS */}
            {vehicleinputForms.map((inputs, index) => (
              <div className="flex-grow" key={index}>
                <label>
                  {inputs.label} <FaStarOfLife color="red" size={8} />{" "}
                </label>
                <div className="" style={{ marginBottom: "10px" }}>
                  <input
                    name={inputs.name}
                    type={inputs.type}
                    placeholder={inputs.placeholder}
                    {...register(inputs.name, {
                      required: `${inputs.label} is required`,
                    })}
                    className="align-left-m0"
                  />
                  <span
                    style={{
                      fontSize: "12px",
                      color: "red",
                    }}
                  >
                    {errors ? errors[inputs.name]?.message : ""}
                  </span>
                </div>
              </div>
            ))}
            {/* ADDING SELECT TAGS */}
            <div className="flex-grow">
              <label>Vehicle Catagory</label>
              <select
                name="vehicleCatagory"
                {...register("vehicleCatagory", {
                  required: `${"Vehicle Catagory"} is required`,
                })}
                className="align-left-m0"
              >
                <option value={""}>Select Catagory</option>
                {vehicleCatagory.map((item, index) => (
                  <option value={item.catagory} key={index}>
                    {item.catagory}
                  </option>
                ))}
              </select>
              <span
                style={{
                  fontSize: "12px",
                  color: "red",
                }}
              >
                {errors ? errors["vehicleCatagory"]?.message : ""}
              </span>
            </div>
            <div className="flex-grow " style={{}}>
              <label>Vehicle Condition</label>
              <select
                name="vehicleCondition"
                {...register("vehicleCondition", {
                  required: `${"vehicleCondition"} is required`,
                })}
                className="align-left-m0"
              >
                <option value={""}>Select Condition</option>
                <option value={"old"}>old</option>
                <option value={"used"}>used</option>
                <option value={"new"}>new</option>
              </select>
              <span
                style={{
                  fontSize: "12px",
                  color: "red",
                }}
              >
                {errors ? errors["vehicleCondition"]?.message : ""}
              </span>
            </div>
          </div>
          <button className="btn" onClick={() => console.log(errors)}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
