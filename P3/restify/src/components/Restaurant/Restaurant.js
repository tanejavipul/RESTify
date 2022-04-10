import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from "axios";
// import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faPhone, faPencil } from '@fortawesome/free-solid-svg-icons';



import "./restaurant.css";
// TODO: Check if user is logged in?
//populating images, and data via backend
//import various components and swap them based on tab

function Restaurant(props) {

    return (
        <>
            <div className="r-intro">
                <div className="cover">
                    <div className="black-overlay">
                        <div className="container">
                            <div style={{ height: '100%' }}>
                                <div className="d-grid col-2 mt-2">
                                    <button className="btn btn-primary fa" style={{ marginTop: '70px' }} type="button">Follow</button>
                                </div>
                                <div className=" mt-2">
                                    <button className="btn btn-primary fa fa-heart bg-danger border-danger" type="button"> Like</button>
                                </div>
                                <div className="text-center text-white">
                                    <img src="../Images/logo.png" className="rlogo" alt="..." />
                                    <h1>Pizza Pizza</h1>
                                    <i>“Always our best food, made especially for you”</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="r-tone-down-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 ">
                                <nav>
                                    <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                        <div className="nav-item">

                                            <a className="btn btn-primary btn-lg edit-button " href="editRestaurant.html"
                                                role="button">
                                                    <FontAwesomeIcon icon={faPencil} size="1x" style={{paddingRight: '10px'}}/> 
                                                 Edit
                                            </a>

                                            <a className="nav-item nav-link active" id="nav-home-tab" href="#" role="tab"
                                                aria-controls="nav-home" aria-selected="true">Info</a>
                                        </div>
                                        <div className="nav-item">
                                            <a className="nav-item nav-link" id="nav-profile-tab" href="menu.html" role="tab"
                                                aria-controls="nav-profile" aria-selected="false">Menu</a>
                                        </div>
                                        <div className="nav-item">
                                            <a className="nav-item nav-link" id="nav-contact-tab" href="restaurantBlogs.html" role="tab"
                                                aria-controls="nav-contact" aria-selected="false">Blogs</a>
                                        </div>
                                        <div className="nav-item">
                                            <a className="nav-item nav-link" id="nav-about-tab" href="comments.html" role="tab"
                                                aria-controls="nav-about" aria-selected="false">Comments</a>
                                        </div>

                                    </div>
                                </nav>

                                <div className="tab-content py-3 px-3 px-sm-0 border-0 bg-transparent" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                                        aria-labelledby="nav-home-tab">
                                        <div className="row justify-content-center mb-4 ">
                                            <div className="col-md-8">
                                                <div className="card border-primary mx-sm-1 p-3">
                                                    <div className="row">
                                                        <div className="card border-primary shadow text-primary p-2 my-card col-md-2">
                                                        <FontAwesomeIcon icon={faMap} size="1x"/> 
                                                        </div>
                                                        <div className="text-primary col-md-10 d-flex align-items-center">
                                                            <h6 className="m-0">1234 New York Drive, Vasilievsky Island ON</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card border-primary mx-sm-1 p-3">
                                                    <div className="row">
                                                        <div className="card border-primary shadow text-primary p-2 my-card col-md-2">
                                                        <FontAwesomeIcon icon={faPhone} size="1x"/> 
                                                        </div>
                                                        <div className="text-primary col-md-10 d-flex align-items-center">
                                                            <h6 className="m-0">888-888-8888</h6>
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
                                                            <h1>234</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="card border-success mx-sm-1 p-3">
                                                    
                                                        <div className="text-success text-center mt-3">
                                                            <h4>Followers</h4>
                                                        </div>
                                                        <div className="text-success text-center mt-2">
                                                            <h1>9332</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="card border-danger mx-sm-1 p-3">
                                                        
                                                        <div className="text-danger text-center mt-3">
                                                            <h4>Blog Posts</h4>
                                                        </div>
                                                        <div className="text-danger text-center mt-2">
                                                            <h1>346</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="card border-warning mx-sm-1 p-3">
                                                       
                                                        <div className="text-warning text-center mt-3">
                                                            <h4>Comments</h4>
                                                        </div>
                                                        <div className="text-warning text-center mt-2">
                                                            <h1>346</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-4">
                                            <div className="col-md-12">
                                                <div className="p-4 bg-light rounded" style={{height: '100%'}}>
                                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                                    nostrud
                                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                                    nulla
                                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                                    officia
                                                    deserunt mollit anim id est laborum. "Lorem ipsum dolor sit amet, consectetur
                                                    adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                                    aliqua.
                                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip
                                                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                                    velit
                                                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                                                    non
                                                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.""
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
                                                    <img src="../Images/bbb-splash.png" className="d-block w-100" alt="..." />
                                                </div>
                                                <div className="carousel-item">
                                                    <img src="../Images/design.png" className="d-block w-100" alt="..." />
                                                </div>
                                                <div className="carousel-item">
                                                    <img src="../Images/food.png" className="d-block w-100" alt="..." />
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
                                                <img src="../Images/chania.jpg" alt="..." className="img-thumbnail w-100"
                                                    style={{height: '250px'}} />
                                            </div>
                                            <div className="col-md-3">
                                                <img src="../Images/nature.jpg" alt="..." className="img-thumbnail w-100"
                                                    style={{height: '250px'}} />
                                            </div>
                                            <div className="col-md-3">
                                                <img src="../Images/lights.jpg" alt="..." className="img-thumbnail w-100"
                                                    style={{height: '250px'}} />
                                            </div>
                                            <div className="col-md-3">
                                                <img src="../Images/fjords.jpg" alt="..." className="img-thumbnail w-100"
                                                    style={{height: '250px'}} />
                                            </div>
                                        </div>





                                    </div>
                                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                        2
                                    </div>
                                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                        3
                                    </div>
                                    <div className="tab-pane fade" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                        4
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Restaurant;