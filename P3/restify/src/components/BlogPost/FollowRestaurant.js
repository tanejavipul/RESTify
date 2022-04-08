import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./blogPost.css";

import axios from "axios";
import { useParams } from 'react-router-dom';


function FollowRestaurant(props) {

    const { id } = useParams();

    const [followed, setFollowed] = useState(false);
    const [restaurantBio, setBio] = useState("");
    const [logo, setLogo] = useState("");

    useEffect(() => {
        getRestaurantInfo();
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


    return (
        // Inspired By: https://www.bootdey.com/snippets/view/blog-detail-page
        // <!-- Restaurant Author -->
        <div class="widget widget-author">
            <div class="widget-title">
                <h3>{props.restaurant_name}</h3>
            </div>
            <div class="widget-body">
                <div class="media align-items-center d-flex flex-row">
                    {/* Not sure if link is right for now just temp */}
                    <a href={`restaurantPages/${props.restaurant_id}/view/`} class="text-decoration-none">
                        <div class="avatar">
                            <img src={logo} title="" alt="" />
                        </div>
                    </a>
                    <div class="media-body">
                        <h6>Hello 👋, This is a blog post from {props.restaurant_name}!</h6>
                    </div>
                </div>
                <p class="text-center m-3">{restaurantBio}</p>
                <div class="d-grid mt-2">
                    <button class="d-flex justify-content-center btn btn-primary fa" type="button">Follow {props.restaurant_name}</button>
                </div>
            </div>
        </div>
    )
}

export default FollowRestaurant;