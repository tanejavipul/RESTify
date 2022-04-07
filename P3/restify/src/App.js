import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from "./components/Login/Login";
import {useEffect} from "react";
import {BrowserRouter, Route, Routes, Router, Switch} from "react-router-dom";
// import {Route, Routes} from "react-router";
import * as PropTypes from "prop-types";
import Signup from "./components/Signup/Signup";
// import Profile from "./components/Profile/Profile";
// import Navbar from "./components/Navbar/Navbar";
import BlogPostPage from './components/BlogPost/BlogPostPage';


function App() {
  useEffect(() => {
    document.title = "RESTify"
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact   element={<Login />} />
        <Route path="/signup/"   element={<Signup/>} />
        <Route path="/login/"   element={<Login />} />
        {/* <Route path="/profile/" element={<Profile />} /> */}
        {/* <Route path="/nav/"     element={<Navbar />} /> */}
        <Route 
          path="/blogs/:id"
          element={<BlogPostPage />}
        /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
