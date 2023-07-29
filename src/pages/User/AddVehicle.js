import React from "react";
import { useForm } from "react-hook-form";

const CustomInput = () => {};

const AddVehicle = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const handleFormSubmit = (formdata) => {
    console.log(formdata);
  };
  return (
    <div>
      AddVehicle
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <input
          name="name"
          placeholder="Name"
          type="text"
          {...register("name", { required: "name is required" })}
        />
        <p>{errors ? errors["name"]?.message : ""}</p>
        <button className="btn" onClick={() => console.log(errors)}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;
