import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from "axios";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faPhone, faPencil, faHeart } from '@fortawesome/free-solid-svg-icons';



import "./restaurant.css";
// TODO: Check if user is logged in?
//populating images, and data via backend
//import various components and swap them based on tab
//probably need to add slogan, otherwise remove
//adding id to api

function RestaurantInfo(props) {
    return (
        <>
            <div className="row justify-content-center mb-4 ">
                <div className="col-md-8">
                    <div className="card border-primary mx-sm-1 p-3">
                        <div className="row">
                            <div className="card border-primary shadow text-primary p-2 my-card col-md-2">
                                <FontAwesomeIcon icon={faMap} size="1x" />
                            </div>
                            <div className="text-primary col-md-10 d-flex align-items-center">
                                <h6 className="m-0">{props.address}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-primary mx-sm-1 p-3">
                        <div className="row">
                            <div className="card border-primary shadow text-primary p-2 my-card col-md-2">
                                <FontAwesomeIcon icon={faPhone} size="1x" />
                            </div>
                            <div className="text-primary col-md-10 d-flex align-items-center">
                                <h6 className="m-0">{props.phone}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="row justify-content-center">
                    <div className="col-md-3">
                        <div className="card border-info mx-sm-1 p-3">
                            <div className="text-info text-center mt-3">
                                <h4>Likes</h4>
                            </div>
                            <div className="text-info text-center mt-2">
                                <h1>{props.num_likes}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card border-success mx-sm-1 p-3">

                            <div className="text-success text-center mt-3">
                                <h4>Followers</h4>
                            </div>
                            <div className="text-success text-center mt-2">
                                <h1>{props.num_follows}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card border-danger mx-sm-1 p-3">

                            <div className="text-danger text-center mt-3">
                                <h4>Blog Posts</h4>
                            </div>
                            <div className="text-danger text-center mt-2">
                                <h1>{props.num_blogs}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card border-warning mx-sm-1 p-3">

                            <div className="text-warning text-center mt-3">
                                <h4>Comments</h4>
                            </div>
                            <div className="text-warning text-center mt-2">
                                <h1>{props.num_comments}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="p-4 bg-light rounded" style={{ height: '100%' }}>
                        {props.description}
                    </div>
                </div>

            </div>

            <div id="carouselExampleIndicators" className="carousel slide mt-4" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="0" className="active" aria-current="true"
                        aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src={props.carousel_img_1} alt="Carousel Image 1" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={props.carousel_img_2} alt="Carousel Image 2" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={props.carousel_img_3} alt="Carousel Image 3" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button"
                    data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button"
                    data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="row mt-4 d-flex h-100 mb-4">
                <div className="col-md-3 ">
                    <img src={props.image_1} alt="Image 1" className="img-thumbnail w-100"
                        style={{ height: '250px' }} />
                </div>
                <div className="col-md-3">
                    <img src={props.image_2} alt="Image 1" className="img-thumbnail w-100"
                        style={{ height: '250px' }} />
                </div>
                <div className="col-md-3">
                    <img src={props.image_3} alt="Image 1" className="img-thumbnail w-100"
                        style={{ height: '250px' }} />
                </div>
                <div className="col-md-3">
                    <img src={props.image_4} alt="Image 1" className="img-thumbnail w-100"
                        style={{ height: '250px' }} />
                </div>
            </div>
        </>
    )
}

export default RestaurantInfo;