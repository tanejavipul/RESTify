import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./comment.css";

import axios from "axios";
import { useParams } from 'react-router-dom';
import Comment from './Comment';


function CommentSection(props) {

    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [numComments, setNumComments] = useState(0);
    const [nextToken, setNextToken] = useState(""); // TODO

    useEffect(() => {
        // localStorage.setItem('access', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5NjE5MzUxLCJpYXQiOjE2NDk1MzI5NTEsImp0aSI6IjUzMTU0ZjBhOWQ0ZjQ5MTdhNmJiODA4MTVmMmU1M2UxIiwidXNlcl9pZCI6M30.FP5iKHavSBoSYCRhI1Jh-ILazqXneDYcnzWCPXmWeWQ');
        getComments();
    }, []);

    function getComments() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("access")}`
        }

        axios.get(`/restaurants/${id}/viewComments/`, {headers})
        .then((response) => {
            setComments(response['data']['results']);
            setNumComments(response['data']['count']);
            setNextToken(response['data']['next']);
            return;
        });
    }

    function postComment(comment) {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("access")}`
        }
        const body = {
            'comment': comment
        }

        axios.post(`/restaurants/${id}/addComment/`, body, {headers})
        .then((response) => {
            //prob not the greatest idea? maybe we could change addComment to return new list of comments so no pull again
            getComments();
            document.getElementById('comment-text').value="";
            return;
        });
    }

    return (
        // Inspired by https://www.bootdey.com/snippets/view/Simple-Comment-panel
        <div class="container">
            <div class="row d-flex justify-content-center">
                <div class="col-md-8 col-sm-12">
                    <div class="comment-wrapper">
                        <div class="panel panel-info">
                            <div class="panel-body">
                                <textarea id="comment-text" class="form-control" placeholder="Write a Comment..." rows="3"></textarea>
                                <br />
                                <div class="d-flex justify-content-end mr-1">
                                    <button class="post-btn" type="button" onClick={() => postComment(document.getElementById('comment-text').value)} >Post</button>
                                </div>
                                <hr />
                                <div class="d-flex flex-column">
                                    {comments.map(function(object, i) {
                                        return <Comment username={object['username']} timestamp={object['datetime']} comment={object['comment']} profile_pic={object['profile_pic']} />
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentSection;