import {useEffect, useState} from "react";
import LogoName from "../../CP/LogoName/LogoName";
import {Carousel} from "react-bootstrap";
import IconInput from "../../CP/IconInput/IconInput";

import nameBadgeSVG from "../../assets/Icons/name_badge.svg"
import usernameSVG from "../../assets/Icons/email.svg"
import emailSVG from "../../assets/Icons/mail.svg"
import phoneSVG from "../../assets/Icons/smartphone.svg"
import passwordSVG from "../../assets/Icons/lock.svg"
import confirmPasswordSVG from "../../assets/Icons/enhanced_lock.svg"

const SignupForm = () => {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState()
    const [confirmPass, setConfirmPass] = useState()
    const [error, setError] = useState()





    // console.log(event.target.name)


    function update(event) {
        if (event.target.name === 'first-name')
            setFirstName(event.target.value)
        if (event.target.name === 'last-name')
            setLastName(event.target.value)
        if (event.target.name === 'username')
            setUsername(event.target.value)

        if (event.target.name === 'email')
            setEmail(event.target.value)
        if (event.target.name === 'phone')
            setPhone(event.target.value)
        if (event.target.name === 'password')
            setPassword(event.target.value)
        if (event.target.name === 'confirm-pass')
            setConfirmPass(event.target.value)
    }




    return (
        <>
            <div className="col  login-container">
                <h3>Sign Up</h3>
                <form>
                    <IconInput icon={nameBadgeSVG} place_holder={"First Name"} input_name={"first-name"} two={true}
                               place_holder2={"Last Name"} input_name2={"last-name"} />
                    <IconInput icon={usernameSVG} place_holder={"Username"} input_name={"username"} value1={username} update={update}/>
                    <IconInput icon={emailSVG} place_holder={"Email"} input_name={"email"}/>
                    <IconInput icon={phoneSVG} place_holder={"+1###-###-#### (optional)"} input_name={"phone"} req={false}/>
                    <IconInput icon={passwordSVG} place_holder={"Password"} input_name={"password"}/>
                    <IconInput icon={confirmPasswordSVG} place_holder={"Confirm Password"} input_name={"confirm-pass"}/>
                    <input type="submit" value="SIGN UP" className="form-control btn btn-outline-primary  shadow-none rounded-pill"/>
                    <hr/>
                    <a className="form-control btn btn-outline-primary  shadow-none rounded-pill">ALREADY HAVE AN ACCOUNT?</a>
                </form>
            </div>
        </>
    )

}



export default SignupForm