import React, {useEffect, useState} from "react";

import IconInput from "../../CP/IconInput/IconInput";
import {Navigate} from "react-router-dom";

import nameBadgeSVG from "../../assets/Icons/name_badge.svg"
import usernameSVG from "../../assets/Icons/email.svg"
import emailSVG from "../../assets/Icons/mail.svg"
import phoneSVG from "../../assets/Icons/smartphone.svg"
import passwordSVG from "../../assets/Icons/lock.svg"
import confirmPasswordSVG from "../../assets/Icons/enhanced_lock.svg"
import {Link} from "react-router-dom";
import {
    basicLengthValidation,
    emailValid,
    nameValid,
    pass1Valid,
    pass2Valid,
    phoneValid,
    userValid
} from "../../CP/SignUpFormValidation/SignUpFormValidation";

const SignupForm = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const [firstnameError, setFirstNameError] = useState("")
    const [lastnameError, setLastNameError] = useState("")
    const [userError, setUserError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [phoneError, setPhoneError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [password2Error, setPassword2Error] = useState("")

    const [success, setSuccess] = useState("")
    const [submitError, setSubmitError] = useState("")

    useEffect(() => {
        nameValid(firstName, lastName, setFirstNameError, setLastNameError)
    }, [firstName, lastName])

    useEffect(() => {
        userValid(username, setUserError)
    }, [username])

    useEffect(() => {
        pass1Valid(password, setPasswordError)
        pass2Valid(password, password2, setPassword2Error)
    }, [password, password2])

    useEffect(() => {
        phoneValid(phone, setPhoneError)
    }, [phone])

    useEffect(() => {
        emailValid(email, setEmailError)
    }, [email])


    function update(event) {
        if (event.target.name === 'first-name') {
            setFirstName(event.target.value)
        }
        if (event.target.name === 'last-name') {
            setLastName(event.target.value)
        }
        if (event.target.name === 'username') {
            setUsername(event.target.value)
        }
        if (event.target.name === 'email') {
            setEmail(event.target.value)
        }
        if (event.target.name === 'phone') {
            setPhone(event.target.value)
        }
        if (event.target.name === 'password1') {
            setPassword(event.target.value)
        }
        if (event.target.name === 'password2') {
            setPassword2(event.target.value)
        }
        setSubmitError("")
        setSuccess("")
    }

    const signupAPI = event => {
        event.preventDefault();
        const check =
            nameValid(firstName, lastName, setFirstNameError, setLastNameError) &&
            userValid(username, setUserError) &&
            phoneValid(phone, setPhoneError) &&
            emailValid(email, setEmailError) &&
            pass1Valid(password, setPasswordError) &&
            pass2Valid(password, password2, setPassword2Error)

        if (check && basicLengthValidation(username, password, firstName, lastName, email)) {
            fetch("/accounts/signup/", {

                // Adding method type
                method: "POST",

                // Adding body or contents to send
                body: JSON.stringify({
                    username: username,
                    password: password,
                    password2: password2,
                    phone: phone,
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    return Promise.all([response.json(), response])
                })
                .then(([data, response]) => {
                    if (response.status === 201) {
                        setSuccess("Account Created Successfully")
                        setFirstName("")
                        setLastName("")
                        setUsername("")
                        setEmail("")
                        setPhone("")
                        setPassword("")
                        setPassword2("")
                    } else {
                        setUserError(data.username)
                        setEmailError(data.email)
                        setPhoneError(data.phone)
                        setPasswordError(data.password)
                    }
                })
        } else {
            setSubmitError("Please Fill Out all Input Forms (Phone is optional)")
        }
    }


    return (<>
            <div className="col signup-container">
                <h3 className={"login-h3-h5"}>Sign Up</h3>

                <form onSubmit={signupAPI}>
                    <IconInput icon={nameBadgeSVG} place_holder={"First Name"} input_name={"first-name"} two={true}
                               place_holder2={"Last Name"} input_name2={"last-name"} value1={firstName}
                               value2={lastName}
                               error={firstnameError} error2={lastnameError} update={update}/>
                    <IconInput icon={usernameSVG} place_holder={"Username"} input_name={"username"} value1={username}
                               update={update} error={userError}/>
                    <IconInput icon={emailSVG} place_holder={"Email"} input_name={"email"} value1={email}
                               update={update}
                               error={emailError}/>
                    <IconInput icon={phoneSVG} place_holder={"+1###-###-#### (optional)"} value1={phone} update={update}
                               input_name={"phone"} req={false} error={phoneError}/>
                    <IconInput icon={passwordSVG} place_holder={"Password"} input_name={"password1"} value1={password}
                               update={update} error={passwordError} type={"password"}/>
                    <IconInput icon={confirmPasswordSVG} place_holder={"Confirm Password"} input_name={"password2"}
                               value1={password2} update={update} error={password2Error} type={"password"}/>
                    <div className="text-danger px-5">{submitError}</div>
                    {success ? <Navigate to="/login-success/" replace={true}/> : ""}
                    <input type="submit" value="SIGN UP"
                           className="form-control btn btn-outline-primary  shadow-none rounded-pill"/>
                </form>
                <hr/>
                <Link to={"/"} className={"form-control btn btn-outline-primary  shadow-none rounded-pill"}>ALREADY HAVE
                    AN ACCOUNT?</Link>
            </div>
        </>
    )

}

export default SignupForm