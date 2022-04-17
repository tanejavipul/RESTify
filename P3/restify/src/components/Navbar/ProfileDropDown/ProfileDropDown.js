import profileSVG from "../../assets/Icons/profile.svg"
import avatar from "../../assets/Profile/avatar.png"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const ProfileDropDown = ({profileUpdate}) => {

    const [image, setImage] = useState("")

    useEffect(() => {
        getProfileAPI()
    }, []);

    useEffect(() => {
        getProfileAPI()
    }, [profileUpdate]);



    const getProfileAPI = event => {
        axios.get(`/accounts/profile/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`
            },
        }).then((resp) => {
            if (resp.status === 200) {
                setImage(resp.data.avatar)
            } else {
                setImage(avatar)
            }
        });
    }



    return (
        <>
            <div className="dropdown navbar-dropdown">
                <button className="btn  navbar-button-styling dropdown-toggle border05" type="button" id="dropdownprofilebutton"
                        data-bs-toggle="dropdown" aria-expanded="false"><img src={profileSVG} alt=""/>Profile
                </button>
                <ul className=" dropdown-menu-down-fix dropdown-menu navbar-background dropdown-padding">
                    <li className={"select-profile"}>
                        <Link to="/profile" className=" fw-bold nav-dropdown-item dropdown-item nav-dropdown-item">
                        <img src={image} className="profile-avatar avatar-img" alt=""/>PROFILE</Link>
                    </li>
                </ul>
            </div>

        </>
    )

}

export default ProfileDropDown