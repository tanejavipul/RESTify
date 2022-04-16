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
//phone validation is different from sign up page?

function RestaurantAdd(props) {
    const [rName, setrName] = useState('');
    const [rAddr, setrAddr] = useState('');
    const [rPhone, setrPhone] = useState('');
    const [rPostal, setrPostal] = useState('');
    const [rLogo, setrLogo] = useState('');

    const [errors, setErrors] = useState({});

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

    return (
        <>
            <div className="rAdd-intro">
                <div className="mask d-flex align-items-center h-100 rAdd-tone-down-bg">
                    <div className="container">
                        <form className="row rAdd-row" style={{ backgroundColor: "white" }}>
                            <h2 className="rAdd-heading">Add a Restaurant</h2>



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
                                        name="telephone" placeholder="+1(###)-###-####" onChange={e => setrPhone(e.target.value)} required />
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

                            {Object.keys(errors).length > 0 &&
                                <div className="col-lg-12">
                                    <i>Please fix the following errors</i>
                                    {
                                        Object.keys(errors).map(name => (
                                            <div style={{color: 'red'}}>{name} : {errors[name]}</div>
                                        ))
                                    }
                                </div>
                            }


                            <div className="col-9"></div>
                            <div className="align-items-end col-3">
                                <button className="save-btn btn shadow-none" onClick={() => createRestaurant()}>CREATE</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>


        </>
    )
}

export default RestaurantAdd;