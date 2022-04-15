import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { useParams } from 'react-router-dom';
import axios from "axios";
import BlogPostTimeline from "../BlogPost/BlogPostTimeline";

function RestaurantBlogs(props) {

    const { id } = useParams();
    const [blogs, setBlogs] = useState([]);
    const [numPosts, setNumPosts] = useState(0);
    const [nextToken, setNextToken] = useState(""); // TODO
    const [blogPostInfo, setBlogPostInfo] = useState({"restaurant_name":"", "restaurant_id":"", "title":"", "description":"",
                                                    "primary_photo": "", "photo_1": "", "photo_2": "", "photo_3": "",
                                                    "num_likes": 0, "last_modified": "" });

    useEffect(() => {
        getRestaurantPosts();
    }, []);

    function getRestaurantPosts() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("access")}`
        }

        axios.get(`/restaurants/${id}/blogs/`, {headers})
        .then((response) => {
            console.log(response);
            setBlogs(response['data']['results']);
            setNumPosts(response['data']['count']);
            setNextToken(response['data']['next']);
            return;
        });
    }
                                                

    return (
        <div class="container">
            {blogs.map(function(object, i) {
                return <BlogPostTimeline is_owner={object['is_owner']} blog_id={object['id']} description={object['description']} last_modified={object['last_modified']} 
                                        primary_photo={object['primary_photo']} title={object['title']} num_likes={object['bloglikes'].length} />
            })}
        </div>
    );
}

export default RestaurantBlogs;