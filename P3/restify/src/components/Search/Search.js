import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from "axios";


import "./search.css";
// TODO: Check if user is logged in?


function Search(props) {
    return (
        <>
            <div className="search-intro">
                <div className="search-tone-down-bg">
                    <div className="search-jumbotron text-center">
                        <h1 className="mb-4 title-style">Look for Restaurants</h1>
                        <form target="_blank">
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-4">
                                    <div className="input-group">
                                        <input type="search" className="form-control" placeholder="Restaurant name, food, address..." aria-label="Search"
                                            aria-describedby="search-addon" />
                                        <button type="submit" className="btn btn-primary"
                                            style={{ borderTopLeftRadius: "0%", borderBottomLeftRadius: "0%" }}
                                            onclick="window.location.href='searchResults.html';">search</button>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search;