import React from 'react';
import './Navigation.css';
import {NavLink} from "react-router-dom";


function Navigation(){

    return (
        <nav>
        <div className="nav-container">
            <ul className="nav-list">
                <li><NavLink to="/">Home </NavLink></li>
                <li><NavLink to="/create-blog">Create blog </NavLink></li>
                <li><NavLink to="/blogs">All blogs </NavLink></li>
            </ul>


        </div>
        </nav>
    )
}

export default Navigation;