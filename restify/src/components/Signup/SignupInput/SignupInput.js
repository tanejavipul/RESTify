import React from 'react';
import "../signup.css"

const SignupInput = ({icon, place_holder, input_name, //first box
                       req = true, type='text',update, bold=false,//predefined
                       error, value1 }) => {  //error handling


    return <>

        <div className="text-danger px-5">{(error) ? error : ""}</div>
        <div className="input-group mb-3">
            <span className="input-group-text left-rounded-pill login-signup-icons">
                <img src={icon} alt=""/>
            </span>
            <input type={type} className={" form-control login-form-control right-rounded-pill shadow-none " +
                (error ? "is-invalid " : " ") + ((value1 !== "" && error === "") ? " is-valid " : " ") +
                (bold? " placeholder-bold " : " ")}
                   placeholder={place_holder} name={input_name} required={req} value={value1}
                   onChange={event => update(event)}/>
        </div>

    </>
}

export default SignupInput