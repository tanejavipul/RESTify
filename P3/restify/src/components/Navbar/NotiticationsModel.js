export class NotificationNav  {
    constructor(id, restaurant, title, time) {
        this.id = id;
        this.restaurant = restaurant;
        this.title = title;
        this.time = time;
    }
}


export const noNotifications = <>
    <div className="dropdown-menu-down-fix notification-0-padding dropdown-menu dropdown-padding scrollable
            navbar-background dropdown-menu-min-width" aria-labelledby="dropdownNotificationsButton">
        <div className="text-center fw-bold notification-title">No Notifications</div>
    </div>
</>
