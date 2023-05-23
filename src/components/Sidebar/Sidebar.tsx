import React from 'react';
import {Link, Route} from 'react-router-dom';
import './sidebar.module.css'
export const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Sidebar</h2>
            <ul>
                <li><Link to="/shelf">Shelf</Link></li>
                <li><Link to="/create-product">Create Product</Link></li>
            </ul>
        </div>
    );
};
