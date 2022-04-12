import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min'

import {useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
// import {Route, Routes} from "react-router";

// Vipul
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";

import BlogPostPage from './components/BlogPost/BlogPostPage';
import Home from './components/BlogPost/Home';
import RestaurantAdd from './components/Restaurant/RestaurantAdd';
import RestaurantEdit from './components/Restaurant/RestaurantEdit';
import Restaurant from './components/Restaurant/Restaurant';
import Search from './components/Search/Search';

import CommentSection from './components/Restaurant/CommentSection';


function App() {

  useEffect(() => {
    document.title = "RESTify"
  }, []);

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" exact   element={<Login />} />
          <Route path="/signup"   element={<Signup/>} />
          <Route path="/login-success/"   element={<Login signup={true}/>} />
          <Route path="/home/"    element={<Home />} />

          <Route path="/profile/" element={<Profile />} />
          <Route path="/nav/"     element={<Navbar />} />
          <Route path="/blogs/:id"  element={<BlogPostPage />} />
          <Route path="/restaurant/add/" element={<RestaurantAdd />} />
          <Route path="/restaurant/edit/" element={<RestaurantEdit />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/search" element={<Search />} />
          <Route path="/:id/comments/" element={<CommentSection />} />
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
