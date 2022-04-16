import React, {useContext, useEffect, useState} from "react";
import ProfileInput from "../ProfileInput/ProfileInput";
import ProfileIMG from "../ProfileIMG/ProfileIMG";
import axios from "axios";
import {emailValid, phoneValid, singleNameValid} from "../../CP/SignUpFormValidation/SignUpFormValidation";


const ProfileForm = ({profileUpdate}) => {

    const [temp, setTemp] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")


    const [firstNameError, setFirstNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [phoneError, setPhoneError] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")



    useEffect(() => {
        getProfileAPI()
    }, [temp]);

    useEffect(() => {
        singleNameValid(firstName, setFirstNameError)
    }, [firstName]);

    useEffect(() => {
        singleNameValid(lastName, setLastNameError)
    }, [lastName]);

    useEffect(() => {
        emailValid(email, setEmailError)
    }, [email]);

    useEffect(() => {
        phoneValid(phone, setPhoneError)
    }, [phone]);


    function update(event) {
        if (event.target.name === 'firstname') { setFirstName(event.target.value) }
        if (event.target.name === 'lastname')  { setLastName(event.target.value) }
        if (event.target.name === 'email')      { setEmail(event.target.value) }
        if (event.target.name === 'phone')      { setPhone(event.target.value) }
        setError("")
        setSuccess("")
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
        event.preventDefault()
        let check = singleNameValid(firstName, setFirstNameError) && singleNameValid(lastName, setLastNameError) &&
                    emailValid(email, setEmailError) && phoneValid(phone, setPhoneError)
        console.log(singleNameValid(firstName, setFirstNameError), singleNameValid(lastName, setLastNameError))
        console.log(emailValid(email, setEmailError), phoneValid(phone, setPhoneError))
        if(check) {
            axios.put(`/accounts/profile/edit/`,
                {

                    "first_name": firstName,
                    "last_name": lastName,
                    "email": email,
                    "phone": phone
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`
                    },
                })
                .then((resp) => {
                    console.log(resp)
                    // could do something here if failed return like oh please sign in otherwise it just doesn't change
                    if (resp.status === 200) {
                        setFirstName(resp.data.first_name)
                        setLastName(resp.data.last_name)
                        setPhone(resp.data.phone)
                        setEmail(resp.data.email)
                        setSuccess("Save Successful")

                    } else {
                        setFirstNameError(resp.data.firstname)
                        setLastNameError(resp.data.lastname)
                        setPhoneError(resp.data.phone)
                        setEmailError(resp.data.email)
                        setError("Please fix the error above")
                    }

                });
        }
        else {
            setError("To Edit Profile then fix Errors Above")
        }
    }





    return (
        <>
            <h2 className="profile-h2-h4">Edit Profile</h2>
            <ProfileIMG profileUpdate={profileUpdate}/>
            <form className="row mx-0" onSubmit={editProfileAPI}>
                <ProfileInput name={"firstname"} placeHolder={"First Name"} label={"FIRST NAME"} value={firstName}
                              update={update} error={firstNameError}/>
                <ProfileInput name={"lastname"} placeHolder={"Last Name"} label={"LAST NAME"} value={lastName}
                              update={update} error={lastNameError}/>
                <ProfileInput name={"email"} placeHolder={"Email"} label={"EMAIL"} value={email}
                              update={update} error={emailError}/>
                <ProfileInput name={"phone"} placeHolder={"phone"} label={"PHONE"} value={phone}
                              update={update} error={phoneError}/>
                <div className="col-9">
                    <div className={"fw-bold save-error " +
                        ((error !== "") ? " text-danger " : " ") +
                        ((success !== "") ? " text-success " : " ")}>{error}{success}
                    </div>
                </div>
                <div className="align-items-end col-3">

                    <input value="SAVE CHANGES" type="submit" className="save-btn save-btn-profile btn shadow-none"/>

                </div>
            </form>
        </>
    )

}
export default ProfileForm