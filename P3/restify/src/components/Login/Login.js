import IconInput from "../CP/IconInput/IconInput";
import {useContext, useEffect, useState} from "react";
import LoginForm from "./LoginForm/LoginForm";
import LogoName from "../CP/LogoName/LogoName";
import loadLocalAccess from "../CP/Access/AccessValidation";
import {APIContext} from "../../Contexts/APIContext";



const Login = (signup=true) => {
    const { access, setAccess } = useContext(APIContext)

    useEffect(() => {
        document.title = "RESTify"
        loadLocalAccess(access, setAccess)
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
                                <LoginForm signup={signup}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Login