import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

import axios from "axios";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import RestaurantInfo from './RestaurantInfo';


import "./restaurant.css";
import MenuSection from "./MenuSection";
import RestaurantBlogs from "./RestaurantBlogs";
import CommentSection from "./CommentSection";
import Navbar from "../Navbar/Navbar";
// TODO: Check if user is logged in?
//populating images, and data via backend
//import various components and swap them based on tab
//probably need to add slogan, otherwise remove
//ADD ID TO API
//EDIT buttons only show up if user is owner of restaurant!
//redirect on trying to follow or like without logging in? or no
//Fix links on components nav bar once eric adds his components

function Restaurant(props) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [restaurantInfo, setRestaurantInfo] = useState({
        "is_owner": false,
        "name": "", "address": "", "postal": "", "phone": "",
        "logo": "", "description": "", "cover_img": "", "carousel_img_1": "",
        "carousel_img_2": "", "carousel_img_3": "", "image_1": "", "image_2": "", "image_3": ""
        , "image_4": "", "num_likes": 0, "num_follows": 0, "num_comments": 0, "num_blogs": 0
    });

    const [isFollowing, setFollowing] = useState(false);
    const [isLiked, setLiked] = useState(false);

    const [activeTab, setActiveTab] = useState("info");

    useEffect(() => {
        async function pullFollowing() {
            axios.get(`/restaurants/follow/${id}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`
                },
            }).then((response) => {
                console.log(response);
                setFollowing(response['data']['result']);
                return;
            }).catch(error => {
                if (error.response.status === 404) {
                    console.log("Restaurant not found", error);
                }
            });
        }

        async function pullLiked() {
            axios.get(`/restaurants/${id}/like/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`
                },
            }).then((response) => {
                console.log(response);
                setLiked(response['data']['result']);
                return;
            }).catch(error => {
                if (error.response.status === 404) {
                    console.log("Like not found, User is owner or hasnt liked", error);
                }
                console.clear(); //do not need to see 404
            });
        }

        async function getRestaurantInfo() {
            axios.get(`/restaurants/${id}/view/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`
                },
            })
                .then((response) => {
                    console.log(localStorage.getItem("access"));
                    console.log(response);
                    setRestaurantInfo(response['data']);
                    return;
                }).catch(error => {
                    //this.setState({ errorMessage: error.message });
                    if (error.response.status === 404) {
                        navigate('/home/');
                        // console.log(error.response.data);
                        // console.log(error.response.status);
                        // console.log(error.response.headers);
                    } 
                });
        }

        getRestaurantInfo();
        pullFollowing();
        pullLiked();
        console.log(restaurantInfo);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    function updateLike(like) {
        if (like) {
            axios.post(`/restaurants/${id}/like/add/`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`
                },
            })
                .then((resp) => {
                    setLiked(true);
                }).catch(error => {
                    if (error.response.status === 401) { //shouldnt happen, but navigate to login, if user is logged out
                        navigate('/');
                    }
                });
        } else {
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem("access")}`
            }
            axios.delete(`/restaurants/${id}/like/`, { headers })
                .then((resp) => {
                    setLiked(false);
                }).catch(error => {
                    if (error.response.status === 401) {
                        navigate('/');
                    }
                });
        }
    }

    function updateFollowing(val) {
        if (val) {
            axios.post(`/restaurants/follow/${id}/`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`
                },
            })
                .then((resp) => {
                    setFollowing(true);
                }).catch(error => {
                    if (error.response.status === 401) {
                        navigate('/');
                    }
                });
        } else {
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem("access")}`
            }
            axios.delete(`/restaurants/follow/${id}/`, { headers })
                .then((resp) => {                  
                    setFollowing(false);
                }).catch(error => {
                    if (error.response.status === 401) {
                        navigate('/');
                    }
                });
        }
    }

    return (
        <>
            <Navbar />
            <div className="r-intro">
                <div className="cover">
                    <div className="black-overlay">
                        <div className="container" style={{ height: '100%' }}>
                            {!restaurantInfo['is_owner'] ?
                                <>
                                    {isFollowing ?
                                        <div className="d-grid col-2 r-button" style={{ marginTop: '80px' }}>
                                            <button className="btn btn-success" type="button" onClick={() => updateFollowing(false)}>Following</button>
                                        </div> :
                                        <div className="d-grid col-2 r-button" style={{ marginTop: '80px' }}>
                                            <button className="btn btn-primary" type="button" onClick={() => updateFollowing(true)}>Follow</button>
                                        </div>
                                    }
                                    {isLiked ?
                                        <div className="r-button" style={{ marginTop: '130px' }}>
                                            <button className="btn btn-success" type="button" onClick={() => updateLike(false)}> <FontAwesomeIcon icon={faHeart} style={{ paddingRight: '5px' }} />Liked</button>
                                        </div> :
                                        <div className="r-button" style={{ marginTop: '130px' }}>
                                            <button className="btn btn-danger" type="button" onClick={() => updateLike(true)}> <FontAwesomeIcon icon={faHeart} style={{ paddingRight: '5px' }} />Like</button>
                                        </div>
                                    }
                                </>
                                :
                                <>
                                    <div className="d-grid col-2 mt-2" style={{ position: 'absolute' }}>
                                        <button disabled className="btn btn-secondary fa" style={{ marginTop: '70px' }} type="button">Follow</button>
                                    </div>
                                    <div className=" mt-2" style={{ position: 'absolute' }}>
                                        <button disabled className="btn btn-secondary fa fa-heart" style={{ marginTop: '120px' }} type="button"> <FontAwesomeIcon icon={faHeart} style={{ paddingRight: '5px' }} />Like</button>
                                    </div>
                                </>}
                            <div className=" r-container">
                                <div className="text-center text-white">
                                    <h1 className="r-title">{restaurantInfo['name']}</h1>
                                    <img src={restaurantInfo['logo']} className="rlogo" alt="..." />
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

                                            {activeTab === "info" && restaurantInfo['is_owner'] &&
                                                <Link to={`/restaurant/edit/`} state={{ restaurantInfo: restaurantInfo, r_id: id }} className="btn btn-primary btn-md edit-button" > <FontAwesomeIcon icon={faPencil} size="1x" style={{ paddingRight: '10px' }} />Edit </Link>
                                            }

                                            <a className={activeTab === "info" ? "nav-item nav-link show active" : "nav-item nav-link"} id="nav-info-tab" role="tab"
                                                onClick={() => setActiveTab("info")}>Info</a>
                                        </div>
                                        <div className="nav-item">
                                            {activeTab === "menu" && restaurantInfo['is_owner'] &&
                                                <Link to={`/restaurant/editMenu/`}
                                                className="btn btn-primary btn-md edit-button" > <FontAwesomeIcon icon={faPlus} size="1x" style={{ paddingRight: '10px' }} />Add New Menu Item </Link>
                                            }
                                            <a className={activeTab === "menu" ? "nav-item nav-link show active" : "nav-item nav-link"} id="nav-menu-tab" role="tab"
                                                onClick={() => setActiveTab("menu")}>Menu </a>
                                        </div>
                                        <div className="nav-item">
                                            {activeTab === "blogs" && restaurantInfo['is_owner'] &&
                                                <Link to={`/blogs/addBlog/`} className="btn btn-primary btn-md edit-button" > <FontAwesomeIcon icon={faPencil} size="1x" style={{ paddingRight: '10px' }} />Add New Blog Post </Link>
                                            }
                                            <a className={activeTab === "blogs" ? "nav-item nav-link show active" : "nav-item nav-link"} id="nav-blogs-tab" role="tab"
                                                onClick={() => setActiveTab("blogs")}>Blogs </a>
                                        </div>
                                        <div className="nav-item">
                                            <a className={activeTab === "comments" ? "nav-item nav-link show active" : "nav-item nav-link"} id="nav-comments-tab" role="tab"
                                                onClick={() => setActiveTab("comments")}>Comments </a>
                                        </div>

                                    </div>
                                </nav>

                                <div className="tab-content py-3 px-3 px-sm-0 border-0 bg-transparent" id="nav-tabContent">
                                    <div className={activeTab === "info" ? "tab-pane fade show active" : "tab-pane fade"} id="nav-info" role="tabpanel"
                                        aria-labelledby="nav-info-tab">
                                        <RestaurantInfo address={restaurantInfo['address']} phone={restaurantInfo['phone']} postal={restaurantInfo['postal']} description={restaurantInfo['description']}
                                            num_likes={restaurantInfo['num_likes']} num_follows={restaurantInfo['num_follows']} num_blogs={restaurantInfo['num_blogs']} num_comments={restaurantInfo['num_comments']}
                                            carousel_img_1={restaurantInfo['carousel_img_1']} carousel_img_2={restaurantInfo['carousel_img_2']} carousel_img_3={restaurantInfo['carousel_img_3']}
                                            image_1={restaurantInfo['image_1']} image_2={restaurantInfo['image_2']} image_3={restaurantInfo['image_3']} image_4={restaurantInfo['image_4']} />
                                    </div>
                                    <div className={activeTab === "menu" ? "tab-pane fade show active" : "tab-pane fade"} id="nav-menu" role="tabpanel" aria-labelledby="nav-menu-tab">
                                        <MenuSection is_owner={restaurantInfo['is_owner']} />
                                    </div>
                                    <div className={activeTab === "blogs" ? "tab-pane fade show active" : "tab-pane fade"} id="nav-blogs" role="tabpanel" aria-labelledby="nav-blogs-tab">
                                        <RestaurantBlogs />
                                    </div>
                                    <div className={activeTab === "comments" ? "tab-pane fade show active" : "tab-pane fade"} id="nav-comments" role="tabpanel" aria-labelledby="nav-comments-tab">
                                        <CommentSection />
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