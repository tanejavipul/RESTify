import React, {useEffect, useState} from "react";


const ProfileInput = ({name, placeHolder, label, value}) => {


    return <>
        <div className="col-lg-6">
            <div className="input-group mb-3">
                <label htmlFor={name} className="col-4 profile-label">{label + ":"}</label>
                <input id={name} type="text" className="form-control col-8 input-text-styling shadow-none"
                       placeholder={placeHolder}
                       name={name} required value={value}/>
            </div>
        </div>
    </>

}
export default ProfileInput