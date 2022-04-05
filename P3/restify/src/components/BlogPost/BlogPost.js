import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./blogPost.css";

function BlogPost(props) {

    const [liked, setLiked] = useState(false);

    useEffect(() => {
        document.title = "RESTify"
    }, []);


    return (
        <>
            {/* Inspired By: https://www.bootdey.com/snippets/view/blog-detail-page */}
            <div class="col-lg-8 m-15px-tb">
                <article class="article">
                    <div class="article-img">
                        <img src="Images/restaurant-blog-page.jpg" title="Restaurant Image" alt="Image of restaurant" />
                    </div>
                    <div class="article-title">
                        <h2>Blog Post Title</h2>
                        <ul class="post-meta list-inline d-flex justify-content-between">
                            <li class="list-inline-item">
                                <i class="fa fa-cutlery fa-3x" aria-hidden="true"></i>
                                <h5>Pizza Pizza</h5>
                            </li>
                            <li class="list-inline-item">
                                <i class="fa fa-calendar-o fa-3x"></i>
                                <h5>29 Feb 2022</h5>
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
                                        <div class="h7">400 Likes</div>
                                    </div>
                                </div>
                                
                            </li>
                        </ul>
                    </div>
                    <div class="article-content">
                        <p>{pulledData}</p>
                        <h4>Some images from the Blog Post</h4>
                        <div class="d-flex flex-row">
                            <img class="blog-img" src="Images/restaurant-blog-page.jpg" title="Restaurant Image" alt="Image of restaurant" />
                            <img class="blog-img" src="Images/ithaa-1.jpeg" title="Restaurant Image" alt="Image of restaurant" />
                            <img class="blog-img" src="Images/oliver-bonacini-hospitality-lena-restaurant-event-space-semi-private-dining-bar-overview-1024x682.jpeg" title="Restaurant Image" alt="Image of restaurant" />
                        </div>
                    </div>
                </article>
            </div>
        </>
    )
}

export default BlogPost;