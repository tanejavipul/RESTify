import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from "axios";
// import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from '@fortawesome/free-solid-svg-icons';

import "./restaurantForms.css";
// TODO: Check if user is logged in?
// printing error messages
// updating logo
//pull restaurant from owner, redirect to create restarurant page if no restaurnt exists 404
// POSSIBLE ISSUE: phone validiation on input and differnet validation in backend

function RestaurantEdit(props) {
    const [rName, setrName] = useState('');
    const [rAddr, setrAddr] = useState('');
    const [rPhone, setrPhone] = useState('');
    const [rPostal, setrPostal] = useState('');
    const [rLogo, setrLogo] = useState('');

    function createRestaurant() {
        //Maybe need to validate fields first?
        const body = {
            'name': rName,
            'address': rAddr,
            'postal': rPostal,
            'phone': rPhone,
            'logo': rLogo
        }

        console.log(body);

        axios.post(`/restaurants/add/`, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`
            },
        })
            .then((resp) => {
                // could do something here if failed return like oh please sign in otherwise it just doesn't change
                // setLiked(true);
                // setNumLikes(numLikes+1);
                console.log("Restaurant added succesfully: ", resp);
            })
            .catch(error => {
                //this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            });

    }

    return (
        <>
            <div className="rAdd-intro">
                <div className="mask d-flex align-items-center h-100 rAdd-tone-down-bg">
                    <div className="container">
                        <form className="row rAdd-row" style={{ backgroundColor: "white" }}>
                            <h2 className="rAdd-heading">Edit Your Restaurant</h2>



                            <div className="col-12">
                                <div className="add-img">
                                    <label htmlFor="logo-img">
                                        <FontAwesomeIcon icon={faImage} style={{ fontSize: "50px" }} />
                                    </label>

                                    <label htmlFor="logo-img" className="label-file mb-3">
                                        UPLOAD YOUR LOGO
                                    </label>

                                    <input id="logo-img" type="file" className="btn shadow-none" required />
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="add-img">
                                    <label htmlFor="logo-img">
                                        <FontAwesomeIcon icon={faImage} style={{ fontSize: "50px" }} />
                                    </label>

                                    <label htmlFor="logo-img" className="label-file mb-3">
                                        UPLOAD A COVER PHOTO
                                    </label>

                                    <input id="logo-img" type="file" className="btn shadow-none" required />
                                </div>
                            </div>




                            <div className="col-lg-6">
                                <div className="input-group mb-4">
                                    <label htmlFor="inputRestaurantName" className="col-3 profile-label">RESTAURANT NAME:</label>
                                    <input type="text" className="form-control col-9 input-text-styling shadow-none" placeholder="Restaurant Name"
                                        aria-label="Username" aria-describedby="basic-addon1" id="inputRestaurantName"
                                        onChange={e => setrName(e.target.value)} required />
                                </div>
                            </div>



                            <div className="col-lg-6">
                                <div className="input-group mb-4">
                                    <label htmlFor="inputRestaurantNumber" className="col-3 profile-label">RESTAURANT NUMBER:</label>
                                    <input type="tel" className="form-control col-9 input-text-styling shadow-none" id="inputRestaurantNumber"
                                        name="telphone" placeholder="888 888 8888" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxLength="12"
                                        title="Ten digits code" onChange={e => setrPhone(e.target.value)} required />
                                </div>
                            </div>


                            <div className="col-lg-6">
                                <div className="input-group mb-4">
                                    <label htmlFor="inputRestaurantAddress" className=" col-3 profile-label">ADDRESS:</label>
                                    <input type="text" className="form-control col-11 input-text-styling shadow-none" id="inputRestaurantAddress"
                                        placeholder="1234 Main St" aria-label="Username" aria-describedby="basic-addon1"
                                        onChange={e => setrAddr(e.target.value)} required />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="input-group mb-4">
                                    <label htmlFor="inputRestaurantPostal" className="col-3 profile-label">ZIP/POSTAL:</label>
                                    <input type="text" className="form-control col-9 input-text-styling shadow-none" id="inputRestaurantPostal"
                                        placeholder="Zip/Postal" aria-label="Username" aria-describedby="basic-addon1"
                                        onChange={e => setrPostal(e.target.value)} required />
                                </div>
                            </div>

                            <div className="col-lg-11 mt-4 mb-4">
                                <div className="input-group mb-4">
                                    <label htmlFor="inputRestaurantState" className="profile-label">GENERAL INFO:</label>
                                    <textarea className="form-control w-50" id="inputRestaurantInfo" rows="3"
                                        placeholder="General restaurant information that will be displayed on your restaurant page"></textarea>
                                </div>
                            </div>

                            <div className="mb-4">
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
                            </div>

                            <div className="mt-4">
                                <div className="profile-label">ADDITIONAL PICTURES</div>
                                <div id="pictureHelpBlock" className="form-text mb-2">
                                    These pictures will be shown separately after the carousel component of your restaurant page
                                    (max 4)
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div>
                                    <label htmlFor="additional-img-1">
                                        <FontAwesomeIcon icon={faImage} style={{ fontSize: "50px" }} />
                                    </label>
                                    <label htmlFor="additional-img-1" className="label-file mb-3">
                                        PICTURE 1
                                    </label>
                                    <input id="additional-img-1" type="file" className="btn shadow-none" required />
                                </div>
                            </div>
                            
                            <div className="col-lg-6">
                                <div>
                                    <label htmlFor="additional-img-2">
                                        <FontAwesomeIcon icon={faImage} style={{ fontSize: "50px" }} />
                                    </label>
                                    <label htmlFor="additional-img-2" className="label-file mb-3">
                                        PICTURE 2
                                    </label>
                                    <input id="additional-img-2" type="file" className="btn shadow-none" required />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div>
                                    <label htmlFor="additional-img-3">
                                        <FontAwesomeIcon icon={faImage} style={{ fontSize: "50px" }} />
                                    </label>
                                    <label htmlFor="additional-img-3" className="label-file mb-3">
                                        PICTURE 3
                                    </label>
                                    <input id="additional-img-3" type="file" className="btn shadow-none" required />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div>
                                    <label htmlFor="additional-img-4">
                                        <FontAwesomeIcon icon={faImage} style={{ fontSize: "50px" }} />
                                    </label>
                                    <label htmlFor="additional-img-4" className="label-file mb-3">
                                        PICTURE 4
                                    </label>
                                    <input id="additional-img-4" type="file" className="btn shadow-none" required />
                                </div>
                            </div>

                         


                            <div className="col-9"></div>
                            <div className="align-items-end col-3">
                                <button className="save-btn btn shadow-none" onClick={() => createRestaurant()}>SAVE</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </>
    )
}

export default RestaurantEdit;