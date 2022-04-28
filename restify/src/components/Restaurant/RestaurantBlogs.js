import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { useParams } from 'react-router-dom';
import axios from "axios";
import BlogPostTimeline from "../BlogPost/BlogPostTimeline";


function RestaurantBlogs(props) {

    const { id } = useParams();

    const [blogs, setBlogs] = useState([]);
    const [nextToken, setNextToken] = useState(`/restaurants/${id}/blogs/?page=1`);


    useEffect(() => {
        // getRestaurantPosts();
        // setNumbers(2);
        // window.addEventListener('scroll', scrollPage);
        document.getElementsByTagName('body')[0].onscroll = (e) => scrollPage(e);
    }, [nextToken]);

    useEffect(() => {
        pullMore();
    }, []);

    const pullMore = () => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        if (nextToken) {
            // console.log('enxttoken:', nextToken);
        // if (numbers !== -1) {
            axios.get(nextToken, { headers })
            .then((resp) => {
                if(resp.status === 200) {
                    console.log('respo', resp);
                    let data = resp.data.results;
                    setNextToken(resp.data.next);

                    for (let x = 0; x < resp.data.results.length; x++) {
                        let temp = {"id": data[x].id, "is_owner": data[x].is_owner, "description": data[x].description, "title": data[x].title, "last_modified": data[x].last_modified, "primary_photo": data[x].primary_photo, "bloglikes": data[x].bloglikes}
                        setBlogs(blogs => [...blogs, temp]);
                    }
                    // console.log('next', resp.data.next);
                    // console.log("pages", numbers+1);
                    if (!resp.data.next) {
                        setNextToken(null);
                    }
                }
            });
        }
    }

    const scrollPage = (e) => {
        if(document.documentElement.scrollHeight <= window.innerHeight + document.documentElement.scrollTop) {
            // console.log('scrolled to the bottom');
            pullMore();
        }
    };                              

    return (
        <div className="container">
            {blogs.map(function(object, i) {
                return <BlogPostTimeline is_owner={object['is_owner']} blog_id={object['id']} description={object['description']} last_modified={object['last_modified']} 
                                        primary_photo={object['primary_photo']} title={object['title']} num_likes={object['bloglikes'].length} restaurant_name={object['restaurant_name']} />
            })}
        </div>
    );
}

export default RestaurantBlogs;