import {useEffect, useState} from "react";

import ProfileForm from "./ProfileForm/ProfileForm";
import "./profile.css"
import ProfilePassword from "./ProfilePassword/ProfilePassword";
import Navbar from "../Navbar/Navbar";


const Profile = () => {

    const [sendProfileUpdate, setSendProfileUpdate] = useState("")

    useEffect(() => {
        document.title = "RESTify - Profile"
    }, []);


    return (
        <>
            <Navbar profileUpdate={sendProfileUpdate}/>
            <div id="profile">
                <div className="mask d-flex align-items-center h-100 tone-down-bg">
                    <div className="container">
                        <div className="row row-content-adjust">
                            <ProfileForm profileUpdate={setSendProfileUpdate}/>
                            <ProfilePassword/>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Profile