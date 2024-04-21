import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/navbar.css';
import image1 from "./1.jpeg";

const Navbar = ({ user_id }) => {
  return (
    <nav className="navbar">
        
      <div className="navbar-item">
        <NavLink exact to={`/home/${user_id}`} activeClassName="active">
          Home
        </NavLink>
      </div>
      <div className="navbar-item">
        <NavLink to={`/home/LikedSong/${user_id}`} activeClassName="active">
          Liked Songs
        </NavLink>
      </div>
      <div className="navbar-item">
        <NavLink to={`/home/playlist/${user_id}`} activeClassName="active">
          Playlist
        </NavLink>
      </div>
      <div className="navbar-item">
        <NavLink to={`/home/recommendation/${user_id}`} activeClassName="active">
          Recommendation
        </NavLink>
      </div>
      
      <div className="title-nav">
        <img src={image1} className="image-nav" alt="image1"></img>
        <h1 className="title-heading-nav">JAZZ</h1>
      </div>
    </nav>
  );
};

export default Navbar;
