import React from "react";

const Company = () => {
  const jwt = JSON.parse(localStorage.getItem("jwt")); // Getting the token from login api
  const ApiData = JSON.parse(localStorage.getItem("ApiData"));
  const options = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  const url2 =
    "http://164.90.174.113:9090/Api/Admin/All/VehicleOwners/Role/owner";
  return <div>Company</div>;
};

export default Company;
