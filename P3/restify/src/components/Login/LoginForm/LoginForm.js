import React, {useContext, useEffect, useState} from "react";

import "../login.css"
import usernameSVG from "../../assets/Icons/email.svg"
import passwordSVG from "../../assets/Icons/lock.svg"
import {Link, Navigate} from "react-router-dom";
import LoginInput from "../LoginInput/LoginInput";

const LoginForm = () => {

    const error_message = "Username or Password Invalid!"
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [navi, setNavi] = useState("");


    useEffect(() => {
        document.title = "RESTify"
        // FIXME FIX THIS WHEN FEED PAGE DONE
        // if(localStorage.getItem("access") !== null) {
        //     setNavi("true")
        // }
    }, []);


    function update(event) {
        if (event.target.name === 'username')  { setUsername(event.target.value) }
        if (event.target.name === 'password')  { setPassword(event.target.value) }
        setError("")
    }


    const loginAPI = event => {
        event.preventDefault();
        if(username.length < 1 || password.length < 8) {
            setError(error_message)
        }
        else {
            fetch("/accounts/login/", {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    return Promise.all([response.json(), response])
                })
                .then(([data, response]) => {
                    if (response.status === 401) {
                        setError(error_message)
                        setPassword("")
                    }
                    if (response.status === 200) {
                        localStorage.setItem('access', data.access)
                        setNavi("true")
                    }
                })

        }
    }

    return <>
        {navi? <Navigate to="/home/"/> : ""}
            <div className="col-lg-4  login-container">
                <h3 className={"login-h3-h5"}>Login</h3>
                <form onSubmit={loginAPI}>
                    <LoginInput icon={usernameSVG} place_holder={"Username"} input_name={"username"} value1={username} update={update} />
                    <LoginInput icon={passwordSVG} place_holder={"Password"} input_name={"password"} value1={password} update={update} type={"password"} />

                    <button className="form-control login-form-control btn btn-outline-primary shadow-none rounded-pill">LOG IN</button>
                    <div className=" fw-bold text-danger d-flex justify-content-center">{error}</div>
                </form>
                <hr/>
                <h5 className={"login-h3-h5 text-center"}>New Here?</h5>
                <Link to={'/signup'} className={"form-control login-form-control btn btn-outline-primary  shadow-none rounded-pill"}>CREATE AN ACCOUNT</Link>
            </div>
        </>

}
export default LoginForm