import profileSVG from "../../assets/Icons/profile.svg"
import avatar from "../../assets/Profile/avatar.png"
import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import notificationsSVG from "../../assets/Icons/notifications.svg"
import NotificationMessage from "../NotificationMessage/NotificationMessage";

const NotificationsDropDown = () => {
    const [prevScroll, setPrevScroll] = useState([1, 2, 3, 4, 5, 6,7]);

    useEffect(() => {
    }, []);

    const onScroll = (e) => {
        const tar = e.target
        console.log( e.target.scrollHeight, e.target.scrollTop, e.target.clientHeight);
        if(tar.scrollHeight === tar.scrollTop + tar.clientHeight){
            if(prevScroll !== tar.scrollHeight ){
                setPrevScroll([...prevScroll, 10])
            }
        }};


    return(
    <>
        <div className="dropdown navbar-dropdown w-100 f"  >
            <button className="btn  navbar-button-styling dropdown-toggle" type="button"
                    id="dropdownNotificationsButton" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={notificationsSVG}/>Notification
            </button>
            <div className=" dropdown-menu dropdown-menu-width scrollable dropdown-padding scrollable navbar-background"
                 aria-labelledby="dropdownNotificationsButton" onScroll={onScroll}>
                {
                    prevScroll.map(function () {
                        return <NotificationMessage/>
                    })
                }

            </div>
        </div>








    </>)






}


export default NotificationsDropDown