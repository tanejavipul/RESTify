import {useEffect, useState} from "react";
import avatar from "../../assets/Profile/avatar.png"

const ProfileIMG = () => {

    const [image, setImage] = useState()

    return (
        <>
            <div className="col-lg-12">
                <label htmlFor="avatar-input" className="avatar-img mb-3">
                    <img src={avatar} className="img-thumbnail" alt="..."/> {/*  FIXME  */}
                </label>
                <label htmlFor="avatar-input" className="label-file">
                    CHANGE PHOTO
                    <input id="avatar-input" type="file" className="btn shadow-none avatar-btn"/>
                </label>
            </div>

        </>
    )

}
export default ProfileIMG