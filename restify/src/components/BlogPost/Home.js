import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from "axios";
import BlogPostTimeline from './BlogPostTimeline';
import Navbar from "../Navbar/Navbar";

function Home(props) {

    const [blogs, setBlogs] = useState([]);
    const [nextToken, setNextToken] = useState(`/blogs/home/?page=1`); // TODO

    useEffect(() => {
        // issue with initial pull since home page not scrollable initially
        if (nextToken == '/blogs/home/?page=1') {
            getHomePosts();
        }
        document.getElementsByTagName('body')[0].onscroll = (e) => scrollPage(e);
        // return function cleanupListener() {
        //     console.log('removed');
        //     document.removeEventListener('body', scrollPage);
        // }
    }, [nextToken]);

    const scrollPage = (e) => {
        if(document.documentElement.scrollHeight <= window.innerHeight + document.documentElement.scrollTop) {
            // console.log('scrolled to the bottom');
            getHomePosts();
        }
    };

    function getHomePosts() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("access")}`
        }

        if (nextToken) {
            axios.get(nextToken, { headers })
            .then((resp) => {
                if(resp.status === 200) {
                    console.log('respo', resp);
                    let data = resp.data.results;
                    setNextToken(resp.data.next);

                    for (let x = 0; x < resp.data.results.length; x++) {
                        let temp = { "id": data[x].id, "title": data[x].title, "description": data[x].description, "primary_photo": data[x].primary_photo, "last_modified": data[x].last_modified, "bloglikes": data[x].bloglikes }
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

    return (
        // {/* Inspired By: https://www.bootdey.com/snippets/view/bs4-blog-timeline */}
        <>
            <Navbar />
            <div id="intro">
                <div className="blog-single main-bg h-100 tone-down-bg">
                    <div className="container mt-md-5">
                        <div className="container mb80">
                            <div className="jumbotron text-center">
                                <h1 className="mb-4 title-style">Your Feed</h1>
                            </div>
                            {blogs.map(function(object, i) {
                                return <BlogPostTimeline blog_id={object['id']} description={object['description']} last_modified={object['last_modified']}
                                                        primary_photo={object['primary_photo']} title={object['title']} num_likes={object['bloglikes'].length} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;