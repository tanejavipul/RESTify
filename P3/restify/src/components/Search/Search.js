import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "./search.css";
// TODO: pagination
//TODO maybe edit api to return description or something else other than address info
//edit api to return id for link


function Search(props) {
    const [page, setPage] = useState(1);
    const [currSearchValue, setCurrSearchValue] = useState(""); //changes as user types into search field
    const [searchValue, setSearchValue] = useState(""); //search value only set when user clicks "Search"
    const [results, setResults] = useState([]);

    useEffect(() => {
        // if (searchValue == '') 
        //     setResults([]);
        setResults([]);
        setPage(1);
        getSearchResults(1);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);


    useEffect(() => {
        // const scrolling_function = () => {
        //     if((window.innerHeight + window.scrollY) >= document.body.offsetHeight + 300){
        //         // console.log("bottom");
        //         getSearchResults(page);
        //         window.removeEventListener('scroll',scrolling_function)
        //     }
        // }

        //window.addEventListener('scroll', scrolling_function);
        const scrollPage = (e) => {
            if(document.documentElement.scrollHeight === window.innerHeight + document.documentElement.scrollTop) {
                // console.log('scrolled to the bottom');
                getSearchResults(page);
            }
        };

        document.getElementsByTagName('body')[0].onscroll = (e) => scrollPage(e);

        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [page])

    
    const getSearchResults = (page_num) => {
        console.log(page_num);
        console.log("search value is", searchValue);
        if (page_num !== -1 && searchValue !== '') {
            let headers;
            if (localStorage.getItem('access') !== null) {
                headers = {
                    'Authorization': `Bearer ${localStorage.getItem("access")}`
                }
            }
            axios.get('/restaurants/search/?page=' + page_num + '&search=' + searchValue, headers)
                .then((resp) => {
                    if (resp.status === 200) {
                        // setCount(resp.data.count)
                        console.log(resp);
                        let data = resp.data.results;
                        for (let x = 0; x < resp.data.results.length; x++) {
                            let temp = data[x];
                            setResults(allResults => [...allResults, temp]);
                        }
                        
                        
                        if (!resp.data.next) {
                            setPage(-1);
                        } else {
                            setPage(page + 1);
                        }
                    }
                });
        }
    }

    return (
        <>
            <Navbar />
            <div className="search-intro">
                <div className="search-tone-down-bg" >
                    <div className="search-jumbotron text-center">
                        <h1 className="mb-4 title-style">Look for Restaurants</h1>
                        <form onSubmit={e => e.preventDefault()}>
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-4">
                                    <div className="input-group">
                                        <input type="search" className="form-control" placeholder="Restaurant name, food, address..." aria-label="Search"
                                            aria-describedby="search-addon" onChange={e => setCurrSearchValue(e.target.value)} />
                                        <button type="submit" onClick={() => setSearchValue(currSearchValue)} className="btn btn-primary"
                                            style={{ borderTopLeftRadius: "0%", borderBottomLeftRadius: "0%" }}
                                        >search</button>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>

                    <div className="container" >
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {results.map(function (object, i) {
                                return <div className="col" key={object['id']}>
                                    <div className="card card-hov border-0 text-white bg-dark">
                                        <img className="card-img-top" style={{ objectFit: 'cover', height: '250px' }} src={object['logo']}
                                            alt="" />
                                        <div className="card-body">
                                            <h5 className="card-title title-style">{object['name']}</h5>
                                            <p className="card-text text-truncate">{object['address']} , {object['postal']}
                                            </p>
                                            <Link to={`/restaurant/${object['id']}`} className="btn btn-primary" > Visit Restaurant </Link>
                                        </div>
                                    </div>
                                </div>
                            })}
                            {results.length === 0 && searchValue !== '' &&
                                <h2>No restauarants found</h2>
                            }
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Search;