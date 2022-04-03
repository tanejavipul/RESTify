import {useEffect, useState} from "react";

import "../../Login/login.css"

const LogoName = () => {

    return (

        <div className="col-lg-7">
            <div className="align-b">
                <img src={require('../../assets/Restaurant-Logo/restaurant-logo.png')} height="110px"
                     className="float-left"/>
                <h1 className="nav-logo-color d-inline align-bottom">RESTify</h1>
            </div>
        </div>

    )

}
export default LogoName