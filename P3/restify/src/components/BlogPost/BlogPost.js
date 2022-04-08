import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./blogPost.css";

import axios from "axios";
import { useParams } from 'react-router-dom';


function BlogPost(props) {

    const { id } = useParams();
    const [numLikes, setNumLikes] = useState(0);

    return (
        <>
            {/* Inspired By: https://www.bootdey.com/snippets/view/blog-detail-page */}
            <div class="col-lg-8 m-15px-tb">
                <article class="article">
                    <div class="article-img">
                        <img src={props.primary_photo} title="Restaurant Image" alt="Primary Photo" />
                    </div>
                    <div class="article-title">
                        <h2>{props.title}</h2>
                        <ul class="post-meta list-inline d-flex justify-content-between">
                            <li class="list-inline-item">
                                <i class="fa fa-cutlery fa-3x" aria-hidden="true"></i>
                                <h5>{props.restaurant_name}</h5>
                            </li>
                            <li class="list-inline-item">
                                <i class="fa fa-calendar-o fa-3x"></i>
                                {/* convert timestamp */}
                                <h5>{props.last_modified}</h5>
                            </li>
                            <li class="list-inline-item">
                                <div class="d-flex">
                                    <button type="button" class="like-btn">
                                        <i class="fa fa-heart-o fa-3x" aria-hidden="true"></i>
                                        {/* <!-- ON CLICK CHANGE TO THIS and red will be adjusted with javascript --> */}
                                        {/* <!-- <i class="fa fa-heart fa-3x" aria-hidden="true"></i> --> */}
                                    </button>
                                    <div>
                                        <h5>Like this Blog Post!</h5><br />
                                        <div class="h7">{props.num_likes} Likes</div>
                                    </div>
                                </div>
                                
                            </li>
                        </ul>
                    </div>
                    <div class="article-content">
                        <p>{props.description}</p>
                        <h4>Some images from the Blog Post</h4>
                        <div class="d-flex flex-row">
                            <img class="blog-img" src={props.photo_1} title="BlogPost Image 1" alt="BlogPost Image 1" />
                            <img class="blog-img" src={props.photo_2} title="BlogPost Image 2" alt="BlogPost Image 2" />
                            <img class="blog-img" src={props.photo_3} title="BlogPost Image 3" alt="BlogPost Image 3" />
                        </div>
                    </div>
                </article>
            </div>
        </>
    )
}

export default BlogPost;