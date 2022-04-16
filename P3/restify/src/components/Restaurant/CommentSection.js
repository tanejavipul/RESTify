import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from 'bootstrap/dist/css/bootstrap.min.css';

import styles from "./comment.css";

import axios from "axios";
import { useParams } from 'react-router-dom';
import Comment from './Comment';


function CommentSection(props) {

    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [numComments, setNumComments] = useState(0);
    const [nextToken, setNextToken] = useState(""); // TODO

    useEffect(() => {
        getComments();
    }, []);

    function getComments() {
        let headers;
        console.log(localStorage.getItem('access'));
        if (localStorage.getItem('access') !== null) {
            headers = {
                'Authorization': `Bearer ${localStorage.getItem("access")}`
            }
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
        <div className={"container"}>
            <div className={"row d-flex justify-content-center"}>
                <div className={"col-md-8 col-sm-12"}>
                    <div className={"comment-wrapper"}>
                        <div className={"panel panel-info"}>
                            <div className={"comment-panel-body"}>
                                <textarea id="comment-text" className="form-control" placeholder="Write a Comment..." rows="3"></textarea>
                                <br />
                                <div className={"d-flex justify-content-end comment-mr-1"}>
                                    <button className={"post-comment-btn"} type="button" onClick={() => postComment(document.getElementById('comment-text').value)} >Post</button>
                                </div>
                                <hr />
                                <div className={"d-flex flex-column"}>
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