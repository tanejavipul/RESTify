
import profileSVG from "../../assets/Icons/profile.svg"
import avatar from "../../assets/Profile/avatar.png"
import {Link} from "react-router-dom";

const ProfileDropDown = () => {

    return (
        <>
            <div className="dropdown navbar-dropdown">
                <button className="btn  navbar-button-styling dropdown-toggle " type="button" id="dropdownprofilebutton"
                        data-bs-toggle="dropdown" aria-expanded="false"><img src={profileSVG} alt=""/>Profile
                </button>

                <ul className="dropdown-menu navbar-background dropdown-padding">
                    <li>
                        <Link to="/profile" className="dropdown-item nav-dropdown-item">
                        <img src={avatar} className="profile-avatar" alt=""/>FULL NAME</Link>
                    </li>
                </ul>
            </div>

        </>
    )

}

export default ProfileDropDown