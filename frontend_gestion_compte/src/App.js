import React from 'react'
import './App.css';
import './styles/Home.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BottomMenu from './components/BottomMenu';
import NotFound from './pages/NotFound';
import { Provider } from 'react-redux';
import store from './Redux/store';
import MbHome from './components/MbHome';
import DetailCustomer from './components/detailCustomer';
import Customers from './components/Customers';
import Transactions from './components/Transactions';
import Login from './pages/Login';


const App = () => {


  return (
    <Provider store={store} >
      <div className="App container-fluid">
          <Router>
              <div className='bottomMenu'>
                  {/* <Sidebar /> */}
                  <BottomMenu />
              </div>
              <div className='mainContent'>
                  <Switch>
                      <Route path='/' exact component={MbHome} />
                      <Route path='/login' component={Login} />
                      <Route path='/customers/:name' component={DetailCustomer} />
                      <Route path='/customers' component={Customers} />
                      <Route path='/transactions' component={Transactions} />
                      <Route path='/mb/home' component={MbHome} />
                      <Route path='*' component={NotFound} />
                  </Switch>
              </div>
          </Router>
      </div>
    </Provider>
  )
}

export default App;

