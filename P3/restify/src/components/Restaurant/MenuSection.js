import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from 'bootstrap/dist/css/bootstrap.min.css';

import axios from "axios";
import { useParams } from 'react-router-dom';
import MenuItem from './MenuItem';


function MenuSection(props) {

    const { id } = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [numMenuItems, setNumMenuItems] = useState(0);
    const [nextToken, setNextToken] = useState(""); // TODO
    const [existingTypes, setTypes] = useState([]);

    useEffect(() => {
        getMenu();
    }, []);

    function getMenu() {
        let headers;
        if (localStorage.getItem('access') !== null) {
            headers = {
                'Authorization': `Bearer ${localStorage.getItem("access")}`
            }
        }

        axios.get(`/restaurants/${id}/menu/`, {headers})
        .then((response) => {
            setMenuItems(response['data']['results']);
            setNumMenuItems(response['data']['count']);
            setNextToken(response['data']['next']);
            let allTypes = response['data']['results'].map(data => {
                return data.type
            });
            let uniqueTypes = [...new Set(allTypes)];
            setTypes(uniqueTypes);
            console.log("exiswting", existingTypes);
            return;
        });

    }

    return (
        <>
            {existingTypes.map(function(object, i) {
                return <>
                    <h4 class="text-light">{object}</h4>
                    <div class="row row-cols-2 row-cols-md-2 g-2 mb-4">
                        {menuItems.filter(menuItem => menuItem['type'] == object).map((obj, i) => {
                                return <MenuItem id={obj['id']} name={obj['name']} description={obj['description']} 
                                                     price={obj['price']} is_owner={props.is_owner} refreshMenu={getMenu} />
                        })}
                    </div>
                </>
            })}
        </>
    )
}

export default MenuSection;