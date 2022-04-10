import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

// import "./restaurantForms.css";

import axios from "axios";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from '@fortawesome/free-solid-svg-icons';

function RestaurantAdd(props) {
    return (
        <>
            <div id="intro">
                <div class="mask d-flex align-items-center h-100 tone-down-bg">
                    <div class="container">
                        <form class="row" style={{backgroundColor: "white"}}>
                            <h2>Add a Restaurant</h2>
    
                            <div class="col-12">
                                <div class="add-img">
                                    <label for="logo-img">
                                        <FontAwesomeIcon icon={faImage} style={{fontSize: "50px"}}/>
                                    </label>
                                    <label for="logo-img" class="label-file mb-3">
                                        UPLOAD YOUR LOGO
                                    </label>
                                    <input id="logo-img" type="file" class="btn shadow-none" required/>
                                </div>
                            </div> 


                            <div class="col-lg-6">
                                <div class="input-group mb-4">
                                    <label for="inputRestaurantName" class="col-3 profile-label">RESTAURANT NAME:</label>
                                    <input type="text" class="form-control col-9 input-text-styling shadow-none" placeholder="Restaurant Name"
                                        aria-label="Username" aria-describedby="basic-addon1" id="inputRestaurantName" required />
                                </div>
                            </div>


                            <div class="col-lg-6">
                                <div class="input-group mb-4">
                                    <label for="inputRestaurantNumber" class="col-3 profile-label">RESTAURANT NUMBER:</label>
                                    <input type="tel" class="form-control col-9 input-text-styling shadow-none" id="inputRestaurantNumber"
                                        name="telphone" placeholder="888 888 8888" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxlength="12"
                                        title="Ten digits code" required />
                                </div>
                            </div>

                            <div class="col-lg-6">
                                <div class="input-group mb-4">
                                    <label for="inputRestaurantAddress" class=" col-3 profile-label">ADDRESS:</label>
                                    <input type="text" class="form-control col-11 input-text-styling shadow-none" id="inputRestaurantAddress"
                                        placeholder="1234 Main St" aria-label="Username" aria-describedby="basic-addon1" required />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="input-group mb-4">
                                    <label for="inputRestaurantPostal" class="col-3 profile-label">ZIP/POSTAL:</label>
                                    <input type="text" class="form-control col-9 input-text-styling shadow-none" id="inputRestaurantPostal"
                                        placeholder="Zip/Postal" aria-label="Username" aria-describedby="basic-addon1" required />
                                </div>
                            </div>
                            
                            <div class="col-9"></div>
                            <div class="align-items-end col-3">
                                <button class="save-btn btn shadow-none">CREATE</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>


        </>
    )
}

export default RestaurantAdd;