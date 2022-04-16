import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from "axios";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from '@fortawesome/free-solid-svg-icons';
import exampleBlog from '../assets/Blogs/example-blog.png';

function BlogPostEdit(props) {

    const { id } = useParams();
    const [primaryPhoto, setPrimaryPhoto] = useState(null);
    const [blogPostInfo, setBlogPostInfo] = useState({"is_owner":"", "restaurant_name":"", "restaurant_id":"", "title":"", "description":"",
                                                      "primary_photo": "", "photo_1": "", "photo_2": "", "photo_3": "",
                                                      "num_likes": 0, "last_modified": "" });

    useEffect(() => {
        pullBlogPost();
    }, []);

    async function pullBlogPost() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        let response = await axios.get(`/blogs/${id}/`, {headers});
        setBlogPostInfo(response['data']);
    }
    
    function submitChanges(e) {
        e.preventDefault();
        const formData = new FormData();

        if (primaryPhoto) {
            formData.append('primary_photo', primaryPhoto, primaryPhoto.name);
        }
        
        formData.append('title', document.getElementById('blog-post-title').value);
        formData.append('description', document.getElementById('blog-post').value);
        // maybe add 3 other images?
        // console.log(Array.from(formData));
        // console.log(Object.fromEntries(formData));

        const headers = {
            Authorization : `Bearer ${localStorage.getItem("access")}`,
        };
        axios.put(`/blogs/${id}/edit/`, formData, {headers})
        .then((resp) => {
            console.log(resp);
            window.location.replace(`/blogs/${id}/`);
        });   
    }

    const changeImage = event => {
        setPrimaryPhoto(event.target.files[0]);
        setBlogPostInfo(prevBlogPostInfo => ({...prevBlogPostInfo, primary_photo: URL.createObjectURL(event.target.files[0])}));
    }

    return (
        <div id="edit-blog-intro">
            <div class="mask d-flex align-items-center h-100 tone-down-bg">
                <div class="container">
                    <form id="editBlogForm" class="edit-blog-row" style={{backgroundColor: 'white'}} >
                        <div class="d-flex justify-content-around">
                            <h2 class="flex-grow-1 edit-blog-h2">Add / Edit Blog Post</h2>
                            <h2 class="edit-blog-h2">Example Blog Post</h2>
                        </div>
                            <div class="d-flex column">
                            <div class="menu-item flex-grow-1">
                                <div class="d-flex justify-content-between align-items-end mb-3">
                                    <div class="d-flex align-items-end edit-add-img">
                                        {/* <button htmlFor="blog-main-img" class="edit-menu-img">
                                            {blogPostInfo['primary_photo'] ? 
                                                <img src={blogPostInfo['primary_photo']} alt='' /> :
                                                <FontAwesomeIcon icon={faImage} size="3x" />
                                            }
                                        </button> */}
                                        <label htmlFor="blog-main-img" class="edit-label edit-label-file mb-3">
                                            {blogPostInfo['primary_photo'] ? 
                                                <img src={blogPostInfo['primary_photo']} alt='' class="ml-3" /> :
                                                <FontAwesomeIcon icon={faImage} size="3x" className="mr-3" />
                                            }
                                            CHANGE / ADD A MAIN PHOTO (OPTIONAL)
                                        </label>
                                    </div>
                                    <input id="blog-main-img" type="file" class="btn shadow-none edit-input" onChange={event => changeImage(event)} />
                                </div>

                                
                                <div class="input-group mb-3">
                                    <label htmlFor="blog-post-title" class="edit-label col-3 edit-menu-label">BLOG POST TITLE:</label>
                                    <input id="blog-post-title" type="text" class="form-control col-9 edit-input-styling shadow-none" placeholder="Blog Post Title"
                                        aria-label="Username" aria-describedby="basic-addon1" defaultValue={blogPostInfo['title']} />
                                </div>

                                <div class="input-group mb-5 d-flex">
                                    <label htmlFor="blog-post" class="edit-label col-3 edit-menu-label">BLOG POST:</label>
                                    <textarea id="blog-post" type="text" class="form-control col-9 edit-input-styling shadow-none" placeholder="Type your blog post here"
                                        aria-label="Username" aria-describedby="basic-addon1" defaultValue={blogPostInfo['description']}></textarea>
                                </div>

                                <div class="d-flex justify-content-center align-items-end">
                                    <div class="d-flex align-items-end edit-add-img">
                                        <button class="edit-menu-img">
                                            <i class="fa fa-picture-o fa-3x edit-blog-img-thumbnail" aria-hidden="true"></i>
                                        </button>
                                        <label htmlFor="blog-imgs" class="edit-label edit-label-file mb-3">
                                        {/* ADD ADDITIONAL PHOTOS (OPTIONAL, LIMIT 3)
                                        <!-- LIMIT WILL BE IMPLEMENTED WITH JS --> */}
                                        </label>
                                    </div>
                                    <input id="blog-imgs" type="file" class="btn shadow-none edit-input" multiple />
                                </div>
                            </div>
                            <img src={exampleBlog} class="example-blog flex-shrink-0" />
                        </div>

                        <hr class="edit-line-break" />
                            
                        <div class="d-flex justify-content-between">
                            <a href={`/blogs/${id}/`} value="GO BACK" class="edit-save-btn btn shadow-none">GO BACK</a>

                            <input type="submit" onClick={(e) => submitChanges(e)} value="SAVE CHANGES" class="edit-save-btn btn shadow-none" />
                        </div>
                    </form>
                </div>    
            </div>
        </div>
    )
}

export default BlogPostEdit;