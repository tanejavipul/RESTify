import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./blogPost.css";
import LatestBlogs from "./LatestBlogs";
import FollowRestaurant from './FollowRestaurant';
import BlogPost from './BlogPost';
import { useParams } from 'react-router-dom';
import axios from "axios";
import Navbar from "../Navbar/Navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


function BlogPostPage(props) {

    const { id } = useParams();
    const [isFollowing, setFollowing] = useState(false);
    const [pulledLike, hasLiked] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [blogPostInfo, setBlogPostInfo] = useState({"is_owner":"", "restaurant_name":"", "restaurant_id":"", "title":"", "description":"",
                                                    "primary_photo": "", "photo_1": "", "photo_2": "", "photo_3": "",
                                                    "num_likes": 0, "last_modified": "" });

    useEffect(() => {
        async function pullFollowing(restaurant_id) {
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
            axios.get(`/restaurants/follow/${restaurant_id}/`, {headers})
            .then((response) => {
                setFollowing(response['data']['result']);
                return;
            })
        }

        async function pullLiked() {
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
            axios.get(`/blogs/${id}/like/`, {headers})
            .then((response) => {
                hasLiked(response['data']['result']);
                return;
            })
        }

        async function getBlogPostInfo(id) {
            // hate the awaits can probably change working for now
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
            let response = await axios.get(`/blogs/${id}/`, {headers});
            let x = await setBlogPostInfo(response['data']);
            let y = await pullFollowing(response['data']['restaurant_id']);
            let z = await pullLiked();
        }

        getBlogPostInfo(id);
    }, []);

    function togglePopUp(e) {
        e.preventDefault();
        setOpen(true);
    }

    function deleteBlog(e) {
        e.preventDefault();
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.delete(`/blogs/${id}/delete/`, {headers})
        .then((resp) => {
            // think it just wont do anything if u dont own and will send u home
            // button shouldn't pop up anyways
            window.location.replace(`/home/`);
        });
        
    }

    return (
        // {/* Inspired By: https://www.bootdey.com/snippets/view/blog-detail-page */}
        <>
        <Navbar />
        <div id="intro">
            <div class="blog-single tone-down-bg">
                <div class="container">
                    {isOpen ? 
                        <div className="popup-box">
                            <div className="nested-popup-box">
                                <span className="close-icon" onClick={() => setOpen(false)}>x</span>
                                <b>Are you sure you want to delete this Blog Post?</b>
                                <br />
                                <button onClick={(e) => deleteBlog(e)}>Confirm</button>
                                <button onClick={() => setOpen(false)}>Cancel</button>
                            </div>
                        </div> :
                        <></>
                    }
                    <div class="blog-post row align-items-start">
                        {blogPostInfo['is_owner'] ? 
                            <>
                                <div class="d-flex justify-content-end">
                                    <a class="btn btn-primary btn-lg blog-edit-button" href={`/blogs/${id}/edit/`} role="button">
                                        <FontAwesomeIcon icon={faPencil} />
                                        &nbsp; Edit Blog Post
                                    </a>
                                </div>
                                <div class="d-flex justify-content-end mt-2">
                                    <button class="btn btn-primary bg-danger border-danger blog-delete-button" type="button" onClick={(e) => togglePopUp(e)} >
                                        <FontAwesomeIcon icon={faTimesCircle} />
                                        &nbsp; Delete Blog Post
                                    </button>
                                </div>
                            </> : <></>
                        }
                        <BlogPost restaurant_id={blogPostInfo['restaurant_id']} restaurant_name={blogPostInfo['restaurant_name']} title={blogPostInfo['title']} description={blogPostInfo['description']}
                                  primary_photo={blogPostInfo['primary_photo']} photo_1={blogPostInfo['photo_1']} photo_2={blogPostInfo['photo_2']} photo_3={blogPostInfo['photo_3']}
                                  num_likes={blogPostInfo['num_likes']} last_modified={blogPostInfo['last_modified']} liked={pulledLike} />
                        <div class="col-lg-4 m-15px-tb blog-aside">
                            <FollowRestaurant restaurant_name={blogPostInfo['restaurant_name']} restaurant_id={blogPostInfo['restaurant_id']} is_following={isFollowing} />
                            <LatestBlogs />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default BlogPostPage;