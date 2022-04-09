import {useEffect, useState} from "react";
import avatar from "../../assets/Profile/avatar.png"
import axios from "axios";

const ProfileIMG = () => {

    const [image, setImage] = useState("")

    useEffect(() => {
        getProfileAPI()
    }, []);

    const ImageUploader = event => {

        setImage(event.target.files[0])
        console.log(event.target.files[0])
    }

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
            <div className="col-lg-12">
                <label htmlFor="avatar-input" className="avatar-img mb-3">
                    <img src={image} className="img-thumbnail" alt="..."/>
                </label>
                <label htmlFor="avatar-input" className="label-file">
                    CHANGE PHOTO
                    <input id="avatar-input" type="file" onChange={event => ImageUploader(event)} className="btn shadow-none avatar-btn"/>
                </label>
            </div>

        </>
    )

}
export default ProfileIMG