import {useEffect, useState} from "react";
import ProfileInput from "../ProfileInput/ProfileInput";
import ProfileIMG from "../ProfileIMG/ProfileIMG";


const ProfileForm = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    return (
        <>
            <h2 className="profile-h2-h4">Edit Profile</h2>
            <ProfileIMG/>
            <form className="row mx-0">
                <ProfileInput name={"firstname"} placeHolder={"First Name"} label={"FIRST NAME"} value={firstName}/>
                <ProfileInput name={"lastname"} placeHolder={"Last Name"} label={"LAST NAME"} value={lastName}/>
                <ProfileInput name={"email"} placeHolder={"Email"} label={"EMAIL"} value={email}/>
                <ProfileInput name={"phone"} placeHolder={"phone"} label={"PHONE"} value={phone}/>
                <div className="col-9"> </div>
                <div className="align-items-end col-3">
                    <input value="SAVE CHANGES" type="submit" className="save-btn btn shadow-none save-btn"/>
                </div>
            </form>
        </>
    )

}
export default ProfileForm