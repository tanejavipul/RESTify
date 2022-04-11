import React, {useEffect, useState} from "react";
import axios from "axios";
import {singleNameValid} from "../../CP/SignUpFormValidation/SignUpFormValidation";


const ProfilePassword = () => {

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPassword2, setNewPassword2] = useState("")

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {

    }, [oldPassword, newPassword, newPassword2]);


    function update(event) {
        if (event.target.name === 'old-pass')    { setOldPassword(event.target.value) }
        if (event.target.name === 'new-pass')    { setNewPassword(event.target.value) }
        if (event.target.name === 'new-pass2')   { setNewPassword2(event.target.value) }
    }


    const updatePasswordAPI = event => {
        console.log("here")

        event.preventDefault()
        axios.put(`/accounts/profile/edit/`,
            {
                "old_password": oldPassword,
                "new_password": newPassword,
                "new_password2": newPassword2,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`
                },
            })
            .then((resp) => {

                // could do something here if failed return like oh please sign in otherwise it just doesn't change
                if (resp.status === 200) {
                    setOldPassword("")
                    setNewPassword("")
                    setNewPassword2("")
                }
                else {
                    console.log(resp.data)
                }
            //TODO FIXME
            }).catch(function (err) {
                console.log(err)
        })
        ;
    }

    return (
        <>
            <h4 className="profile-h2-h4 profile-h4">Change Password </h4>
            <form className="row mx-0" onSubmit={updatePasswordAPI}>
                <div className="input-group mb-3">
                    <label htmlFor="old-pass" className="px-075em profile-label col-4 shadow-none">OLD PASSWORD</label>
                    <label htmlFor="new-pass" className="px-075em profile-label col-4 shadow-none">NEW PASSWORD</label>
                    <label htmlFor="new-pass2" className="px-075em profile-label col-4 shadow-none">CONFIRM NEW
                        PASSWORD</label>

                </div>

                <div className="input-group mb-3">
                    <input id="old-pass" type="password" className="form-control login-form-control input-text-styling shadow-none" required
                           placeholder="Old Password"  value={oldPassword} name="old-pass"
                           onChange={event => update(event)}/>

                    <input id="new-pass" type="password" className="form-control login-form-control input-text-styling shadow-none" required
                           placeholder="New Password" value={newPassword} name="new-pass"
                           onChange={event => update(event)}/>

                    <input id="new-pass2" type="password" className="form-control login-form-control input-text-styling shadow-none" required
                           placeholder="Confirm New Password" value={newPassword2} name="new-pass2"
                           onChange={event => update(event)}/>
                </div>

                <div className="col-9">
                    <div className={"fw-bold save-error " +
                        ((error !== "") ? " text-danger " : " ") +
                        ((success !== "") ? " text-success " : " ")}>{error}{success}
                    </div>
                </div>
                <div className="align-items-end col-3">
                    <input value="SAVE PASSWORD" type="submit" className="save-btn btn shadow-none"/>
                </div>
            </form>

        </>
    )

}
export default ProfilePassword