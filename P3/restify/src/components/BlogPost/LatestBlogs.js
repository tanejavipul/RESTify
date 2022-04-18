import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from "axios";
import LatestBlog from "./LatestBlog";

function LatestBlogs(props) {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        getBlogs();
    }, [props.restaurant_id]);

    function getBlogs() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.get(`/restaurants/${props.restaurant_id}/blogs/`, {headers})
        .then((resp) => {
            if(resp.status === 200) {
                console.log('respo', resp);
                let data = resp.data.results;

                for (let x = 0; x < resp.data.results.length; x++) {
                    // limit blog posts
                    if (x < 3) { 
                        let time = getTime(data[x]['last_modified']);
                        let temp = {"id": data[x].id, "is_owner": data[x].is_owner, "description": data[x].description, "title": data[x].title, "last_modified": time, "primary_photo": data[x].primary_photo}
                        console.log('blogs, ', blogs);
                        setBlogs(blogs => [...blogs, temp]);
                    }
                }
            }
        });
    }

    function getTime(timestamp) {
        let date = new Date(timestamp);
        return date.toLocaleDateString('en-US');
    }


    return (
        <>
            {/* Inspired By: https://www.bootdey.com/snippets/view/blog-detail-page */}
            <div class="widget widget-latest-post">
                <div class="widget-title">
                    <h3>Latest Blog Posts From This Restaurant </h3>
                </div>
                {blogs.map(function(object, i) {
                    return <LatestBlog id={object['id']} last_modified={object['last_modified']} primary_photo={object['primary_photo']} title={object['title']} />
                })}
            </div>
            {/* <!-- End Latest Posts --> */}
        </>
    )
}

export default LatestBlogs;