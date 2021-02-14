import React from "react";
import "../styles/Sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return <div className="Sidebar">
        <NavLink to='/' exact activeClassName='current' className="nav">Accueil</NavLink>
        <NavLink to='/contact' exact activeClassName='current' className="nav">Contact</NavLink>
        <NavLink to='/customers' exact activeClassName='current' className="nav">Clients</NavLink>
        <NavLink to='transactions' exact activeClassName='current' className="nav">Transaction</NavLink>
    </div>
}

export default Sidebar;