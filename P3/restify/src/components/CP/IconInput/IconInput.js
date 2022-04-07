import React from 'react';

const IconInput = ({icon, place_holder, input_name, two = false, place_holder2 = "", input_name2 = "",
                       req = true, value1, value2, update, error ,error2, type='text'}) => {

    return <>
        <div className="text-danger px-5">{(error) ? error : error2}</div>
        <div className="input-group mb-3">
            <span className="input-group-text left-rounded-pill login-signup-icons">
                <img src={icon}/>
            </span>
            <input type={type} className={"form-control right-rounded-pill shadow-none "
                + (error ? "is-invalid " : " ") + ((value1 !== "" && error === "") ? " is-valid " : " ")}
                   placeholder={place_holder} name={input_name} required={req} value={value1}
                   onChange={event => update(event)}/>

            {two === true ?
                <input type={type} className={"form-control right-rounded-pill shadow-none"
                    + (error2 !== "" && value2 !== ""  ? " is-invalid " : " ") + ((value2 !== "" && error2 === "") ? " is-valid " : " ")}
                       placeholder={place_holder2} name={input_name2} required={req} value={value2}
                       onChange={event => update(event)}/> : <></>}
        </div>

    </>
}

export default IconInput