import profileSVG from "../../assets/Icons/profile.svg"
import avatar from "../../assets/Profile/avatar.png"
import {Link} from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";

const ProfileDropDown = () => {

    const [image, setImage] = useState("")

    useEffect(() => {
        getProfileAPI()
    }, []);

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
            {/*<Dropdown className="navbar-inline shadow-none dropdown-toggle-background ">*/}
            {/*    <Dropdown.Toggle variant={"dark"} className="btn shadow-none navbar-button-styling  dropdown-toggle-background" >*/}
            {/*        <img src={profileSVG} className={""}/>Profile*/}
            {/*    </Dropdown.Toggle>*/}

            {/*    <Dropdown.Menu >*/}
            {/*        <Link to={"/profile/"} className={"select-profile"} style={{ textDecoration: 'none'}}>*/}

            {/*            <Dropdown.Item href="/profile" className={"select-profile profile-name-text "}>*/}
            {/*                    <img src={image} className="profile-avatar avatar-img " alt=""/>*/}
            {/*                    {username}*/}
            {/*            </Dropdown.Item>*/}
            {/*</Link>*/}

            {/*    </Dropdown.Menu>*/}
            {/*</Dropdown>*/}

            <div className="dropdown navbar-dropdown">
                <button className="btn  navbar-button-styling dropdown-toggle border05" type="button" id="dropdownprofilebutton"
                        data-bs-toggle="dropdown" aria-expanded="false"><img src={profileSVG} alt=""/>Profile
                </button>

                <ul className="dropdown-menu navbar-background dropdown-padding">
                    <li className={"select-profile"}>
                        <Link to="/profile" className="nav-dropdown-item dropdown-item nav-dropdown-item">
                        <img src={image} className="fw-bold profile-avatar avatar-img " alt=""/>PROFILE</Link>
                    </li>
                </ul>
            </div>

        </>
    )

}

export default ProfileDropDown