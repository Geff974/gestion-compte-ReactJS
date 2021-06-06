import React, { useRef, useState } from 'react'
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { userUnAuth } from './Redux/User/actionUser';
import { transactionReinit } from './Redux/Transaction/actionTransaction';
import { customerReinit } from './Redux/Customer/actionCustomer';

import { MdDashboard, MdSupervisorAccount, MdList } from "react-icons/md";
import './App.css';
import { Routes } from './Routes';
import UserContext from './context/UserContext';


const App = () => {

  const navMenu = useRef(null);
  const mainContent = useRef(null);
  const [open, setOpen] = useState(false);

  const showMenu = () => {
    if (open) {
      navMenu.current.className = 'menu';
      mainContent.current.className = 'main-content';
    } else {
      navMenu.current.className = 'menu open-mode';
      mainContent.current.className = 'main-content open-mode';
    }
    setOpen(!open);
  }

  // const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();
  const unAuth = () => {
    showMenu();
    dispatch(userUnAuth());
    dispatch(transactionReinit());
    dispatch(customerReinit());
  }

  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState({
    id: 0,
    username: '',
    email: ''
  });
  const userContext = {
    auth,
    setAuth,
    user,
    setUser
  }

  return (
    <div className="App container-fluid">
      <Router>
        <div ref={navMenu}>
          <div onClick={showMenu} className="hamburgerBtn"></div>
          <ul className="menu-list">
            <li> <NavLink to='/mb/home' onClick={showMenu} activeClassName='active' className='nav-link'> <MdDashboard size={20} /> <span className="nav_text">Accueil</span> </NavLink> </li>
            <li> <NavLink to='/customers' onClick={showMenu} exact activeClassName='active' className="nav-link"><MdSupervisorAccount size={20} /> <span className="nav_text"> Clients</span></NavLink> </li>
            <li> <NavLink to='/transactions' onClick={showMenu} exact activeClassName='active' className="nav-link"><MdList size={20} /> <span className="nav_text"> Transaction</span></NavLink> </li>
            {userContext.auth &&
              <div>
                <li> <NavLink to='/account' onClick={showMenu} className='nav-link'> <MdDashboard size={20} /> <span className="nav_text">Mon compte</span> </NavLink> </li>
                <li> <NavLink to='/login' onClick={unAuth} className='nav-link'> <MdDashboard size={20} /> <span className="nav_text">Deconnexion</span> </NavLink> </li>
              </div>
            }
          </ul>
        </div>

        <div className='main-content' ref={mainContent}>

          <UserContext.Provider value={userContext}>
            <Routes />
          </UserContext.Provider>

        </div>
      </Router>
    </div>
  )
}

export default App;

