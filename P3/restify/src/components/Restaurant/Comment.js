import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./comment.css";

import axios from "axios";
import { useParams } from 'react-router-dom';


function Comment(props) {

    const [time, setTime] = useState("");

    useEffect(() => {
        getTime()
    }, [props]);

    function getTime() {
        let date = new Date(props.timestamp);
        let finalTime = date.toLocaleTimeString([], {
            year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
        });
        setTime(`${finalTime}`);
    }

    return (
        // Inspired by https://www.bootdey.com/snippets/view/Simple-Comment-panel
        <>
        <div class="comment-media">
            <a class="pull-comment-left">
                {/* Don't love this but probably better than hardcoding url for each image */}
                <img src={`/Media/${props.profile_pic}`} alt="" class="comment-img-circle" />
            </a>
            <div class="media-body">
                <span class="text-muted comment-float-right">
                    <small class="text-muted">{time}</small>
                </span>
                <strong class="text-success">@{props.username}</strong>
                <p>
                    {props.comment}
                </p>
            </div>
        </div>
        <hr />
    </>
    )
}

export default Comment;