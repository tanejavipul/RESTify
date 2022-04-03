import IconInput from "../../CP/LoginInput/IconInput";
import {useEffect, useState} from "react";

import "../login.css"
import usernameSVG from "../../assets/Icons/email.svg"
import passwordSVG from "../../assets/Icons/lock.svg"

const LoginForm = () => {

    console.log("component is rendered")
    const [username, setUsername] = useState(0);
    const [password, setPassword] = useState(0);

    useEffect(() => {
        document.title = "RESTify"
    }, []);


    return <>
            <div className="col-lg-4  login-container">
                <h3>Login</h3>
                <form>
                    <IconInput icon={usernameSVG} place_holder={"Username"} input_name={"username"}/>
                    <IconInput icon={passwordSVG} place_holder={"Password"} input_name={"password"}/>
                </form>
                <a className={"form-control btn btn-outline-primary  shadow-none rounded-pill"}>Log In</a>
                <hr/>
                <h5 className={"text-center"}>New Here?</h5>
                <a className={"form-control btn btn-outline-primary  shadow-none rounded-pill"}>CREATE AN ACCOUNT</a>
            </div>
        </>


}
export default LoginForm