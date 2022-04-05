// import IconInput from "../../CP/LoginInput/IconInput";
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./blogPost.css";
import LatestBlogs from "./LatestBlogs";
import FollowRestaurant from './FollowRestaurant';
import BlogPost from './BlogPost';

// import usernameSVG from "../../assets/Icons/email.svg"
// import passwordSVG from "../../assets/Icons/lock.svg"

function BlogPostPage(props) {

    const [liked, setLike] = useState(false);

    useEffect(() => {
        document.title = "RESTify"
    }, []);


    return (
        <>
            {/* Inspired By: https://www.bootdey.com/snippets/view/blog-detail-page */}
            <div id="intro">
                <div class="blog-single tone-down-bg">
                    <div class="container">
                        <div class="blog-post row align-items-start">
                            <BlogPost />
                            <div class="col-lg-4 m-15px-tb blog-aside">
                                <FollowRestaurant/>
                                <LatestBlogs />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogPostPage;