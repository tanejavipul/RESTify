import "./navbar.css"
import restLogo from "../assets/Restaurant-Logo/restaurant-logo.png"
import {Link, Navigate} from "react-router-dom";

import searchSVG from "../assets/Icons/search.svg"
import restSVG from "../assets/Icons/restaurant.svg"
import logoutSVG from "../assets/Icons/logout.svg"
import ProfileDropDown from "./ProfileDropDown/ProfileDropDown";
import NotificationsDropDown from "./NotificationsDropDown/NotificationsDropDown";
import OwnerDropDown from "./OwnerDropDown/OwnerDropDown";
import React, {useEffect, useState} from "react";
import axios from "axios";


const Navbar = ({profileUpdate}) => {
    const [restID, setRestID] = useState(-1);
    const [nav, setNav] = useState(1);


    useEffect(() => {
        getRest()
    }, []);

    const getRest = () => {
        axios.get(`/restaurants/id/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`
            },
        }).then((resp) => {
            if (resp.status === 200) {
                setRestID(resp.data.id)
            }
        }).catch(e => {
            console.log(e.response.status)
            if(e.response.status === 404) {
                setRestID(-1)
            }
            if(e.response.status === 401) {
                deleteLogin()
                setNav(-1)

            }
        });
    }

    function deleteLogin() {
        localStorage.removeItem("access")
    }



    return (
        <>
            {(nav === -1)? <Navigate to="/"/> : ""}
            <nav className="navbar  navbar-background fixed-top">
                <div className="container-fluid">
                    <Link to="/home" className="navbar-brand navbar-logo-color">
                        <img src={restLogo} height="28" className="d-inline-block align-text-top"/> Restify
                    </Link>
                    <div className="ms-auto">
                        {/*<span className="badge badge-light"></span>*/}
                        <Link to="/search" className="btn  navbar-button-styling"> <img src={searchSVG}/>Search</Link>
                        {(restID !== -1) ?
                            <Link to={"/restaurant/"+ restID} className="btn  navbar-button-styling">
                                <img src={restSVG}/>Restaurant</Link> : ""}
                        <NotificationsDropDown/>
                        {(restID !== -1) ?
                            <OwnerDropDown/> : ""}
                        {/* ADD NOTIFICATIONS*/}
                        <ProfileDropDown profileUpdate={profileUpdate}/>
                        <Link to="/" onClick={()=>deleteLogin()} className="btn  navbar-button-styling"> <img src={logoutSVG}/>Logout</Link>
                    </div>
                </div>
            </nav>


        </>
    )

}

export default Navbar