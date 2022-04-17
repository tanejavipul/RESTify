import {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./blogPost.css";

import axios from "axios";
import { useParams } from 'react-router-dom';


function FollowRestaurant(props) {

    const [following, setFollowing] = useState(false);
    const [restaurantBio, setBio] = useState("");
    const [logo, setLogo] = useState("");

    useEffect(() => {
        getRestaurantInfo();
        setFollowing(props.is_following);
    }, [props]);

    function getRestaurantInfo() {
        console.log(props);
        console.log(props.restaurant_id);

        axios(`/restaurants/${props.restaurant_id}/view/`)
        .then((response) => {
            setBio(response['data']['description']);
            setLogo(response['data']['logo']);
            return;
        });
    }

    function updateFollow(follow) {
        // follow bool to check if we are following or unfollowing
        if (follow) {
            axios.post(`/restaurants/follow/${props.restaurant_id}/`, {}, {  
                headers: {
                    Authorization : `Bearer ${localStorage.getItem("access")}`
                },
            })
            .then((resp) => {
                // could do something here if failed return like oh please sign in otherwise it just doesn't change
                setFollowing(true);
            });
        } else {
            // i think axios handles headers diff for delete
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem("access")}`
            }
            axios.delete(`/restaurants/follow/${props.restaurant_id}/`, {headers} )
            .then((resp) => {
                // could do something here if failed return like oh please sign in otherwise it just doesn't change
                setFollowing(false);
            });
        }
    }


    return (
        // Inspired By: https://www.bootdey.com/snippets/view/blog-detail-page
        // <!-- Restaurant Author -->
        <div class="widget widget-author">
            <div class="widget-title">
                <Link to={`/restaurant/${props.restaurant_id}/`} className="text-center navbar-logo-color text-decoration-none">
                    <h3>{props.restaurant_name}</h3>
                </Link>
            </div>
            <div class="widget-body">
                <div class="media align-items-center d-flex flex-row">
                    {/* Not sure if link is right for now just temp */}
                    <a href={`restaurantPages/${props.restaurant_id}/`} class="text-decoration-none">
                        <div class="avatar">
                            <img src={logo} title="" alt="" />
                        </div>
                    </a>
                    <div class="media-body">
                        <h6 class="follow-restaurant-bio">Hello 👋, This is a blog post from {props.restaurant_name}!</h6>
                    </div>
                </div>
                <p class="text-center m-3">{restaurantBio}</p>
                <div class="d-grid mt-2">
                    {following ?
                        <button class="d-flex justify-content-center btn btn-primary fa" type="button" onClick={() => updateFollow(false)} >Unfollow {props.restaurant_name}</button> :
                        <button class="d-flex justify-content-center btn btn-primary fa" type="button" onClick={() => updateFollow(true)} >Follow {props.restaurant_name}</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default FollowRestaurant;