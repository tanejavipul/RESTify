import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


function EditMenuItem({setMenuItems, ...props}) {

    useEffect(() => {
        console.log('svaed ', props.saved);
        if (props.saved) {
            let newItem;
            // undefined means existing so not new
            if (typeof props.new !== 'undefined') {
                newItem = true;
            } else {
                newItem = false;
            }

            console.log(props.id, newItem);
            setMenuItems(props.id, document.getElementById(`item-name-${props.id}`).value, document.getElementById(`item-desc-${props.id}`).value, 
                        document.getElementById(`item-price-${props.id}`).value, document.getElementById(`item-type-${props.id}`).value, newItem);
        }
    }, [props.saved]);

    // function changePopUp(e) {
    //     e.preventDefault();
    //     setTimeout(() => {setPopUp(false)}, 2000);
    // }

    return (
        <>
            <div class="menu-item">
                {/* {isOpen ? 
                    <div id={'temp'} className="popup-box">
                        <div className="nested-popup-box">
                            <span className="close-icon" onClick={(e) => setOpen(false)}></span>
                            <b>Successfully updated</b>
                        </div>
                    </div> :
                    <></>
                } */}
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

            <hr class="edit-line-break" />

        </>
    )
}

export default EditMenuItem;