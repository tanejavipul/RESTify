import React from "react";

const ProfileInput = ({name, placeHolder, label, value, update, error}) => {


    return <>
        <div className="col-lg-6">
            <div className="input-group mb-3">
                    <label htmlFor={name} className="col-4 profile-label">{label + ":"}</label>

                <input id={name}
                       type="text" className={"form-controlAdd form-control login-form-control col-8 input-text-styling shadow-none"}
                       placeholder={placeHolder} name={name} required value={value} onChange={event => update(event)}/>
            </div>
            <div>
                {(error) ?
                    <span htmlFor={name} className="fw-bold col-4 profile-label text-danger">{label + " ERROR: " + error}</span> : ""}
            </div>
        </div>
    </>

}
export default ProfileInput