import {useEffect, useState} from "react";
import axios from "axios";
import notificationsSVG from "../../assets/Icons/restaurant_notification.svg"
import {noNotifications, NotificationNav} from '../NotiticationHelper';
import OwnerMessage from "./OwnerMessage/OwnerMessage";

const OwnerDropDown = () => {
    const [allNotifications, setAllNotifications] = useState([])
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1);

    useEffect(() => {
        update()
    }, );

    const onScroll = (e) => {
        const tar = e.target
        console.log( e.target.scrollHeight, e.target.scrollTop, e.target.clientHeight);
        if(tar.scrollHeight === tar.scrollTop + tar.clientHeight){
                if(page !== -1)
                {
                    update()
                }
        }};


    const update = () => {
        if (page !== -1) {


            axios.get(`/restaurants/owner/update/all/?page=` + page, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`
                },
            }).then((resp) => {
                if(resp.status ===200) {
                    setCount(resp.data.count)
                    console.log(count)
                    let data = resp.data.results
                    for (let x = 0; x < resp.data.results.length; x++) {
                        let temp = new NotificationNav(data[x].id, data[x].restaurant, data[x].title, data[x].last_modified, data[x].type, data[x].type_id)
                        setAllNotifications(allNotifications => [...allNotifications, temp]);
                    }
                    setPage(page + 1)
                    if (resp.data.next === null) {
                        setPage(-1)
                    }
                }
            }).catch((e) => {
                console.log(e.response)
            });
        }
    }



    return(
    <>
        <div className="dropdown navbar-dropdown w-100 f"  >
            <button className="btn  navbar-button-styling dropdown-toggle" type="button"
                    id="dropdownNotificationsButton" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={notificationsSVG} alt=" "/>Owner
            </button>

            {(count !== 0) ?
                <div className="dropdown-menu-down-fix notification-0-padding dropdown-menu dropdown-menu-width
                scrollable dropdown-padding scrollable navbar-background"
                     aria-labelledby="dropdownNotificationsButton" onScroll={onScroll}>

                    <div className="text-center fw-bold notification-title">Notifications</div>
                    {allNotifications.map(data => {
                        return <OwnerMessage data={data}/>
                    })}
                    {(page === -1) ?
                        <div className="text-center fw-bold notification-title">No More Notifications</div> : ""}
                </div>
                : noNotifications}
        </div>
    </>)
}


export default OwnerDropDown