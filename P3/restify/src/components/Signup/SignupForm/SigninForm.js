import {useEffect, useState} from "react";

import IconInput from "../../CP/IconInput/IconInput";

import nameBadgeSVG from "../../assets/Icons/name_badge.svg"
import usernameSVG from "../../assets/Icons/email.svg"
import emailSVG from "../../assets/Icons/mail.svg"
import phoneSVG from "../../assets/Icons/smartphone.svg"
import passwordSVG from "../../assets/Icons/lock.svg"
import confirmPasswordSVG from "../../assets/Icons/enhanced_lock.svg"
import {Link} from "react-router-dom";

const SignupForm = () => {
    // TODO UPDATE SIGNUP_API
    let SIGNUP_API = ""
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


    useEffect(() => {
        nameValid()
    }, [firstName, lastName])

    useEffect(() => {
        userValid()
    }, [username])

    useEffect(() => {
        pass1Valid()
        pass2Valid()
    }, [password, password2])

    useEffect(() => {
        phoneValid()
    }, [phone])

    useEffect(() => {
        emailValid()
    }, [email])


    function update(event) {
        if (event.target.name === 'first-name') { setFirstName(event.target.value) }
        if (event.target.name === 'last-name')  { setLastName(event.target.value) }
        if (event.target.name === 'username')   { setUsername(event.target.value) }
        if (event.target.name === 'email')      { setEmail(event.target.value) }
        if (event.target.name === 'phone')      { setPhone(event.target.value) }
        if (event.target.name === 'password1')  { setPassword(event.target.value) }
        if (event.target.name === 'password2')  { setPassword2(event.target.value) }
    }



    return (<>
            <div className="col signup-container">
                <h3>Sign Up</h3>
                <form>
                    <IconInput icon={nameBadgeSVG} place_holder={"First Name"} input_name={"first-name"} two={true}
                               place_holder2={"Last Name"} input_name2={"last-name"} value1={firstName} value2={lastName}
                               error={firstnameError} error2={lastnameError} c/>
                    <IconInput icon={usernameSVG} place_holder={"Username"} input_name={"username"} value1={username}
                               update={update} error={userError}/>
                    <IconInput icon={emailSVG} place_holder={"Email"} input_name={"email"} value1={email} update={update}
                               error={emailError}/>
                    <IconInput icon={phoneSVG} place_holder={"+1###-###-#### (optional)"} value1={phone} update={update}
                               input_name={"phone"} req={false} error={phoneError}/>
                    <IconInput icon={passwordSVG} place_holder={"Password"} input_name={"password1"} value1={password}
                               update={update} error={passwordError} type={"password"}/>
                    <IconInput icon={confirmPasswordSVG} place_holder={"Confirm Password"} input_name={"password2"}
                               value1={password2} update={update} error={password2Error} type={"password"}/>
                    <input type="submit" value="SIGN UP" onClick={signupAPI} className="form-control btn btn-outline-primary  shadow-none rounded-pill"/>
                </form>
                <hr/>
                {/*<a  className="form-control btn btn-outline-primary  shadow-none rounded-pill"></a>*/}
                <Link to={"/"} className={"form-control btn btn-outline-primary  shadow-none rounded-pill"}>ALREADY HAVE AN ACCOUNT?</Link>
            </div>
        </>
    )

    // TODO FIX
    function signupAPI() {
        console.log("pressed")
        fetch(SIGNUP_API)
            .then(response => response.json())
            .then(json => {

            })
    }


    function nameValid() {
        let output = true
        if(firstName.length < 4 && lastName.length < 4 && firstName !== "" && lastName !== "" ) {
            setFirstNameError("First and last name should be at least a length of 4")
            setLastNameError("")
            output = false
        }
        else if (firstName.length < 4 && firstName !== "")
        {
            setFirstNameError("First name should be at least a length of 4")
            setLastNameError("")
            output = false
        }
        else if (lastName.length < 4 && lastName !== "")
        {
            setLastNameError("Last name should be at least a length of 4")
            setFirstNameError("")
            output = false
        }
        else {
            setFirstNameError("")
            setLastNameError("")
        }

        return output
    }

    function userValid() {
        let output = true
        if(username.length < 4 && username !== "") {
            setUserError("Username must be at least a length of 4 with only have characters and numbers")
            output = false
        }
        else {
            setUserError("")
        }
        return output
    }


    function pass1Valid() {
        let output = true
        if(password.length < 4 && password !== "") {
            setPasswordError("Password must at least be a length of 8")
            output = false
        }
        else {
            setPasswordError("")
        }
        return output
    }

    function pass2Valid() {
        let output = true
        if(password !== password2 && password2 !== "") {
            setPassword2Error("Passwords do not match!")
            output = false
        }
        else {
            setPassword2Error("")
        }
        return output
    }

    function phoneValid(){
        let output = true
        if (phone.match(/^[+][1][(][0-9]{3}[)][-][0-9]{3}[-][0-9]{4}$/g) == null && phone !== ""){
            setPhoneError("Please provide a valid phone number in format +1(###)-###-####")
            output = false
        }
        else
        {
            setPhoneError("")
        }
        return output
    }

    function emailValid(){
        let output = true
        // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
        if (email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g) == null && email !== "") {
            setEmailError("Please provide a valid email address")
            output = false
        }
        else
        {
            setEmailError("")
        }
        return output
    }
}



export default SignupForm