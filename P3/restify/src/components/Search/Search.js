import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import axios from "axios";

import "./search.css";
// TODO: pagination
//TODO maybe edit api to return description or something else other than address info
//edit api to return id for link


function Search(props) {
    const [searchValue, setSearchValue] = useState("");
    const [results, setResults] = useState([]);

    function getSearchResults() {
        let headers;
        if (localStorage.getItem('access') !== null) {
            headers = {
                'Authorization': `Bearer ${localStorage.getItem("access")}`
            }
        }

        axios.get('/restaurants/search/?search=' + searchValue, { headers })
            .then((response) => {
                console.log(response);
                setResults(response['data']['results']);
                return;
            });
    }


    return (
        <>
            <div className="search-intro">
                <div className="search-tone-down-bg">
                    <div className="search-jumbotron text-center">
                        <h1 className="mb-4 title-style">Look for Restaurants</h1>
                        <form onSubmit={e => e.preventDefault()}>
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-4">
                                    <div className="input-group">
                                        <input type="search" className="form-control" placeholder="Restaurant name, food, address..." aria-label="Search"
                                            aria-describedby="search-addon" onChange={e => setSearchValue(e.target.value)} />
                                        <button type="submit" onClick={() => getSearchResults()} className="btn btn-primary"
                                            style={{ borderTopLeftRadius: "0%", borderBottomLeftRadius: "0%" }}
                                        >search</button>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>

                    <div class="container">
                        <div class="row row-cols-1 row-cols-md-3 g-4">
                            {results.map(function (object, i) {
                                return <div class="col">
                                    <div class="card border-0 text-white bg-dark">
                                        <img class="card-img-top" style={{ objectFit: 'cover', height: '250px' }} src={object['logo']}
                                            alt="Card image cap" />
                                        <div class="card-body">
                                            <h5 class="card-title title-style">{object['name']}</h5>
                                            <p class="card-text text-truncate">{object['address']}
                                            </p>
                                            <Link to={`/restaurant/${object['id']}`} className="btn btn-primary" > Visit Restaurant </Link>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Search;