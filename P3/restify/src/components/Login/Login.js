import IconInput from "../CP/IconInput/IconInput";
import {useEffect, useState} from "react";
import LoginForm from "./LoginForm/LoginForm";
import LogoName from "../CP/LogoName/LogoName";


const Login = () => {

    useEffect(() => {
        document.title = "RESTify"
    }, []);



    return (
        <>
            <div id="login">
                <div className="mask d-flex align-items-center h-100 tone-down-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7">
                                <LogoName logoClassName={"login-align-b"}/>
                            </div>
                                <LoginForm/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Login