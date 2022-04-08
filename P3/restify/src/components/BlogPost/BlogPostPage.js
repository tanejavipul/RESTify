// import IconInput from "../../CP/LoginInput/IconInput";
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./blogPost.css";
import LatestBlogs from "./LatestBlogs";
import FollowRestaurant from './FollowRestaurant';
import BlogPost from './BlogPost';
import { useParams } from 'react-router-dom';
import axios from "axios";

function BlogPostPage(props) {

    const { id } = useParams();
    const [blogPostInfo, setBlogPostInfo] = useState({"restaurant_name":"", "restaurant_id":"", "title":"", "description":"",
                                                    "primary_photo": "", "photo_1": "", "photo_2": "", "photo_3": "",
                                                    "num_likes": 0, "last_modified": "" });

    useEffect(() => {
        document.title = "RESTify";
        localStorage.setItem('accessToken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5NDUyNDIyLCJpYXQiOjE2NDkzNjYwMjIsImp0aSI6IjM1NmYxOGQ0YTZlZTRmMTc5MmE2YTQzY2IxNDBjZmRkIiwidXNlcl9pZCI6M30.vV9Hkq8px0O-YbvqLNMzwrFeJB9qPF5_l11JqsrwDqU');
        console.log(`ID: ${id}`);
        getBlogPostInfo(id);
        console.log(blogPostInfo);
    }, []);

    function getBlogPostInfo(id) {
        axios(`/blogs/${id}/`)
        .then((response) => {
            console.log(response['data']);
            // console.log(response['restaurant']);
            setBlogPostInfo(response['data']);
            return response['data'];
        });
    }

    return (
        // {/* Inspired By: https://www.bootdey.com/snippets/view/blog-detail-page */}
        <div id="intro">
            <div class="blog-single tone-down-bg">
                <div class="container">
                    <div class="blog-post row align-items-start">
                        <BlogPost restaurant_name={blogPostInfo['restaurant_name']} title={blogPostInfo['title']} description={blogPostInfo['description']}
                                  primary_photo={blogPostInfo['primary_photo']} photo_1={blogPostInfo['photo_1']} photo_2={blogPostInfo['photo_2']} photo_3={blogPostInfo['photo_3']}
                                  num_likes={blogPostInfo['num_likes']} last_modified={blogPostInfo['last_modified']} />
                        <div class="col-lg-4 m-15px-tb blog-aside">
                            <FollowRestaurant restaurant_name={blogPostInfo['restaurant_name']} restaurant_id={blogPostInfo['restaurant_id']} />
                            <LatestBlogs />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogPostPage;