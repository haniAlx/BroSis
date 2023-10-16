import React,{useState} from 'react'
import  './Signin.css'
import swal from "sweetalert";
import { Link } from 'react-router-dom'
export default function ForgatePass(){


    let [isConfirm,setisConfirm] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('');
    let mess
    function onSubmit(e)
    {
        e.preventDefault()
        handleForgate()
    }
    async function handleForgate() {
        let item =
        {
            phoneNumber,
        };
        console.log(item)
        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 
            "Accept": "application/json"},
            body: JSON.stringify(item),
        };
        const url = "http://164.90.174.113:9090/Api/User/GeneratePIN";
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            localStorage.setItem("message", JSON.stringify(result["message"]));
             mess = localStorage.getItem("message");
            if (response.ok) {
                console.log(mess)
                setisConfirm(!isConfirm)
                swal("Get your Pin beffore it's to late ", `${mess}`, "success", { buttons: false, timer: 5000, });
                
            } else {
                console.log("failed");
                swal(`Failed To Register ${mess}`, "error");
            }
        } catch (error) {
            console.error(error);
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
                        <h1>Generate Pin</h1>
                        <div className='Signin'>
                            <label>Phone number</label>
                            <input className="signInput" type='phone'
                             placeholder='Enter your phone number'
                             value = {phoneNumber} onChange={e => {
                                setPhoneNumber(e.target.value)
                                }}
                                name="phoneNumber"
                            ></input>
                           <Link to='/ConfirmPass'> <p type='button'>Confirm Password</p> </Link>

                        </div>
                        <button className='signIn-btn'>Generate</button>
                    </form> 
                
                
                </div>
    </>
    
    )
}