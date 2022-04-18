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
    const [nextToken, setNextToken] = useState(`/restaurants/${id}/viewComments/?page=1`);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
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
            axios.get(nextToken, { headers })
            .then((resp) => {
                if(resp.status === 200) {
                    console.log('respo', resp);
                    let data = resp.data.results;
                    setNextToken(resp.data.next);

                    for (let x = 0; x < resp.data.results.length; x++) {
                        let temp = {"comment": data[x].comment, "datetime": data[x].datetime, "username": data[x].username, "profile_pic": data[x].profile_pic}
                        setComments(comments => [...comments, temp]);
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
        if(document.documentElement.scrollHeight <= window.innerHeight + document.documentElement.scrollTop+2) {
            pullMore();
        }
    };

    // function getComments() {
    //     let headers;
    //     console.log(localStorage.getItem('access'));
    //     if (localStorage.getItem('access') !== null) {
    //         headers = {
    //             'Authorization': `Bearer ${localStorage.getItem("access")}`
    //         }
    //     }

    //     axios.get(`/restaurants/${id}/viewComments/`, {headers})
    //     .then((response) => {
    //         setComments(response['data']['results']);
    //         setNumComments(response['data']['count']);
    //         setNextToken(response['data']['next']);
    //         return;
    //     });
    // }

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
            // getComments();
            // setNextToken(`/restaurants/${id}/viewComments/?page=1`);
            // console.log('res', response);
            let temp = {"comment": response.data.comment, "datetime": response.data.datetime, "username": response.data.username, "profile_pic": response.data.profile_pic}
            console.log(response.data);
            setComments(comments => [temp, ...comments]);
            document.getElementById('comment-text').value="";
            return;
        }).catch((err) => {
            if (err.response.status === 400) {
                setErrors(err.response.data);
            }
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
                                    {Object.keys(errors).length > 0 &&
                                        <div className="col-lg-12">
                                            <i>Please fix the following errors</i>
                                            {
                                                Object.keys(errors).map(name => (
                                                    <div style={{color: 'red'}}>{name} : {errors[name]}</div>
                                                ))
                                            }
                                        </div>
                                    }
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