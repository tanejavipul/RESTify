import {useContext, useEffect, useState} from "react";
import ProfileInput from "../ProfileInput/ProfileInput";
import ProfileIMG from "../ProfileIMG/ProfileIMG";
import axios from "axios";


const ProfileForm = () => {

    const [temp, setTemp] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")


    useEffect(() => {
        getProfileAPI()
    }, [temp]);

    function update(event) {
        if (event.target.name === 'firstname') { setFirstName(event.target.value) }
        if (event.target.name === 'lastname')  { setLastName(event.target.value) }
        if (event.target.name === 'email')      { setEmail(event.target.value) }
        if (event.target.name === 'phone')      { setPhone(event.target.value) }
    }



    const getProfileAPI = event => {

        axios.get(`/accounts/profile/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`
            },
        })
            .then((resp) => {
                // could do something here if failed return like oh please sign in otherwise it just doesn't change
                if (resp.status === 200) {
                    setFirstName(resp.data.first_name)
                    setLastName(resp.data.last_name)
                    setPhone(resp.data.phone)
                    setEmail(resp.data.email)
                } else {

                }
            });
    }


    const editProfileAPI = event => {

        axios.post(`/accounts/profile/edit/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`
            },
        })
            .then((resp) => {
                // could do something here if failed return like oh please sign in otherwise it just doesn't change
                if (resp.status === 200) {
                    setFirstName(resp.data.first_name)
                    setLastName(resp.data.last_name)
                    setPhone(resp.data.phone)
                    setEmail(resp.data.email)
                } else {

                }
            });
    }





    return (
        <>
            <h2 className="profile-h2-h4">Edit Profile</h2>
            <ProfileIMG/>
            <form className="row mx-0">
                <ProfileInput name={"firstname"} placeHolder={"First Name"} label={"FIRST NAME"} value={firstName} update={update}/>
                <ProfileInput name={"lastname"} placeHolder={"Last Name"} label={"LAST NAME"} value={lastName} update={update}/>
                <ProfileInput name={"email"} placeHolder={"Email"} label={"EMAIL"} value={email} update={update}/>
                <ProfileInput name={"phone"} placeHolder={"phone"} label={"PHONE"} value={phone} update={update}/>
                <div className="col-9"> </div>
                <div className="align-items-end col-3">
                    <input value="SAVE CHANGES" type="submit" className="save-btn btn shadow-none save-btn"/>
                </div>
            </form>
        </>
    )

}
export default ProfileForm