import profileSVG from "../../assets/Icons/profile.svg"
import avatar from "../../assets/Profile/avatar.png"
import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import notificationsSVG from "../../assets/Icons/notifications.svg"
import NotificationMessage from "./NotificationMessage/NotificationMessage";
import { NotificationNav } from '../Model';

const NotificationsDropDown = () => {
    const [prevScroll, setPrevScroll] = useState([1, 2, 3, 4, 5, 6,7]);
    const [page, setPage] = useState(1);
    const [allNotifications, setAllNotifications] = useState([])

    useEffect(() => {
        update()
    }, []);

    const onScroll = (e) => {
        const tar = e.target
        console.log( e.target.scrollHeight, e.target.scrollTop, e.target.clientHeight);
        if(tar.scrollHeight === tar.scrollTop + tar.clientHeight){
            if(prevScroll !== tar.scrollHeight ){
                if(page !== -1)
                {
                    update()
                }
            }
        }};


    const update = () => {
        if (page !== -1) {


            axios.get(`/restaurants/notification/all/?page=` + page, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`
                },
            }).then((resp) => {
                if(resp.status ===200) {
                    console.log(resp.data.count)
                    let data = resp.data.results
                    for (let x = 0; x < resp.data.results.length; x++) {
                        let temp = new NotificationNav(data[x].id, data[x].restaurant, data[x].title, data[x].last_modified)
                        setAllNotifications(allNotifications => [...allNotifications, temp]);
                    }
                    allNotifications.map(function (data) {
                        console.log(data.title)
                    })
                    setPage(page + 1)
                    if (resp.data.next === null) {
                        setPage(-1)
                    }
                }
            });
        }
    }

    return(
    <>
        <div className="dropdown navbar-dropdown w-100 f"  >
            <button className="btn  navbar-button-styling dropdown-toggle" type="button"
                    id="dropdownNotificationsButton" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={notificationsSVG}/>Notification
            </button>
            <div className="dropdown-menu-down-fix notification-0-padding dropdown-menu dropdown-menu-width
                scrollable dropdown-padding scrollable navbar-background"
                 aria-labelledby="dropdownNotificationsButton" onScroll={onScroll}>

                <div className="text-center fw-bold notification-title">Notifications</div>
                {allNotifications.map(data => {
                        return <NotificationMessage data={data}/>
                    })}
                {(page===-1)? <div className="text-center fw-bold notification-title">No More Notifications</div> : ""}


            </div>
        </div>








    </>)






}


export default NotificationsDropDown