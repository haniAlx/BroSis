import React from "react";
import "./Signin.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [pass, showPass] = useState(false);

  const toggleEye = () => {
    showPass(!pass);
  };
  const validation = (e) => {
    e.preventDefault();

    if (username.length == 0 || password.length == 0) {
      setError(true);
    }
    if (username && password) {
      login();
    }
  };
  async function login() {
    const users = { username, password };
    localStorage.setItem("username", username);
    console.log(username);
    let item = { username, password };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer`,
      },
      body: JSON.stringify(item),
    };
    const url = "http://64.226.104.50:9090/Api/SignIn/Admin";
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      localStorage.setItem("user", JSON.stringify(result["user"]));
      localStorage.setItem("user", JSON.stringify(users));

      if (response.ok) {
        console.log("Login successful");
        swal("Successful", "Welcome To Admin DashBoard", "success", {
          buttons: false,
          timer: 2000,
        }).then(() => {
          localStorage.setItem("user", JSON.stringify(result["user"]));
          localStorage.getItem("user");
          localStorage.setItem("jwt", JSON.stringify(result["jwt"]));
          localStorage.getItem("jwt");
          window.location.href = "/dashboard";
        });
      } else {
        swal.fire({
          title: "Failed To Login?",
          text: `Wrong Password or Username! `,
          icon: "error",
          dangerMode: true,
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonColor: "#d33",
          showClass: {
            popup: "animate__animated animate__shakeX",
          },
        });
      }
    } catch (error) {
      console.log(error + "error");
      swal.fire({
        title: "Something Went Wrong?",
        text: `net::ERR_INTERNET_DISCONNECTED `,
        icon: "warning",
        dangerMode: true,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonColor: "#d33",
        showClass: {
          popup: "animate__animated animate__shakeX",
        },
      });
      // window.location.href = "/dashboard";
    }
  }
  return (
    <>
      <div className="SigninWrapper">
        <div className="left-side">
          <div className="left-SideInner">
            <h2>Bazra Tracker System</h2>
            <p>
              This System controles every movement of a driver and deliver its
              package on time.
              <strong>Trusted by Every one</strong>{" "}
            </p>
          </div>
        </div>
        <form className="SigninForm" onSubmit={validation}>
          <h1>Sign in</h1>
          <div className="Signin">
            <label>Phone number</label>
            <input
              type="text"
              id="nameInput"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              name="username"
            ></input>
            {error && username.length <= 0 ? (
              <span className="validateText">please enter your username</span>
            ) : (
              ""
            )}
            <label>Password</label>
            <div className="passWrapper">
              <input
                id="passInput"
                type={pass ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />
              <AiOutlineEye onClick={toggleEye} className="eye" />
            </div>
            {error && password.length <= 0 ? (
              <span className="validateText">please enter your password</span>
            ) : (
              ""
            )}
            <Link to="/ForgatePass">
              {" "}
              <p type="button">Forget Password?</p>{" "}
            </Link>
          </div>
          <button className="signIn-btn">Sign in</button>
        </form>
      </div>
    </>
  );
}
