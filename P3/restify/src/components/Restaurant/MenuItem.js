import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

// import "./menu.css";

function MenuItem(props) {

    const [isOpen, setOpen] = useState(false);

    function togglePopUp(e) {
        e.preventDefault();
        setOpen(true);
    }

    function deleteMenuItem(e) {
        e.preventDefault();

    }

    return (
        <div class="col">
            <div class="card h-100">
                <div class="row g-0">
                    {/* <div class="col-md-3">
                        <img src={`/Media/${props.menu_item_pic}`} class="img-fluid rounded-start menu-item-image" alt="..." />
                    </div> */}
                    <div>
                        {isOpen ? 
                            <div className="popup-box">
                                <div className="nested-popup-box">
                                    <span className="close-icon" onClick={() => setOpen(false)}>x</span>
                                    <b>Are you sure you want to delete this Blog Post?</b>
                                    <br />
                                    <button onClick={(e) => deleteMenuItem(e)}>Confirm</button>
                                    <button onClick={() => setOpen(false)}>Cancel</button>
                                </div>
                            </div> :
                            <></>
                        }
                        {/* {restaurantOwner ? 
                            <span class="menu-item-close" onClick={(e) => togglePopUp(e)}>X</span> :
                            <></>
                        } */}
                        
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