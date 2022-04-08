import IconInput from "../../CP/IconInput/IconInput";
import React, {useContext, useEffect, useState} from "react";

import "../login.css"
import usernameSVG from "../../assets/Icons/email.svg"
import passwordSVG from "../../assets/Icons/lock.svg"
import {Link} from "react-router-dom";
import {APIContext} from "../../../Contexts/APIContext";

const LoginForm = (signup=false) => {

    const error_message = "Username or Password incorrect!"
    const { access, setAccess } = useContext(APIContext)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [signupMessage, setSignupMessage] = useState("");

    useEffect(() => {
        document.title = "RESTify"
        if(signup){
            setSignupMessage("Account Created Successfully")
        }
    }, []);


    function update(event) {
        if (event.target.name === 'username')  { setUsername(event.target.value) }
        if (event.target.name === 'password')  { setPassword(event.target.value) }
        setSignupMessage("")
    }


    const loginAPI = event => {
        event.preventDefault();
        fetch("/accounts/login/", {

            // Adding method type
            method: "POST",

            // Adding body or contents to send
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
            .then(([data,response]) => {
                    if (response.status === 401){
                        setError(error_message)
                        setPassword("")
                    }
                    if (response.status === 200){
                        setAccess(data.access)
                        localStorage.setItem('access', data.access)
                        console.log("sucesss")
                    }

            })

    }
    // axios.post("/accounts/login/", {
    //
    //     // Adding body or contents to send
    //     body: JSON.stringify({
    //         username: username,
    //         password: password,
    //     }),
    // }).then( (result) => {
    //     console.log(result)
    // })

    return <>
            <div className="col-lg-4  login-container">
                <h3>Login</h3>
                <form onSubmit={loginAPI}>
                    { signup? <div className="fw-bold text-success text-center">{signupMessage}</div> : ""}
                    <IconInput icon={usernameSVG} place_holder={"Username"} input_name={"username"} value1={username} update={update} />
                    <IconInput icon={passwordSVG} place_holder={"Password"} input_name={"password"} value1={password} update={update} type={"password"} />

                    <button className="form-control btn btn-outline-primary shadow-none rounded-pill">LOG IN</button>
                    <div className="text-danger d-flex justify-content-center">{error}</div>
                </form>
                <hr/>
                <h5 className={"login-h3-h5 text-center"}>New Here?</h5>
                <Link to={'/signup'} className={"form-control btn btn-outline-primary  shadow-none rounded-pill"}>CREATE AN ACCOUNT</Link>
            </div>
        </>


}
export default LoginForm