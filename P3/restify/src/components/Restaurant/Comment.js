import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./comment.css";

import axios from "axios";
import { useParams } from 'react-router-dom';


function Comment(props) {
    return (
        // Inspired by https://www.bootdey.com/snippets/view/Simple-Comment-panel
        <>
        <div class="media">
            <a href="restaurant.html" class="pull-left">
                {/* Don't love this but probably better than hardcoding url for each image */}
                <img src={`/Media/${props.profile_pic}`} alt="" class="img-circle" />
            </a>
            <div class="media media-body">
                <span class="text-muted pull-right">
                    <small class="text-muted">{props.timestamp}</small>
                </span>
                <a href="restaurant.html" class="text-decoration-none">
                    <strong class="text-success">@{props.username}</strong>
                </a>
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