import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./blogPost.css";
// import usernameSVG from "../../assets/Icons/email.svg"
// import passwordSVG from "../../assets/Icons/lock.svg"

function FollowRestaurant(props) {

    const [followed, setFollowed] = useState(false);

    useEffect(() => {
        document.title = "RESTify"
    }, []);


    return (
        <>
            {/* Inspired By: https://www.bootdey.com/snippets/view/blog-detail-page */}
            {/* <!-- Restaurant Author --> */}
            <div class="widget widget-author">
                <div class="widget-title">
                    <h3>Restaurant Name</h3>
                </div>
                <div class="widget-body">
                    <div class="media align-items-center d-flex flex-row">
                        <a href="restaurantPages/restaurant.html" class="text-decoration-none">
                            <div class="avatar">
                                <img src="Images/pizza-pizza-logo.png" title="" alt="" />
                            </div>
                        </a>
                        <div class="media-body">
                            <h6>Hello 👋, This is a blog post from Restaurant Name Here!</h6>
                        </div>
                    </div>
                    <p class="text-center m-3">This is a bio of the restaurant.</p>
                    <div class="d-grid mt-2">
                        <button class="d-flex justify-content-center btn btn-primary fa" type="button">Follow Restaurant Name</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FollowRestaurant;