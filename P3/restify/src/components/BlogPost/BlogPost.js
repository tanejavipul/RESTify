import {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./blogPost.css";

import axios from "axios";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartFill, faCutlery } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faCalendar } from '@fortawesome/free-regular-svg-icons';

function BlogPost(props) {

    const { id } = useParams();
    const [numLikes, setNumLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [time, setTime] = useState("");

    useEffect(() => {
        setLiked(props.liked);
        setNumLikes(props.num_likes);
        getTime();
    }, [props]);
    
    function getTime() {
        let date = new Date(props.last_modified);
        let finalTime = date.toLocaleDateString('en-US');
        setTime(`${finalTime}`);
    }

    function updateLike(like) {
        console.log('clicked');
        // follow bool to check if we are liking or unliking
        if (like) {
            axios.post(`/blogs/${id}/like/add/`, {}, {  
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
            axios.delete(`/blogs/${id}/like/`, {headers} )
            .then((resp) => {
                // could do something here if failed return like oh please sign in otherwise it just doesn't change
                setLiked(false);
                setNumLikes(numLikes-1);
            });
        }
    }

    return (
        <>
            {/* Inspired By: https://www.bootdey.com/snippets/view/blog-detail-page */}
            <div class="col-lg-8 m-15px-tb">
                <article class="article">
                    <div class="article-img">
                        {/* May need to change width */}
                        <img style={{height: '100%', width: '50%', objectFit: 'contain' }} class="mx-auto d-block" src={props.primary_photo} title="Restaurant Image" alt="" />
                    </div>
                    <div class="article-title">
                        <h2 class="text-center blog-title">{props.title}</h2>
                        <ul class="post-meta list-inline d-flex justify-content-between">
                            <div class="d-flex">
                                <li class="list-inline-item">
                                    <FontAwesomeIcon icon={faCutlery} size="3x" />
                                    <Link to={`/restaurant/${props.restaurant_id}/`} className="text-center navbar-logo-color text-decoration-none">
                                        <h5 class="ml-2">{props.restaurant_name}</h5>
                                    </Link>
                                </li>
                            </div>
                            <li class="list-inline-item">
                                <FontAwesomeIcon icon={faCalendar} size="3x" />
                                <h5 class="ml-2">{time}</h5>
                            </li>
                            <li class="list-inline-item">
                                <div class="d-flex">
                                        {props.is_owner ?
                                            <>
                                                <button disabled type="button" class="like-btn">
                                                    <FontAwesomeIcon disabled icon={faHeartFill} size="3x" color="" />
                                                </button>
                                            </> :
                                            <>
                                                <button type="button" class="like-btn">
                                                {liked ?
                                                    <FontAwesomeIcon icon={faHeartFill} size="3x" color="red" onClick={() => updateLike(false)} /> :
                                                    <FontAwesomeIcon icon={faHeart} size="3x" onClick={() => updateLike(true)} />
                                                }
                                                </button>
                                            </>
                                        }
                                    {/* </button> */}
                                    <div>
                                        <h5>Like this Blog Post!</h5><br />
                                        <div class="h7">{numLikes} Likes</div>
                                    </div>
                                </div>
                                
                            </li>
                        </ul>
                    </div>
                    <div class="article-content">
                        <p class="h4">{props.description}</p>
                        {/* <h4>Some images from the Blog Post</h4>
                        <div class="d-flex flex-row">
                            <img class="blog-img" src={props.photo_1} title="BlogPost Image 1" alt="BlogPost Image 1" />
                            <img class="blog-img" src={props.photo_2} title="BlogPost Image 2" alt="BlogPost Image 2" />
                            <img class="blog-img" src={props.photo_3} title="BlogPost Image 3" alt="BlogPost Image 3" />
                        </div> */}
                    </div>
                </article>
            </div>
        </>
    )
}

export default BlogPost;