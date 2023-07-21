import React from 'react'
import './Signin.css'
import { Link } from 'react-router-dom'
export default function ConfirmPass(){


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
                    <form  className='SigninForm'>
                        <h1>Generate Pin</h1>
                        <div className='Signin  confirm'>
                            <label>Phone number</label>
                            <input type='text' placeholder='Enter your phone number'></input>
                            <label>PIN</label>
                            <input type='password' placeholder='Enter your Pin'/>
                            <label>Password</label>
                            <input type='password' placeholder='Enter your password'/>
                            <label>Confirm Password</label>
                            <input type='password' placeholder='Confirm password'/>
                           <Link to='/'> <p type='button'>Sign in</p> </Link>

                        </div>
                        <button className='signIn-btn'>Sign in</button>
                    </form> 
                
                
                </div>
    </>
    
    )
}