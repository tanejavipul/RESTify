import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


import axios from "axios";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faPhone, faPencil, faHeart } from '@fortawesome/free-solid-svg-icons';

import RestaurantInfo from './RestaurantInfo';


import "./restaurant.css";
// TODO: Check if user is logged in?
//populating images, and data via backend
//import various components and swap them based on tab
//probably need to add slogan, otherwise remove
//ADD ID TO API
//EDIT buttons only show up if user is owner of restaurant!

function Restaurant(props) {
    const { id } = useParams();
    const [restaurantInfo, setRestaurantInfo] = useState({
        "name": "", "address": "", "postal": "", "phone": "",
        "logo": "", "description": "", "cover_img": "", "carousel_img_1": "",
        "carousel_img_2": 0, "carousel_img_3": "", "image_1": "", "image_2": "", "image_3": ""
        , "image_4": "", "num_likes": 0, "num_follows": 0, "num_comments": 0, "num_blogs": 0
    });

    const [activeTab, setActiveTab] = useState("info");

    useEffect(() => {
        async function getRestaurantInfo() {
            let headers;
            if (localStorage.getItem('access') !== null) {
                headers = {
                    'Authorization': `Bearer ${localStorage.getItem("access")}`
                }
            }

            axios.get(`/restaurants/${id}/view/`, { headers })
                .then((response) => {
                    console.log(response);
                    setRestaurantInfo(response['data']);
                    return;
                });
        }

        getRestaurantInfo();
        console.log(restaurantInfo)
    }, []);

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
                                    <button className="btn btn-primary fa fa-heart bg-danger border-danger" type="button"> <FontAwesomeIcon icon={faHeart} style={{ paddingRight: '5px' }} />Like</button>
                                </div>
                                <div className="text-center text-white">
                                    <img src="../Images/logo.png" className="rlogo" alt="..." />
                                    <h1 className="r-title">{restaurantInfo['name']}</h1>
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

                                            {activeTab == "info" ? <a className="btn btn-primary btn-md edit-button " href="editRestaurant.html"
                                                role="button">
                                                <FontAwesomeIcon icon={faPencil} size="1x" style={{ paddingRight: '10px' }} />
                                                Edit
                                            </a> : ''}

                                            <a className={activeTab == "info" ? "nav-item nav-link show active" : "nav-item nav-link"} id="nav-info-tab" href="#nav-info" role="tab"
                                                onClick={() => setActiveTab("info")}>Info</a>
                                        </div>
                                        <div className="nav-item">
                                            {activeTab == "menu" ? <a className="btn btn-primary btn-md edit-button " href="editRestaurant.html"
                                                role="button">
                                                <FontAwesomeIcon icon={faPencil} size="1x" style={{ paddingRight: '10px' }} />
                                                Edit
                                            </a> : ''}
                                            <a className={activeTab == "menu" ? "nav-item nav-link show active" : "nav-item nav-link"} id="nav-menu-tab" href="#nav-menu" role="tab"
                                                onClick={() => setActiveTab("menu")}>Menu </a>
                                        </div>
                                        <div className="nav-item">
                                            {activeTab == "blogs" ? <a className="btn btn-primary btn-md edit-button " href="editRestaurant.html"
                                                role="button">
                                                <FontAwesomeIcon icon={faPencil} size="1x" style={{ paddingRight: '10px' }} />
                                                Add New Blog Post
                                            </a> : ''}
                                            <a className={activeTab == "blogs" ? "nav-item nav-link show active" : "nav-item nav-link"} id="nav-blogs-tab" href="#nav-blogs" role="tab"
                                                onClick={() => setActiveTab("blogs")}>Blogs </a>
                                        </div>
                                        <div className="nav-item">
                                            <a className={activeTab == "comments" ? "nav-item nav-link show active" : "nav-item nav-link"} id="nav-comments-tab" href="#nav-comments" role="tab"
                                                onClick={() => setActiveTab("comments")}>Comments </a>
                                        </div>

                                    </div>
                                </nav>

                                <div className="tab-content py-3 px-3 px-sm-0 border-0 bg-transparent" id="nav-tabContent">
                                    <div className={activeTab == "info" ? "tab-pane fade show active" : "tab-pane fade"} id="nav-info" role="tabpanel"
                                        aria-labelledby="nav-info-tab">
                                        <RestaurantInfo address={restaurantInfo['address']} phone={restaurantInfo['phone']} postal={restaurantInfo['postal']}
                                            num_likes={restaurantInfo['num_likes']} num_follows={restaurantInfo['num_follows']} num_blogs={restaurantInfo['num_blogs']} num_comments={restaurantInfo['num_comments']}
                                            carousel_img_1={restaurantInfo['carousel_img_1']} carousel_img_2={restaurantInfo['carousel_img_2']} carousel_img_3={restaurantInfo['carousel_img_3']}
                                            image_1={restaurantInfo['image_1']} image_2={restaurantInfo['image_2']} image_3={restaurantInfo['image_3']} image_4={restaurantInfo['image_4']} />
                                    </div>
                                    <div className={activeTab == "menu" ? "tab-pane fade show active" : "tab-pane fade"} id="nav-menu" role="tabpanel" aria-labelledby="nav-menu-tab">
                                        <div>Component menu</div>
                                    </div>
                                    <div className={activeTab == "blogs" ? "tab-pane fade show active" : "tab-pane fade"} id="nav-blogs" role="tabpanel" aria-labelledby="nav-blogs-tab">
                                        <div>Component blogs</div>
                                    </div>
                                    <div className={activeTab == "comments" ? "tab-pane fade show active" : "tab-pane fade"} id="nav-comments" role="tabpanel" aria-labelledby="nav-comments-tab">
                                        <div>Component comments</div>
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