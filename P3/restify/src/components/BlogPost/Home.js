import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from "axios";
import BlogPostTimeline from './BlogPostTimeline';

function Home(props) {

    const [blogs, setBlogs] = useState([]);
    const [numPosts, setNumPosts] = useState(0);

    useEffect(() => {
        getHomePosts();
    }, []);

    function getHomePosts() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }

        axios.get(`/blogs/home/`, {headers})
        .then((response) => {
            setBlogs(response['data']['results']);
            setNumPosts(response['data']['count']);
            return;
        });
    }

    return (
        // {/* Inspired By: https://www.bootdey.com/snippets/view/bs4-blog-timeline */}
        <div id="intro">
            <div class="blog-single main-bg h-100 tone-down-bg">
                <div class="container mt-md-5">
                    <div class="container mb80">
                        <div class="jumbotron text-center">
                            <h1 class="mb-4 title-style">Your Feed</h1>
                        </div>
                        {blogs.map(function(object, i) {
                            return <BlogPostTimeline blog_id={object['id']} description={object['description']} last_modified={object['last_modified']} 
                                                     primary_photo={object['primary_photo']} title={object['title']} num_likes={object['bloglikes'].length} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;