import React from 'react';
import {useState} from "react";

const LoginForm = ({icon, place_holder, input_name}) => {

    return <>
            <div className="input-group mb3">
                <span className="input-group-text left-rounded-pill login-signup-icons">
                    <img src={icon}/>
                </span>
                <input type={"text"} className={"form-control right-rounded-pill shadow-none"}
                       placeholder={place_holder} name={input_name} required />
            </div>
        </>
}

export default LoginForm



//     < div
// className = "input-group mb-3" >
//     < span
// className = "input-group-text left-rounded-pill login-signup-icons" >
//     < img
// src = "Images/Icons/alternate_email_white.svg"
// alt = "" >
//     < /span>
// <input type="text" className="form-control right-rounded-pill shadow-none" placeholder="Username"
//        name="username" required>
// </div>