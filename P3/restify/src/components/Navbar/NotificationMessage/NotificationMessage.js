

const NotificationMessage = (output) => {




    return <>
        <div className="alert alert-secondary alert-dismissible fade show" role="alert">
            <button className="list-group-item list-group-item-action notification-individual-button">
                <span className="notification-time">Jan 20, 2021, 1:15PM<br/></span>
                <span className="notification-message"><strong>Sara</strong> has just followed your restaurant!</span>
            </button>
        </div>
    </>



}
export default NotificationMessage