import React from 'react'
import '../App.css'
import { MdDashboard, MdSupervisorAccount, MdList } from "react-icons/md";
import { NavLink } from 'react-router-dom';

function BottomMenu() {
    return (
        <nav className="nav d-flex justify-content-around">
            <NavLink to='/' exact activeClassName='current' className="nav_link text-center"><MdDashboard size={25} /> <br /> <span className="nav_text"> Accueil</span> </NavLink>
            <NavLink to='/customers' exact activeClassName='current' className="nav_link text-center"><MdSupervisorAccount size={25} /> <br /> <span className="nav_text"> Clients</span></NavLink>
            <NavLink to='/transactions' exact activeClassName='current' className="nav_link text-center"><MdList size={25} /> <br /> <span className="nav_text"> Transaction</span></NavLink>
        </nav>
    )
}

export default BottomMenu
