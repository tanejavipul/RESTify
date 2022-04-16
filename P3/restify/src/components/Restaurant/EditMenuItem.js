import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./editRestaurantPages.css";

import axios from "axios";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faPicture } from '@fortawesome/free-regular-svg-icons';

function EditMenuItem({setMenuItems, ...props}) {

    const { id } = useParams();
    // const [name, setName] = useState("");
    // const [desc, setDesc] = useState("");
    // const [price, setPrice] = useState(0);
    // const [type, setType] = useState("");
    

    useEffect(() => {
        console.log('svaed ', props.saved);
        if (props.saved) {
            let newItem;
            console.log(props.id, props.new)
            // undefined means existing so not new
            if (typeof props.new !== 'undefined') {
                newItem = true;
            } else {
                newItem = false;
            }

            setMenuItems(props.id, document.getElementById(`item-name-${props.id}`).value, document.getElementById(`item-desc-${props.id}`).value, 
                        document.getElementById(`item-price-${props.id}`).value, document.getElementById(`item-type-${props.id}`).value, newItem);
        }
    }, [props.saved]);

    // not working
    // function removeRow(e) {
    //     e.preventDefault();
    //     setMenuItems(props.id);
    // }

    return (
        <>
            <div id={props.id} class="menu-item">
                {props.id}
                <div class="input-group mb-3">
                    <label for={`item-name-${props.id}`} class="edit-label col-3 edit-menu-label">MENU ITEM NAME:</label>
                    <input id={`item-name-${props.id}`} type="text" class="form-control col-9 edit-input-styling shadow-none" placeholder="Menu Item Name"
                        aria-label="Username" aria-describedby="basic-addon1" defaultValue={props.name} />
                         {/* onChange={(e) => setName(e.target.value)} /> */}
                </div>

                <div class="input-group mb-3">
                    <label for={`item-price-${props.id}`} class="edit-label col-3 edit-menu-label">MENU ITEM PRICE ($):</label>
                    <input id={`item-price-${props.id}`} type="number" class="form-control col-9 edit-input-styling shadow-none" placeholder="Menu Item Price"
                        aria-label="Username" aria-describedby="basic-addon1" defaultValue={props.price} />
                        {/* onChange={(e) => setPrice(e.target.value)} /> */}
                </div>

                <div class="input-group mb-3">
                    <label for={`item-desc-${props.id}`} class="edit-label col-3 edit-menu-label">MENU ITEM DESCRIPTION:</label>
                    <textarea id={`item-desc-${props.id}`} type="text" class="form-control col-9 edit-input-styling shadow-none" placeholder="Menu Item Description"
                        aria-label="Username" aria-describedby="basic-addon1" defaultValue={props.description} />
                        {/* onChange={(e) => setDesc(e.target.value)}></textarea> */}
                </div>

                <div class="input-group mb-3">
                    <label for={`item-type-${props.id}`} class="edit-label col-3 edit-menu-label">MENU ITEM TYPE:</label>
                    <input list={`item-type-list`} id={`item-type-${props.id}`} type="text" class="form-control col-9 edit-input-styling shadow-none" placeholder="Menu Item Type"
                        aria-label="Username" aria-describedby="basic-addon1" defaultValue={props.type} /> 
                        {/* onChange={(e) => setType(e.target.value)} /> */}
                    <datalist id="item-type-list">
                        <option value="Appetizers" />
                        <option value="Main Course" />
                        <option value="Sides" />
                        <option value="Specials" />
                        <option value="Desserts" />
                        <option value="Drinks" />
                    </datalist>
                </div>

            </div>

            {/* not working just going to add delete in main section i guess */}
            {/* <div class="d-flex align-items-center justify-content-end">
                <div class="edit-menu-add-row d-flex">
                    <button class="edit-menu-add-row-btn d-flex" onClick={event => removeRow(event)} >
                        <FontAwesomeIcon icon={faMinusCircle} size="3x" style={{ color: "var(--blue-main)" }} />
                        <label class="edit-label d-flex align-items-center edit-menu-add-row-label edit-menu-label">REMOVE ITEM</label>
                    </button>
                </div>
            </div> */}

            <hr class="edit-line-break" />

        </>
    )
}

export default EditMenuItem;