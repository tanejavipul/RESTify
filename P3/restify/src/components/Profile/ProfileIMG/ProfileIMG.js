import {useEffect, useState} from "react";
import avatar from "../../assets/Profile/avatar.png"
import axios from "axios";

const ProfileIMG = ({profileUpdate}) => {

    const [image, setImage] = useState("")
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        getProfileAPI()
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setSuccess(false);
        }, 3000);    }, [success]);

    const ImageUploader = event => {
        const formData = new FormData();
        formData.append(
            'avatar',
            event.target.files[0],
            event.target.files[0].name
        )
        axios.put('/accounts/profile/edit/', formData, {
            headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
        }).then((resp) => {
            setSuccess(true)
            profileUpdate(11)
            setImage(resp.data.avatar)
        })
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
    console.log(success)


    return (
        <>
            <div className="col-lg-12">
                <label htmlFor="avatar-input" className="avatar-img mb-3">
                    <img src={image} className="signup-img img-thumbnail img-thumbnail-profile" alt="..."/>
                </label>
                {(success !== true) ?
                <label htmlFor="avatar-input" className="label-file-profile fw-bold ">
                    CHANGE PHOTO
                    <input id="avatar-input" type="file" onChange={event => ImageUploader(event)} className="btn shadow-none  avatar-btn"/>
                </label> : ""}
                {(success === true) ?  <span className={"text-success success-file-profile fw-bold"}>Profile Picture Updated Successfully</span> : "" }
            </div>

        </>
    )

}
export default ProfileIMG