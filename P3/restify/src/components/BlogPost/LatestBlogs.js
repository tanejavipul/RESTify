import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./blogPost.css";
// import usernameSVG from "../../assets/Icons/email.svg"
// import passwordSVG from "../../assets/Icons/lock.svg"

function LatestBlogs(props) {

    const [followed, setFollowed] = useState(false);

    useEffect(() => {
        document.title = "RESTify"
    }, []);


    return (
        <>
            {/* Inspired By: https://www.bootdey.com/snippets/view/blog-detail-page */}
            <div class="widget widget-latest-post">
                <div class="widget-title">
                    <h3>Latest Blog Posts From This Restaurant </h3>
                </div>
                <div class="widget-body">
                    <div class="latest-post-aside media">
                        <div class="d-flex lpa-left media-body justify-content-between">
                            <div class="lpa-title">
                                <a href="#"><h4 class="list-inline-item">Blog Post Most Recent</h4></a>
                            </div>
                            <div class="lpa-meta">
                                <h4 class="ml-2">29/2/2022</h4>
                            </div>
                        </div>
                        <div class="lpa-right">
                            <a href="#">
                                <img src="idk what this is" title="" alt="" />
                            </a>
                        </div>
                    </div>
                    <div class="latest-post-aside media">
                        <div class="d-flex lpa-left media-body justify-content-between">
                            <div class="lpa-title">
                                <a href="#"><h4 class="list-inline-item">Blog Post Second Most Recent</h4></a>
                            </div>
                            <div class="lpa-meta">
                                <h4 class="ml-2">26/2/2022</h4>
                            </div>
                        </div>
                        <div class="lpa-right">
                            <a href="#">
                                <img src="Images/Background.jpeg" title="" alt="" />
                            </a>
                        </div>
                    </div>
                    <div class="latest-post-aside media">
                        <div class="d-flex lpa-left media-body justify-content-between">
                            <div class="lpa-title">
                                <a href="#"><h4 class="list-inline-item">Blog Post Third Most Recent No Image</h4></a>
                            </div>
                            <div class="lpa-meta">
                                <h4 class="ml-2">24/2/2022</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End Latest Posts --> */}
        </>
    )
}

export default LatestBlogs;