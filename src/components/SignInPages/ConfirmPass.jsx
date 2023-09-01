import React,{useState} from 'react'
import './Signin.css'
import swal from "sweetalert";
import { Link } from 'react-router-dom'
import { AiOutlineEye } from "react-icons/ai";

export default function ConfirmPass(){

    const [error, setError] = useState(false);
    const [pass, showPass] = useState(false);
    const [confirm, setConfirm]= useState(false)

    let [isConfirmed, setisConfirmed] =useState(false)
    let mess
     let isPin =false
     if(isPin){
        mess = localStorage.getItem("message")
        console.log(mess)

     }
     const toggleEye = (name) => {
     if(name === 'confirm') setConfirm(!confirm)
     else   showPass(!pass);
      };
    const [username, setusername] = useState("");
    const [pin, setpin]= useState("")
    const [newpassword, setnewpassword] =useState("")
    const [confirmPassword, setconfirmpassword]= useState("")
    

    function onSubmit(e)
    {
        e.preventDefault()
        handleConfirm()
    }
    
   /******************************Confirm *********/

   async function handleConfirm() {

   let item = { 
               newpassword,
              confirmPassword,
              username,
              pin
            }
                console.log(item)
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer`, },
        body: JSON.stringify(item),
    };
    const url = "http://164.90.174.113:9090/Api/User/SetPin";
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        localStorage.setItem("message", JSON.stringify(result["message"]));
      const  mess = localStorage.getItem("message");
      console.log(mess)
        if (response.ok) {
            console.log(mess)
            swal("Successful",`${mess}`, "success", { buttons: false, timer: 2000, })
              setTimeout(()=>{setisConfirmed(!isConfirmed)}, 1000)
        } else {
             swal({
                title: "Failed To Change",
                text: `${mess} `,
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
            title: "something went wrong",
            text: `net::ERR_INTERNET_DISCONNECTED`,
            icon: "warning",
            dangerMode: true,
            buttons: {
              confirm: true,
            },
            cancelButtonColor: "#d33",
            showClass: {
              popup: "animate__animated animate__shakeX",
            },
          });
        // window.location.href = "/dashboard"; 
    }
}
    return(
        <>
            <div className='SigninWrapper'>
                <div className='left-side'>
                    <div className='left-SideInner'>
                    <h2>Bazra Tracker System</h2>
                    <p>This System controles every movement of a driver and 
                        deliver its package on time.
                    <strong>Trusted by Every one</strong> </p>
                    <Link to='/'> <p type='button'>Sign in</p> </Link>

                    </div>
                </div>
                    <form  className='SigninForm' onSubmit={onSubmit}>
                        <h1>Change Password</h1>
                        <div className='Signin  confirm'>
                            <label>Phone number</label>
                            <input className="signInput" type='text' 
                            placeholder='Enter your phone number'
                            onChange={e => setusername(e.target.value)} 
                            name="username"
                            ></input>
                            <label>PIN</label>
                            <input className="signInput" type='password'
                             placeholder='Enter your Pin'
                             onChange={e => setpin(e.target.value)}
                                   name="pin"
                                   />
                            <label>Password</label>
                            <div className="passWrapper">
                                <input className="signInput"
                                    id="passInput"
                                    type={pass ? "text" : "password"}
                                    placeholder="Password"
                                    onChange={e => setnewpassword(e.target.value)} 
                                    name="newpassword"
                                />
                                <AiOutlineEye onClick={()=>toggleEye('pass')} className="eye" />
                                </div>
                                {error && newpassword.length <= 0 ? (
                                <span className="validateText">please enter your password</span>
                                ) : (
                                ""
                                )}
                            <label>Confirm Password</label>
                            <div className="passWrapper">
                                <input className="signInput"
                                    id="passInput"
                                    type={confirm ? "text" : "password"}
                                    placeholder="Password"
                                    onChange={e => setconfirmpassword(e.target.value)} 
                                    name='confirmpassword'
                                />
                                <AiOutlineEye onClick={()=>toggleEye('confirm')} className="eye" />
                                </div>
                                {newpassword !== confirmPassword ? (
                                <span className="validateText">password did not match</span>
                                ) : (
                                ""
                                )}
                           <Link to='/'> <p type='button'>Sign in</p> </Link>

                        </div>
                        <button className='signIn-btn'>Change Password</button>
                    </form> 
                
                
                </div>
    </>
    
    )
}