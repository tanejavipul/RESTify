import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { useParams } from 'react-router-dom';
import axios from "axios";
import BlogPostTimeline from "../BlogPost/BlogPostTimeline";


function RestaurantBlogs(props) {

    const { id } = useParams();

    const [blogs, setBlogs] = useState([]);
    const [numbers, setNumbers] = useState(1);
    const [nextToken, setNextToken] = useState(""); // TODO


    useEffect(() => {
        // getRestaurantPosts();
        pullMore();
        setNumbers(2);
        // window.addEventListener('scroll', scrollPage);
        document.getElementsByTagName('body')[0].onscroll = (e) => scrollPage(e);
    }, []);

    const pullMore = () => {
        if (numbers !== -1) {
            axios.get(`/restaurants/${id}/blogs/?page=` + numbers, {
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
                    setNumbers(2);
                    console.log("pages", numbers+1);
                    if (resp.data.next === null) {
                        setNumbers(-1);
                    }
                }
            });
        }
    }

    const scrollPage = (e) => {
        // if (window.offsetHeight + window.scrollTop >= window.scrollHeight) {
        // if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        // console.log(e);
        // let element = e.target
        // console.log( e.target.scrollHeight, e.target.scrollTop, e.target.clientHeight);
        // if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        if(document.documentElement.scrollHeight === window.innerHeight + document.documentElement.scrollTop) {
            console.log('scrolled to the bottom');
            pullMore();
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
            // setNumPosts(response['data']['count']);
            setNextToken(response['data']['next']);
            return;
        });
    }
                                                

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