import React from 'react';

const NameInput = ({icon, place_holder, input_name, //first box
                      place_holder2 = "", input_name2 = "", //second box
                       req = true, type='text', update, //predefined
                       error , invalid, value1, value2 }) => {  //error handling

    return <>
        <div className="text-danger px-5">{(error) ? error : ""}</div>
        <div className="input-group mb-3">
            <span className="input-group-text left-rounded-pill login-signup-icons">
                <img src={icon} alt=""/>
            </span>
            <input type={type} className={"form-control login-form-control right-rounded-pill shadow-none " +
                ((invalid === 1 || invalid === 3)? "is-invalid " : " ") +
                ((value1 !== "" && (invalid !== 1 || invalid === 3)) ? " is-valid " : " ")}
                   placeholder={place_holder} name={input_name} required={req} value={value1}
                   onChange={event => update(event)}/>

            <input type={type} className={"form-control  login-form-control right-rounded-pill shadow-none" +
                ((value1 !== "" && (invalid === 2 || invalid === 3)) ? " is-invalid " : " ") +
                ((value2 !== "" && (invalid !== 2 || invalid === 3)) ? " is-valid "   : " ")}
                   placeholder={place_holder2} name={input_name2} required={req} value={value2}
                   onChange={event => update(event)}/>
        </div>

    </>
}

export default NameInput