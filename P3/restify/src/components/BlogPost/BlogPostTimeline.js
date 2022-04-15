import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./blogPost.css";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartFill, faShare, faCutlery } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faCalendar } from '@fortawesome/free-regular-svg-icons';

function BlogPostTimeline(props) {

    const [numLikes, setNumLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
    
        async function pullLiked() {
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
            axios.get(`/blogs/${props.blog_id}/like/`, {headers})
            .then((response) => {
                console.log(response);
                setLiked(response['data']['result']);
                return;
            })
        }
        pullLiked();
        setNumLikes(props.num_likes);
    
    }, []);

    function updateLike(like) {
        console.log('clicked');
        // follow bool to check if we are liking or unliking
        if (like) {
            axios.post(`/blogs/${props.blog_id}/like/add/`, {}, {  
                headers: {
                    Authorization : `Bearer ${localStorage.getItem("access")}`
                },
            })
            .then((resp) => {
                // could do something here if failed return like oh please sign in otherwise it just doesn't change
                setLiked(true);
                setNumLikes(numLikes+1);
            });
        } else {
            // i think axios handles headers diff for delete
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem("access")}`
            }
            axios.delete(`/blogs/${props.blog_id}/like/`, {headers} )
            .then((resp) => {
                // could do something here if failed return like oh please sign in otherwise it just doesn't change
                setLiked(false);
                setNumLikes(numLikes-1);
            });
        }
    }

    return (
        // {/* Inspired By: https://www.bootdey.com/snippets/view/bs4-blog-timeline */}
        <div class="page-timeline">
            <div class="vtimeline-point">
                <div class="vtimeline-icon">
                    <FontAwesomeIcon icon={faCalendar} />
                    {/* <i class="fa fa-calendar-o"></i> */}
                </div>
                <div class="vtimeline-block">
                    <span class="vtimeline-date">{props.last_modified}</span>
                    <div class="vtimeline-content">
                        <img src={props.primary_photo} alt="" class="img-fluid mb20" />
                        <div class="d-flex justify-content-around">
                            <h2 class="blog-title">{props.title}</h2>
                            <div class="restaurant-icon d-flex flex-column justify-content-center align-items-center">
                                {/* <i class="fa fa-cutlery fa-2x" aria-hidden="true"></i> */}
                                <FontAwesomeIcon icon={faCutlery} size="2x" />
                                <a class="text-decoration-none text-center" href="restaurantPages/restaurant.html"><h5>{props.restaurant_name}</h5></a>
                            </div>
                        </div>
                        <p>
                            {props.description}
                        </p>
                        <hr />
                        <div class="d-flex justify-content-around align-items-center">
                            <button type="button" class="blog-btn share-btns">
                                <h5>{numLikes}</h5>
                                <br/>
                                {liked ?
                                    <FontAwesomeIcon icon={faHeartFill} size="2x" color="red" onClick={() => updateLike(false)} /> :
                                    <FontAwesomeIcon icon={faHeart} size="2x" onClick={() => updateLike(true)} />
                                }
                                {/* <i class="fa fa-heart-o fa-2x" aria-hidden="true"></i> */}
                            </button>
                            <a href={`/blogs/${props.blog_id}/`} class="blog-btn read-more">Read More</a>
                            <button type="button" class="blog-btn share-btns">
                                {/* <i class="fa fa-share fa-2x" aria-hidden="true"></i> */}
                                {/* Idk functionality for this lul */}
                                <FontAwesomeIcon icon={faShare} size="2x" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogPostTimeline;