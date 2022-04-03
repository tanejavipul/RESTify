import {useEffect, useState} from "react";
import LogoName from "../CP/LogoName/LogoName";
import SignupCarousel from "./SignupCarousel/SignupCarousel";
import SignupForm from "./SignupForm/SigninForm";
import "./signup.css"

const Signup = () => {

    useEffect(() => {
        document.title = "RESTify - Signup"
    }, []);


    return (
        <>
            <div id="intro">
                <div className="mask d-flex align-items-center h-100 tone-down-bg">
                    <div className="container">
                        <div className="row">
                            <LogoName/>
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