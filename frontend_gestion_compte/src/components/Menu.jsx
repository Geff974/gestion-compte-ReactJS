import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdSupervisorAccount, MdList } from "react-icons/md";
import '../styles/Menu.css';

const Menu = () => {

    const hambBtn = useRef(null);
    const [open, setOpen] = useState(false)

    const showMenu = () => {
        if (open) {
            hambBtn.current.className = '';
        } else {
            hambBtn.current.className = 'open';
        }
        console.log(open);
        setOpen(!open);
    }

    return (
        <div onClick={showMenu} className='' ref={hambBtn}>
            <div className="hamburgerBtn"></div>
            <ul className="menu">
                <li> <NavLink to='/mb/home' activeClassName='active' className='nav-link'> <MdDashboard size={20} /> <br /> <span className="nav_text">Accueil</span> </NavLink> </li>
                <li> <NavLink to='/customers' exact activeClassName='active' className="nav-link"><MdSupervisorAccount size={20} /> <br /> <span className="nav_text"> Clients</span></NavLink> </li>
                <li> <NavLink to='/transactions' exact activeClassName='active' className="nav-link"><MdList size={20} /> <br /> <span className="nav_text"> Transaction</span></NavLink> </li>
            </ul>
        </div>
    );
};

export default Menu;