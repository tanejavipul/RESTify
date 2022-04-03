import React from 'react';
import {useState} from "react";

const IconInput = ({icon, place_holder, input_name, two = false, place_holder2 = "", input_name2 = "",
                       req = true, value1, value2, update}) => {

    return <>
        <div className="input-group mb-3">
                <span className="input-group-text left-rounded-pill login-signup-icons">
                    <img src={icon}/>
                </span>
                <input type={"text"} className={"form-control right-rounded-pill shadow-none"}
                       placeholder={place_holder} name={input_name} required={req} value={value1} onChange={event => update(event)}/>
                {two === true ? <input type={"text"} className={"form-control right-rounded-pill shadow-none"}
                                       placeholder={place_holder2} name={input_name2} required={req} value={value2} onChange={event => update(event)}/> : <></>}
            </div>
        </>
}

export default IconInput