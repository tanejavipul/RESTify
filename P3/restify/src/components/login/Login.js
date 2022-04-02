import LoginForm from "../CP/Login-Sigup/LoginForm";
import {useEffect, useState} from "react";

import "./login.css"
import usernameSVG from "../assets/icons/email.svg"


const Login = () => {

    console.log("component is rendered")
    const [username, setUsername] = useState(0);
    const [password, setPassword] = useState(0);

    useEffect(() => {
        document.title = "RESTify"
    }, []);

    // useEffect(() => {
    //     console.log("value of celsius changed to " + username )
    // }, [username])


    // const update = isCelsius => value => {
    //     setCelsius(isCelsius ? value : (value - 32) * 5 / 9)
    // }

    return <>
        <LoginForm icon={usernameSVG} place_holder={"username"} input_name={"username"}/>
    </>

}
export default Login