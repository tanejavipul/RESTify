import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from "./components/Login/Login";
import {useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import * as PropTypes from "prop-types";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";



function App() {
  useEffect(() => {
    document.title = "RESTify"
  }, []);

  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" exact   element={<Login />} />
          <Route path="/signup"   element={<Signup/>} />
          <Route path="/login/"   element={<Login />} />
          <Route path="/profile/" element={<Profile />} />
        </Routes>
      </BrowserRouter>



    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
