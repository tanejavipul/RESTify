import React from 'react';
import {useState} from "react";

const IconInput = ({icon, place_holder, input_name}) => {

    return <>
            <div className="input-group mb-3">
                <span className="input-group-text left-rounded-pill login-signup-icons">
                    <img src={icon}/>
                </span>
                <input type={"text"} className={"form-control right-rounded-pill shadow-none"}
                       placeholder={place_holder} name={input_name} required />
            </div>
        </>
}

export default IconInput