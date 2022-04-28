import {useEffect} from "react";
import LoginForm from "./LoginForm/LoginForm";
import LoginLogo from "./LoginLogo/LoginLogo";



const Login = (signup=false) => {

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
                                <LoginLogo/>
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