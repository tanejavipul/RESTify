import IconInput from "../CP/LoginInput/IconInput";
import {useEffect, useState} from "react";
import LoginForm from "./LoginForm/LoginForm";
import LogoName from "./LogoName/LogoName";


const Login = () => {

    useEffect(() => {
        document.title = "RESTify"
    }, []);



    return (
        <>
            <div id="intro">
                <div className="mask d-flex align-items-center h-100 tone-down-bg">
                    <div className="container">
                        <div className="row">
                                <LogoName/>
                                <LoginForm/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Login