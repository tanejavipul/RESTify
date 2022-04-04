import {useEffect} from "react";

import ProfileForm from "./ProfileForm/ProfileForm";
import "./profile.css"
import ProfilePassword from "./ProfilePassword/ProfilePassword";
import ProfileIMG from "./ProfileIMG/ProfileIMG";


const Profile = () => {

    useEffect(() => {
        document.title = "RESTify - Profile"
    }, []);



    return (
        <>
            <div id="profile">
                <div className="mask d-flex align-items-center h-100 tone-down-bg">
                    <div className="container">
                        <div className="row row-content-adjust">
                            <ProfileForm/>
                            <ProfilePassword/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Profile