import React from "react";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { useUserContext } from "../context/UserContext";
import LoadingPage from "../LoadingPage";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [pass, showPass] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const { setCurrentUser } = useUserContext();
  const navigate = useNavigate();
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
    setShowLoading(true);
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
    const api = "http://164.90.174.113:9090";
    const url = `${api}/Api/SignIn/Admin`;
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(result["user"]));
      }

      if (response.ok) {
        console.log("Login successful");
        swal("Successful", "Welcome To Admin DashBoard", "success", {
          buttons: false,
          timer: 2000,
        }).then(() => {
          setCurrentUser(result.user);
          console.log(result.user);
          localStorage.setItem("user", JSON.stringify(result["user"]));
          localStorage.setItem("jwt", JSON.stringify(result["jwt"]));
          navigate("/dashboard");
        });
      } else {
        swal({
          title: "Failed To Login",
          text: `Wrong Password or Username! `,
          icon: "error",
          dangerMode: true,
          buttons: {
            confirm: true,
          },
          cancelButtonColor: "#d33",
          showClass: {
            popup: "animate__animated animate__shakeX",
          },
        });
      }
    } catch (error) {
      console.log(error + "error");
      swal({
        title: "Something Went Wrong?",
        text: `net::ERR_INTERNET_DISCONNECTED `,
        icon: "warning",
        dangerMode: true,
        buttons: [false, true],
        cancelButtonColor: "#d33",
        showClass: {
          popup: "animate__animated animate__shakeX",
        },
      });
      // window.location.href = "/dashboard";
    } finally {
      setShowLoading(false);
    }
  }
  return (
    <>
      {showLoading && <LoadingPage message={"Loging You In please Wait"} />}
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
            className="signInput"
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
              className="signInput"
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
