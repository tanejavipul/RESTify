import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./editRestaurantPages.css";

import axios from "axios";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

import EditMenuItem from './EditMenuItem';
import Navbar from "../Navbar/Navbar";

function EditMenu(props) {

    const { id } = useParams();
    const [menuItem, setMenuItem] = useState({"is_owner":"", "name": "", "description": "", "price": 0, "type": "" });
    const [clicked, setClicked] = useState(false);
    const [restID, setRestID] = useState(-1);
    
    useEffect(() => {
        getRest();
        getMenuItem();
    }, []);

    const getRest = () => {
        axios.get(`/restaurants/id/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`
            },
        }).then((resp) => {
            if (resp.status === 200) {
                setRestID(resp.data.id)
            }
        }).catch(e => {
            // don't think this should ever happen cuz navbar works first
            console.log(e.response.status)
            // if(e.response.status === 404) {
            //     setRestID(-1)
            // }
            // if(e.response.status === 401) {
            //     deleteLogin()
            //     setNav(-1)
            // }
        });
    }

    function updateMenuItems(local_id, name, desc, price, type, newItem) {
        // console.log("tmenuITEMS: ", menuItems);

        // let tempItems = menuItem.filter((item) => item.id !== id );
        // console.log("tempITEMS: ", tempItems);

        const formData = new FormData();
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        formData.append('name', name);
        formData.append('description', desc);
        formData.append('price', parseFloat(price));
        formData.append('type', type);
        // console.log(Array.from(formData));
        // console.log(Object.fromEntries(formData));
        
        // new menu item
        if(newItem) {
            axios.post(`/restaurants/addMenuItem/`, formData, {headers})
            .then((resp) => {
                // console.log('resp id', resp.data['id']);
                // tempItems.push({"id": resp.data['id'], "name": name, "description": desc, "price": parseInt(price), "type": type, "new" : true});
                // console.log(tempItems);
                window.location.replace(`/restaurant/${restID}/`);
                // setMenuItems(tempItems);
            })
            .catch((err) => {
                //TODO ERROR CHECKING
                console.log(err.response);
                if (err.response.status === 400) {
                    // tempItem.push({"errors": err.response.data, "id": id, "name": name, "description": desc, "price": parseInt(price), "type": type, "new" : true});
                    setMenuItem({"errors": err.response.data, "id": local_id, "name": name, "description": desc, "price": parseInt(price), "type": type, "new" : true});
                }
            })
        } else {
            // existing ID
            axios.put(`/restaurants/${id}/editMenuItem/`, formData, {headers})
            .then((resp) => {
                // console.log('resp bro', resp);
                // tempItems.push({"id": id, "name": resp.data['name'], "description": resp.data['description'], "price": parseInt(resp.data['price']), "type": resp.data['type']});
                // console.log(tempItems);
                // setMenuItems(tempItems);
                // can't replace window cuz individually don't know when it's done
                console.log(resp);
                window.location.replace(`/restaurant/${restID}/`);
            })
            .catch((err) => {
                //TODO ERROR CHECKING
                console.log(err.response);
                if (err.response.status === 400) {
                    // tempItem.push({"errors": err.response.data, "id": id, "name": name, "description": desc, "price": parseInt(price), "type": type});
                    setMenuItem({"errors": err.response.data, "id": local_id, "name": name, "description": desc, "price": parseInt(price), "type": type});
                    // window.location.replace(`/restaurant/${id}/menu/`);
                }
            })
        }
        // setClicked(false);
        // prevent spam i guess
        let btn = document.getElementById("submit-changes");
        btn.disabled = true;
        setTimeout(() => {
            btn.disabled = false;
            console.log('button undisabled');
            setClicked(false);
        }, 3000);
    }
    
    function updateMenu(e) {
        e.preventDefault();
        setClicked(true);
    }

    function getMenuItem() {
        if (typeof id !== "undefined") {

            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }

            axios.get(`/restaurants/${id}/editMenuItem/`, { headers })
            .then((response) => {
                if (response.status === 404 || !response['data']['is_owner']) {
                    window.location.replace(`/home/`);
                } else {
                    setMenuItem(response['data']);
                    console.log('dataadweaw', response['data']);
                }
            });
        } else {
            setMenuItem( prevState => ({
                ...prevState,
                "new": true, 
            }));
        }
    }

    return (
        <>
            <Navbar />
            <div id="edit-menu-intro">
                <div class="mask d-flex align-items-center h-100 tone-down-bg">
                    <div class="container">
                        <form class="edit-menu-row" style={{backgroundColor: '#FFFFFF'}}>
                            <h2 class="d-flex justify-content-center edit-menu-h2">Add / Edit Menu</h2>

                            <EditMenuItem errors={menuItem['errors']} id={menuItem['id']} name={menuItem['name']} description={menuItem['description']} 
                                        price={menuItem['price']} type={menuItem['type']} 
                                        setMenuItem={updateMenuItems} saved={clicked} new={menuItem['new']} />
                            
                            <div class="d-flex justify-content-between">
                                <a href={`/restaurant/${restID}/`} value="GO BACK" class="edit-save-btn btn shadow-none">GO BACK</a>

                                <input id="submit-changes" type="submit" onClick={(e) => updateMenu(e)} value="SAVE CHANGES" class="edit-save-btn btn shadow-none" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditMenu;