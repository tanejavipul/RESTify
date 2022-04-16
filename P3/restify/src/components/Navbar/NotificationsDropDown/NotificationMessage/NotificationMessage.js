import {Link} from "react-router-dom";


const NotificationMessage = ({data}) => {



    return <>
        {/*<Link to={"/home/"} className={"select-profile"} style={{ textDecoration: 'none'}}>*/}
        <div id={data.id} className="alert alert-secondary alert-dismissible fade show" role="alert">
            <button className="list-group-item list-group-item-action notification-individual-button">
                <span className="notification-time">{data.time}<br/></span>
                <span className="notification-message">{data.title}</span>
            {/*    <strong>Sara</strong> */}
            </button>
        </div>
        {/*</Link>*/}
    </>



}
export default NotificationMessage