import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

// import "./menu.css";

import axios from "axios";
import { useParams } from 'react-router-dom';


function MenuItem(props) {
    return (
        <div class="col">
            <div class="card h-100">
                <div class="row g-0">
                    <div class="col-md-3">
                        {/* Maybe take this out */}
                        <img src={`/Media/${props.menu_item_pic}`} class="img-fluid rounded-start menu-item-image" alt="..." />
                    </div>
                    <div class="col-md-9">
                        <div class="card-body">
                            <h6 class="card-title">{props.item_name}</h6>
                                <p class="card-text"><small class="">{props.item_desc}</small></p>
                                <p class="card-text float-end"><small class="text-muted">{props.price}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuItem;