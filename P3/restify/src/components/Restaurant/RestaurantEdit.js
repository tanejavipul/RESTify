import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
// import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";
import "./restaurantForms.css";
import avatar from "../assets/Restaurant-Logo/restaurant-logo.png"
import { useNavigate } from 'react-router-dom';
// TODO: Check if user is logged in?
// printing error messages
// updating logo
//pull restaurant from owner, redirect to create restarurant page if no restaurnt exists 404
// POSSIBLE ISSUE: phone validiation on input and differnet validation in backend
// make sure user is logged in, redirect otherwise

function RestaurantEdit(props) {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);

    const [rName, setrName] = useState("");
    const [rAddr, setrAddr] = useState("");
    const [rPhone, setrPhone] = useState("");
    const [rPostal, setrPostal] = useState("");

    const [rLogo, setrLogo] = useState("");
    const [rLogoPreview, setrLogoPreview] = useState("");

    const [rDesc, setrDesc] = useState("");

    const [rImage1, setImage1] = useState("");
    const [rImage2, setImage2] = useState("");
    const [rImage3, setImage3] = useState("");
    const [rImage4, setImage4] = useState("");

    const [rPrevImage1, setPrevImage1] = useState(avatar);
    const [rPrevImage2, setPrevImage2] = useState(avatar);
    const [rPrevImage3, setPrevImage3] = useState(avatar);
    const [rPrevImage4, setPrevImage4] = useState(avatar);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (location.state == null) { //if url was not accessed through restaurant page
            navigate(-1); //go back one page
        } else {
            setrName(location.state.restaurantInfo.name);
            setrAddr(location.state.restaurantInfo.address);
            setrPhone(location.state.restaurantInfo.phone);
            setrPostal(location.state.restaurantInfo.postal);
            setrDesc(location.state.restaurantInfo.description);

            //setrLogo(location.state.restaurantInfo.logo);
            setrLogoPreview(location.state.restaurantInfo.logo);
            
            if (location.state.restaurantInfo.image_1) {
                setPrevImage1(location.state.restaurantInfo.image_1);
            }
            if (location.state.restaurantInfo.image_2) {
                setPrevImage2(location.state.restaurantInfo.image_2);
            }
            if (location.state.restaurantInfo.image_3) {
                setPrevImage3(location.state.restaurantInfo.image_3);
            }
            if (location.state.restaurantInfo.image_4) {
                setPrevImage4(location.state.restaurantInfo.image_4);
            }
        }
    }, []);

    function editRestaurant() {
        let form_data = new FormData();

        form_data.append('name', rName);
        form_data.append('address', rAddr);
        form_data.append('postal', rPostal);
        form_data.append('phone', rPhone);

        form_data.append('description', rDesc);
        form_data.append('logo', rLogo);

        if (rImage1 !== "")
            form_data.append('image_1', rImage1);
        if (rImage2 !== "")
            form_data.append('image_2', rImage2);
        if (rImage3 !== "")
            form_data.append('image_3', rImage3);
        if (rImage4 !== "")
            form_data.append('image_4', rImage4);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
        };

        axios.put(`/restaurants/${location.state.r_id}/edit/`, form_data, config)
            .then((resp) => {
                console.log("Restaurant edited succesfully: ", resp);
                navigate(`/restaurant/${location.state.r_id}/`);
            })
            .catch(error => {
                if (error.response.status == 400) {
                    setErrors(error.response.data);
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else { //401 Unauthorized
                    //TODO, redirect?
                    console.log("Please log in or sign up first");
                }
            });

    }

    // const ImageUploader = e => {
    //     setrLogoPreview(URL.createObjectURL(e.target.files[0]));
    //     setrLogo(e.target.files[0]);
    // }

    return (
        <>
            <div className="rAdd-intro">
                <div className="mask d-flex align-items-center h-100 rAdd-tone-down-bg">
                    <div className="container">
                        <form className="row rAdd-row" style={{ backgroundColor: "white" }} onSubmit={e => e.preventDefault()}>
                            <h2 className="rAdd-heading">Edit Your Restaurant</h2>



                            <div className="col-12">
                                <div className="add-img">
                                    <label htmlFor="logo-img">
                                        {/* <FontAwesomeIcon icon={faImage} style={{ fontSize: "50px" }} /> */}
                                        <img src={rLogoPreview} className="signup-img img-thumbnail img-thumbnail-profile" alt="..." />
                                    </label>

                                    <label htmlFor="logo-img" className="label-file mb-3">
                                        UPDATE YOUR LOGO
                                    </label>

                                    <input id="logo-img" type="file" className="btn shadow-none" onChange={e => { setrLogoPreview(URL.createObjectURL(e.target.files[0])); setrLogo(e.target.files[0]) }} required />
                                </div>
                            </div>

                            {/* <div className="col-12">
                                <div className="add-img">
                                    <label htmlFor="logo-img">
                                        <FontAwesomeIcon icon={faImage} style={{ fontSize: "50px" }} />
                                    </label>

                                    <label htmlFor="logo-img" className="label-file mb-3">
                                        UPLOAD A COVER PHOTO
                                    </label>

                                    <input id="logo-img" type="file" className="btn shadow-none" required />
                                </div>
                            </div> */}

                            <div className="col-lg-6">
                                <div className="input-group mb-4">
                                    <label htmlFor="inputRestaurantName" className="col-3 profile-label">RESTAURANT NAME:</label>
                                    <input type="text" className="form-control col-9 input-text-styling shadow-none" placeholder="Restaurant Name"
                                        aria-label="Username" aria-describedby="basic-addon1" id="inputRestaurantName" value={rName || ''}
                                        onChange={e => setrName(e.target.value)} required />
                                </div>
                            </div>



                            <div className="col-lg-6">
                                <div className="input-group mb-4">
                                    <label htmlFor="inputRestaurantNumber" className="col-3 profile-label">RESTAURANT NUMBER:</label>
                                    <input type="tel" className="form-control col-9 input-text-styling shadow-none" id="inputRestaurantNumber"
                                        name="telephone" placeholder="+1(###)-###-####" maxLength="12" value={rPhone || ''}
                                        title="Ten digits code" onChange={e => setrPhone(e.target.value)} required />
                                </div>
                            </div>


                            <div className="col-lg-6">
                                <div className="input-group mb-4">
                                    <label htmlFor="inputRestaurantAddress" className=" col-3 profile-label">ADDRESS:</label>
                                    <input type="text" className="form-control col-11 input-text-styling shadow-none" id="inputRestaurantAddress"
                                        placeholder="1234 Main St" aria-label="Username" aria-describedby="basic-addon1" value={rAddr || ''}
                                        onChange={e => setrAddr(e.target.value)} required />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="input-group mb-4">
                                    <label htmlFor="inputRestaurantPostal" className="col-3 profile-label">ZIP/POSTAL:</label>
                                    <input type="text" className="form-control col-9 input-text-styling shadow-none" id="inputRestaurantPostal"
                                        placeholder="Zip/Postal" aria-label="Username" aria-describedby="basic-addon1" value={rPostal || ''}
                                        onChange={e => setrPostal(e.target.value)} required />
                                </div>
                            </div>

                            <div className="col-lg-11 mt-4 mb-4">
                                <div className="input-group mb-4">
                                    <label htmlFor="inputRestaurantState" className="profile-label">GENERAL INFO:</label>
                                    <textarea className="form-control w-50" id="inputRestaurantInfo" rows="3"
                                        placeholder="General restaurant information that will be displayed on your restaurant page"
                                        value={rDesc || ""}
                                        onChange={e => setrDesc(e.target.value)}></textarea>
                                </div>
                            </div>

                            {/* <div className="mb-4">
                                <div className="profile-label">CAROUSEL</div>
                                <div id="pictureHelpBlock" className="form-text mb-2">
                                    These pictures will be shown separately after the carousel component of your restaurant page
                                    (max 3)
                                </div>
                                <div className="col-lg-12">
                                    <div>
                                        <label htmlFor="c-img-1">
                                            <FontAwesomeIcon icon={faImage} style={{ fontSize: "50px" }} />
                                        </label>
                                        <label htmlFor="c-img-1" className="label-file mb-3">
                                            PICTURE 1
                                        </label>
                                        <input id="c-img-1" type="file" className="btn shadow-none" required />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div>
                                        <label htmlFor="c-img-2">
                                            <FontAwesomeIcon icon={faImage} style={{ fontSize: "50px" }} />
                                        </label>
                                        <label htmlFor="c-img-2" className="label-file mb-3">
                                            PICTURE 2
                                        </label>
                                        <input id="c-img-2" type="file" className="btn shadow-none" required />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div>
                                        <label htmlFor="c-img-3">
                                            <FontAwesomeIcon icon={faImage} style={{ fontSize: "50px" }} />
                                        </label>
                                        <label htmlFor="c-img-3" className="label-file mb-3">
                                            PICTURE 3
                                        </label>
                                        <input id="c-img-3" type="file" className="btn shadow-none" required />
                                    </div>
                                </div>
                            </div> */}

                            <div>
                                <div className="profile-label">ADDITIONAL PICTURES</div>
                                <div id="pictureHelpBlock" className="form-text mb-2">
                                    These pictures will be shown separately after the general info section
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div>
                                    <label htmlFor="additional-img-1">
                                        {/* <FontAwesomeIcon icon={faImage} style={{ fontSize: "50px" }} /> */}
                                        <img src={rPrevImage1} className="signup-img img-thumbnail img-thumbnail-profile" alt="..." />
                                    </label>
                                    <label htmlFor="additional-img-1" className="label-file mb-3">
                                        PICTURE 1
                                    </label>
                                    <input id="additional-img-1" type="file" className="btn shadow-none" onChange={e => { setPrevImage1(URL.createObjectURL(e.target.files[0])); setImage1(e.target.files[0]) }} />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div>
                                    <label htmlFor="additional-img-2">
                                        <img src={rPrevImage2} className="signup-img img-thumbnail img-thumbnail-profile" alt="..." />
                                    </label>
                                    <label htmlFor="additional-img-2" className="label-file mb-3">
                                        PICTURE 2
                                    </label>
                                    <input id="additional-img-2" type="file" className="btn shadow-none" onChange={e => { setPrevImage2(URL.createObjectURL(e.target.files[0])); setImage2(e.target.files[0]) }} />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div>
                                    <label htmlFor="additional-img-3">
                                        <img src={rPrevImage3} className="signup-img img-thumbnail img-thumbnail-profile" alt="..." />
                                    </label>
                                    <label htmlFor="additional-img-3" className="label-file mb-3">
                                        PICTURE 3
                                    </label>
                                    <input id="additional-img-3" type="file" className="btn shadow-none" onChange={e => { setPrevImage3(URL.createObjectURL(e.target.files[0])); setImage3(e.target.files[0]) }} />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div>
                                    <label htmlFor="additional-img-4">
                                        <img src={rPrevImage4} className="signup-img img-thumbnail img-thumbnail-profile" alt="..." />
                                    </label>
                                    <label htmlFor="additional-img-4" className="label-file mb-3">
                                        PICTURE 4
                                    </label>
                                    <input id="additional-img-4" type="file" className="btn shadow-none" onChange={e => { setPrevImage4(URL.createObjectURL(e.target.files[0])); setImage4(e.target.files[0]) }} />
                                </div>
                            </div>

                            {Object.keys(errors).length > 0 &&
                                <div className="col-lg-12 mt-4">
                                    <i>Please fix the following errors</i>
                                    {
                                        Object.keys(errors).map(name => (
                                            <div style={{ color: 'red' }}>{name} : {errors[name]}</div>
                                        ))
                                    }
                                </div>
                            }


                            <div className="col-9"></div>
                            <div className="align-items-end col-3">
                                <button className="rForm-save-btn btn shadow-none" onClick={() => editRestaurant()}>SAVE</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </>
    )
}

export default RestaurantEdit;