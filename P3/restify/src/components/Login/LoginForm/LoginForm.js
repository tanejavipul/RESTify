import IconInput from "../../CP/IconInput/IconInput";
import React, {useEffect, useState} from "react";

import "../login.css"
import usernameSVG from "../../assets/Icons/email.svg"
import passwordSVG from "../../assets/Icons/lock.svg"
import {Link} from "react-router-dom";

const LoginForm = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "RESTify"
    }, []);


    function update(event) {
        if (event.target.name === 'username')  { setUsername(event.target.value) }
        if (event.target.name === 'password')  { setPassword(event.target.value) }
    }

    // setError("INVALID USERNAME OR PASSWORD!")
    // TODO ADD API CALL


    return <>
            <div className="col-lg-4  login-container">
                <h3>Login</h3>
                <form>
                    <IconInput icon={usernameSVG} place_holder={"Username"} input_name={"username"} value1={username} update={update}/>
                    <IconInput icon={passwordSVG} place_holder={"Password"} input_name={"password"} value1={password} update={update} type={"password"}/>
                </form>
                <a className={"form-control btn btn-outline-primary  shadow-none rounded-pill"}>Log In</a>
                <div className="text-danger d-flex justify-content-center">{error}</div>
                <hr/>
                <h5 className={"text-center"}>New Here?</h5>
                <Link to={'/signup'} className={"form-control btn btn-outline-primary  shadow-none rounded-pill"}>CREATE AN ACCOUNT</Link>
            </div>
        </>


}
export default LoginForm