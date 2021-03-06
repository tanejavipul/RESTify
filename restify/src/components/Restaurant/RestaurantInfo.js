// import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faPhone } from '@fortawesome/free-solid-svg-icons';



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
                                <h6 className="m-0">{props.address}, {props.postal}</h6>
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

            {props.description &&
                <div className="row mt-4">
                    <div className="col-md-12">
                        <div className="p-4 bg-light rounded" style={{ height: '100%' }}>
                            {props.description}
                        </div>
                    </div>
                </div>
            }
            
            <div className="row mt-4 d-flex h-100 mb-4">
                {props.image_1 &&
                <div className="col-md-3 ">
                    <img src={props.image_1} alt="" className="img-thumbnail w-100"
                        style={{ height: '250px', width: '100%' }} />
                </div> }
                {props.image_2 &&
                <div className="col-md-3">
                    <img src={props.image_2} alt="" className="img-thumbnail w-100"
                        style={{ height: '250px' }} />
                </div> }
                {props.image_3 &&
                <div className="col-md-3">
                    <img src={props.image_3} alt="" className="img-thumbnail w-100"
                        style={{ height: '250px' }} />
                </div> }
                {props.image_4 &&
                <div className="col-md-3">
                    <img src={props.image_4} alt="" className="img-thumbnail w-100"
                        style={{ height: '250px' }} />
                </div> }
            </div>

        </>
    )
}

export default RestaurantInfo;