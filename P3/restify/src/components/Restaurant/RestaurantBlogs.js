import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { useParams } from 'react-router-dom';
import axios from "axios";
import BlogPostTimeline from "../BlogPost/BlogPostTimeline";

function RestaurantBlogs(props) {

    const { id } = useParams();
    const [page, setPage] = useState(1);

    const [blogs, setBlogs] = useState([]);
    const [numPosts, setNumPosts] = useState(0);
    const [nextToken, setNextToken] = useState(""); // TODO


    useEffect(() => {
        // getRestaurantPosts();
        pullMore();
        // window.addEventListener('scroll', scrollPage);
        document.getElementsByTagName('body')[0].onscroll = scrollPage;
        
    }, []);

    function pullMore() {
        if (page !== -1) {
            axios.get(`/restaurants/${id}/blogs/?page=` + page, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`
                },
            }).then((resp) => {
                if(resp.status === 200) {
                    console.log('respo', resp);
                    let data = resp.data.results
                    for (let x = 0; x < resp.data.results.length; x++) {
                        let temp = {"id": data[x].id, "description": data[x].description, "title": data[x].title, "last_modified": data[x].last_modified, "primary_photo": data[x].primary_photo, "bloglikes": data[x].bloglikes}
                        setBlogs(blogs => [...blogs, temp]);
                    }
                    setPage(page + 1)
                    if (resp.data.next === null) {
                        setPage(-1)
                    }
                }
            });
        }
    }

    const scrollPage = (e) => {
        // if (window.offsetHeight + window.scrollTop >= window.scrollHeight) {
        // if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        console.log(e);
        let element = e.target
        console.log( e.target.scrollHeight, e.target.scrollTop, e.target.clientHeight);
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            console.log('scrolled to the bottom');
            // pullMore();
        }
    };

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
        <div className="container">
            <div className="fuckmeintheass">
            {blogs.map(function(object, i) {
                return <BlogPostTimeline is_owner={object['is_owner']} blog_id={object['id']} description={object['description']} last_modified={object['last_modified']} 
                                        primary_photo={object['primary_photo']} title={object['title']} num_likes={object['bloglikes'].length} restaurant_name={object['restaurant_name']} />
            })}
            </div>
        </div>
    );
}

export default RestaurantBlogs;