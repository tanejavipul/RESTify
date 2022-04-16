import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./editRestaurantPages.css";

import axios from "axios";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

import EditMenuItem from './EditMenuItem';

function EditMenu(props) {

    const { id } = useParams();
    const [numMenuItems, setNumMenuItems] = useState(0);
    const [nextToken, setNextToken] = useState(""); // TODO
    const [menuItems, setMenuItems] = useState([]);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        getMenuItems();
    }, []);

    // not working
    // function updateMenuItems(menu_item_num) {
    //     console.log(menu_item_num);
    //     console.log(menuItems);
    //     const newList = menuItems.filter((item) => item.id !== menu_item_num );
    //     console.log(newList);
    //     setMenuItems(newList);
    // }

    async function updateMenuItems(id, name, desc, price, type, newItem) {
        let tempItems = menuItems.filter((item) => item.id !== id );
        // console.log(id, name, type, desc, price, newItem);
        console.log(id, newItem);
        if (newItem) {
            tempItems.push({"name": name, "description": desc, "price": parseInt(price), "type": type, "new" : true});
        } else {
            tempItems.push({"id": id, "name": name, "description": desc, "price": parseInt(price), "type": type});
        }
        console.log("tempITEMS: ", tempItems);
        for(let i=0; i < tempItems.length; i++) {
            const formData = new FormData();
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
            formData.append('name', tempItems[i]['name']);
            formData.append('description', tempItems[i]['description']);
            formData.append('price', tempItems[i]['price']);
            formData.append('type', tempItems[i]['type']);
            // console.log(Array.from(formData));
            // console.log(Object.fromEntries(formData));
            
            // new menu item
            console.log(tempItems[i]);
            if('new' in tempItems[i]) {
                console.log('insid');
                axios.post(`/restaurants/addMenuItem/`, formData, {headers})
                .then((resp) => {
                    //ERROR CHECKING
                    console.log(resp);
                    // window.location.replace(`/restaurant/${id}/menu/`);
                })
            } else {
                // existing ID
                console.log(tempItems[i]);
                axios.put(`/restaurants/${tempItems[i]['id']}/editMenuItem/`, formData, {headers})
                .then((resp) => {
                    console.log(resp);
                    // window.location.replace(`/restaurant/${id}/menu/`);
                })
            }
        }
        setMenuItems(tempItems);
        setClicked(false);
    }
    
    function updateMenu(e) {
        e.preventDefault();
        setClicked(true);
    }

    function addRow(e) {
        e.preventDefault();
        setMenuItems([...menuItems, {"id": uuidv4(), "name": "", "description": "", "price": 0, "type": "", "new": true}]); 
    }

    async function getMenuItems() {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        let response = await axios.get(`/restaurants/${id}/menu/`, {headers});
        setMenuItems(response['data']['results']);
        setNumMenuItems(response['data']['count']);
        console.log(menuItems);
    }

    return (
        <div id="edit-menu-intro">
            <div class="mask d-flex align-items-center h-100 tone-down-bg">
                <div class="container">
                    <form class="edit-menu-row" style={{backgroundColor: '#FFFFFF'}}>
                        <h2 class="d-flex justify-content-center edit-menu-h2">Add / Edit Menu</h2>

                        { menuItems.map(function(object, i) {
                            return <EditMenuItem id={object['id']} name={object['name']} description={object['description']} 
                                                 price={object['price']} type={object['type']} 
                                                 setMenuItems={updateMenuItems} saved={clicked} new={object['new']} />
                        })}
                                                
                        <div class="d-flex align-items-center justify-content-end">

                            <div class="edit-menu-add-row d-flex">

                                <button class="edit-menu-add-row-btn d-flex" onClick={event => addRow(event)}>
                                    <FontAwesomeIcon icon={faPlusCircle} size="3x" style={{ color: "var(--blue-main)" }} />
                                    <label class="d-flex align-items-center edit-menu-add-row-label edit-menu-label edit-label">ADD ANOTHER ITEM</label>
                                </button>


                            </div>
                        </div>                    
                        
                        <div class="d-flex justify-content-between">
                            <a href={`/restaurants/${id}/menu/`} value="GO BACK" class="edit-save-btn btn shadow-none">GO BACK</a>

                            <input type="submit" onClick={(e) => updateMenu(e)} value="SAVE CHANGES" class="edit-save-btn btn shadow-none" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditMenu;