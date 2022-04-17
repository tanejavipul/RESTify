export class NotificationNav  {
    constructor(id, restaurant, title, time, type, type_id) {
        this.id = id;
        this.restaurant = restaurant;
        this.title = title;
        this.time = time;
        this.type = type;
        this.type_id = type_id
    }
}


export const noNotifications = <>
    <div className="dropdown-menu-down-fix notification-0-padding dropdown-menu dropdown-padding scrollable
            navbar-background dropdown-menu-min-width" aria-labelledby="dropdownNotificationsButton">
        <div className="text-center fw-bold notification-title">No Notifications</div>
    </div>
</>



const BLOG = 'BLOG'
const MENU = 'MENU'

const FOLLOW = 'FOLLOW'
const LIKE_REST = 'LIKE_REST'
const LIKE_BLOG = 'LIKE_BLOG'
const COMMENT = 'COMMENT'

export const linkURLCompiler = (type, type_id, restaurant) =>{
    //RESTAURANT

    // EVERY BLOG HAS THERE OWN PAGE
    if(type===BLOG){
        return "/blogs/" + type_id

    }
    else if(type===MENU){
        return "/restaurant/" + restaurant
    }

    //OWNER
    else if(type===FOLLOW){
        return "/restaurant/" + restaurant
    }
    else if(type===LIKE_REST){
        return "/restaurant/" + restaurant
    }
    else if(type===LIKE_BLOG){
        return "/blogs/" + type_id
    }
    else if(type===COMMENT){
        return "/" + restaurant +"/comments/"
    }
    else{
        return "/restaurant/" + restaurant

    }
}
