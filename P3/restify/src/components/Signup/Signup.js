import {useEffect} from "react";
import LogoName from "../CP/LogoName/LogoName";
import SignupCarousel from "./SignupCarousel/SignupCarousel";
import SignupForm from "./SignupForm/SignupForm";
import "./signup.css" //TODO causing issues in login

const Signup = () => {

    useEffect(() => {
        document.title = "RESTify - Signup"
    }, []);


    return (
        <>
            <div id="signup">
                <div className="mask d-flex align-items-center h-100 tone-down-bg">
                    <div className="container">
                        <div className="row">
                            <LogoName logoClassName={"signup-align-b"}/>
                            <SignupCarousel/>
                            <SignupForm/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


export default Signup