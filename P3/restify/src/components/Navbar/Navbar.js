import "./navbar.css"
import restLogo from "../assets/Restaurant-Logo/restaurant-logo.png"
import {Link} from "react-router-dom";

import searchSVG from "../assets/Icons/search.svg"
import homeSVG from "../assets/Icons/home.svg"
import restSVG from "../assets/Icons/restaurant.svg"
import notificationsSVG from "../assets/Icons/notifications.svg"
import profileSVG from "../assets/Icons/profile.svg"
import logoutSVG from "../assets/Icons/logout.svg"
import ProfileDropDown from "./ProfileDropDown/ProfileDropDown";


const Navbar = () => {



    return (
        <>
            <nav className="navbar  navbar-background fixed-top">
                <div className="container-fluid">
                    <Link to="/profile" className="navbar-brand navbar-logo-color">
                        <img src={restLogo} height="28" className="d-inline-block align-text-top"/> Restify
                    </Link>
                    <div className="ms-auto">
                        <Link to="/profile" className="btn  navbar-button-styling"> <img src={searchSVG}/>Search</Link>
                        <Link to="/profile" className="btn  navbar-button-styling"> <img src={homeSVG}/>Home</Link>
                        <Link to="/profile" className="btn  navbar-button-styling"> <img src={restSVG}/>Restaurant</Link>
                        {/* ADD NOTIFICATIONS*/}
                        <ProfileDropDown/>
                        <Link to="/profile" className="btn  navbar-button-styling"> <img src={logoutSVG}/>Logout</Link>
                    </div>
                </div>
            </nav>


        </>
    )

}

export default Navbar