import React from 'react'
import './App.css';
import './styles/Home.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BottomMenu from './components/BottomMenu';
import NotFound from './pages/NotFound';
import { Provider } from 'react-redux';
import store from './Redux/store';
import MbHome from './pages/MbHome';
import DetailCustomer from './components/detailCustomer';
import Customers from './pages/Customers';
import Transactions from './pages/Transactions';
import Auth from './pages/Auth';


const App = () => {


  return (
    <Provider store={store} >
      <div className="App container-fluid">
          <Router>
              <div className='mainContent'>
                  <Switch>
                      <Route path='/' exact component={MbHome} />
                      <Route path='/login' component={Auth} />
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

