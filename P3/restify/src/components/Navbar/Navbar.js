import "./navbar.css"
import restLogo from "../assets/Restaurant-Logo/restaurant-logo.png"
import {Link} from "react-router-dom";

import searchSVG from "../assets/Icons/search.svg"
import homeSVG from "../assets/Icons/home.svg"
import restSVG from "../assets/Icons/restaurant.svg"
import logoutSVG from "../assets/Icons/logout.svg"
import ProfileDropDown from "./ProfileDropDown/ProfileDropDown";
import NotificationsDropDown from "./NotificationsDropDown/NotificationsDropDown";
import OwnerDropDown from "./OwnerDropDown/OwnerDropDown";


const Navbar = ({profileUpdate}) => {



    return (
        <>
            <nav className="navbar  navbar-background fixed-top">
                <div className="container-fluid">
                    <Link to="/home" className="navbar-brand navbar-logo-color">
                        <img src={restLogo} height="28" className="d-inline-block align-text-top"/> Restify
                    </Link>
                    <div className="ms-auto">
                        {/*<span className="badge badge-light"></span>*/}
                        <Link to="/profile" className="btn  navbar-button-styling"> <img src={searchSVG}/>Search</Link>
                        <Link to="/profile" className="btn  navbar-button-styling"> <img src={homeSVG}/>Home</Link>
                        <Link to="/profile" className="btn  navbar-button-styling"> <img src={restSVG}/>Restaurant</Link>
                        <NotificationsDropDown/>
                        <OwnerDropDown/>
                        {/* ADD NOTIFICATIONS*/}
                        <ProfileDropDown profileUpdate={profileUpdate}/>
                        <Link to="/profile" className="btn  navbar-button-styling"> <img src={logoutSVG}/>Logout</Link>
                    </div>
                </div>
            </nav>


        </>
    )

}

export default Navbar