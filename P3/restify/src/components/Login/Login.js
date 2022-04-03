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
            <div id="intro">
                <div className="mask d-flex align-items-center h-100 tone-down-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7">
                                <LogoName/>
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