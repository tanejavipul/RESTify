import {useEffect, useState} from "react";


const ProfilePassword = () => {

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPassword2, setNewPassword2] = useState("")

    return (
        <>
            <h4 className="profile-h2-h4 profile-h4">Change Password </h4>
            <form className="row mx-0">
                <div className="input-group mb-3">
                    <label htmlFor="old-pass" className="px-075em profile-label col-4 shadow-none">Old Password</label>
                    <label htmlFor="new-pass" className="px-075em profile-label col-4 shadow-none">New Password</label>
                    <label htmlFor="confirm-new-pass" className="px-075em profile-label col-4 shadow-none">Confirm New
                        Password</label>

                </div>

                <div className="input-group mb-3">
                    <input id="old-pass" type="text" className="form-control input-text-styling shadow-none"
                           placeholder="Old Password"  name="old-pass" required/>

                    <input id="new-pass" type="text" className="form-control  input-text-styling shadow-none"
                           placeholder="New Password" name="new-pass" required/>

                    <input id="confirm-new-pass" type="text" className="form-control  input-text-styling shadow-none"
                           placeholder="Confirm New Password" name="confirm-new-pass" required/>
                </div>
                <div className="col-9"> </div>
                <div className="align-items-end col-3">
                    <input value="SAVE PASSWORD" type="submit" className="save-btn btn shadow-none"/>
                </div>
            </form>

        </>
    )

}
export default ProfilePassword