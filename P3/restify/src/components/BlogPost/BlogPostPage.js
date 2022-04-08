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
    const [isFollowing, setFollowing] = useState(false);
    const [pulledLike, hasLiked] = useState(false);
    const [blogPostInfo, setBlogPostInfo] = useState({"restaurant_name":"", "restaurant_id":"", "title":"", "description":"",
                                                    "primary_photo": "", "photo_1": "", "photo_2": "", "photo_3": "",
                                                    "num_likes": 0, "last_modified": "" });

    useEffect(() => {
        localStorage.setItem('accessToken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5NDUyNDIyLCJpYXQiOjE2NDkzNjYwMjIsImp0aSI6IjM1NmYxOGQ0YTZlZTRmMTc5MmE2YTQzY2IxNDBjZmRkIiwidXNlcl9pZCI6M30.vV9Hkq8px0O-YbvqLNMzwrFeJB9qPF5_l11JqsrwDqU');
        console.log(`ID: ${id}`);
        
        async function pullFollowing(restaurant_id) {
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
            axios.get(`/restaurants/follow/${restaurant_id}/`, {headers})
            .then((response) => {
                console.log(response);
                setFollowing(response['data']['result']);
                return;
            })
        }

        async function pullLiked() {
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
            axios.get(`/blogs/${id}/like/`, {headers})
            .then((response) => {
                console.log(response);
                hasLiked(response['data']['result']);
                return;
            })
        }

        async function getBlogPostInfo(id) {
            // hate the awaits can probably change working for now
            let response = await axios(`/blogs/${id}/`);
            let x = await setBlogPostInfo(response['data']);
            let y = await pullFollowing(response['data']['restaurant_id']);
            let z = await pullLiked();
        }

        getBlogPostInfo(id);
        console.log(blogPostInfo);
    }, []);

    return (
        // {/* Inspired By: https://www.bootdey.com/snippets/view/blog-detail-page */}
        <div id="intro">
            <div class="blog-single tone-down-bg">
                <div class="container">
                    <div class="blog-post row align-items-start">
                        <BlogPost restaurant_name={blogPostInfo['restaurant_name']} title={blogPostInfo['title']} description={blogPostInfo['description']}
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
    );
}

export default BlogPostPage;