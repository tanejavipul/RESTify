import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from '@fortawesome/free-solid-svg-icons';


function MenuItem({refreshMenu, ...props}) {

    const [isOpen, setOpen] = useState(false);

    function togglePopUp(e) {
        e.preventDefault();
        setOpen(true);
    }

    function deleteMenuItem(e) {
        e.preventDefault();
        let headers;
        if (localStorage.getItem('access') !== null) {
            headers = {
                'Authorization': `Bearer ${localStorage.getItem("access")}`
            }
        }
        axios.delete(`/restaurants/${props.id}/deleteMenuItem/`, {headers})
        .then((resp) => {
            // update parent component
            refreshMenu();
            setOpen(false);
        })
    }

    return (
        <div class="col">
            <div class="card h-100">
                <div class="row g-0">
                    <div>
                        {isOpen ? 
                            <div className="popup-box">
                                <div className="nested-popup-box">
                                    <span className="close-icon" onClick={() => setOpen(false)}>x</span>
                                    <b>Are you sure you want to delete this Menu Item?</b>
                                    <br />
                                    <button onClick={(e) => deleteMenuItem(e)}>Confirm</button>
                                    <button onClick={() => setOpen(false)}>Cancel</button>
                                </div>
                            </div> :
                            <></>
                        }
                        {props.is_owner &&
                            <>
                                {/* <span class="menu-item-close" onClick={(e) => togglePopUp(e)}>Edit Item</span> */}
                                <div class="menu-item-close">
                                    <Link to={`/restaurant/editMenuItem/${props.id}/`} className="btn btn-primary btn-md" ><FontAwesomeIcon icon={faPencil} size="1x" style={{ paddingRight: '10px' }} />Edit Item</Link>
                                    <button className="btn btn-danger shadow-none">X</button> 
                                </div>
                                {/* <span class="menu-item-close" onClick={(e) => togglePopUp(e)}>X</span> */}
                            </>
                        }
                        <div class="card-body">
                            <h4 class="card-title">{props.name}</h4>
                            {/* <p class="card-text"><small class="">{props.description}</small></p> */}
                            <p>
                                <small class="">{props.description}</small>
                            </p>
                            <p class="float-end">
                                <small class="text-muted">{`$ ${props.price.toFixed(2)} CAD`}</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuItem;