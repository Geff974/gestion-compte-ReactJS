import './App.css';
import './styles/Home.css';
import './styles/Sidebar.css'
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './pages/NotFound';
import DefineParamsForCustomer from './components/DefineParamsForCustomer';
import Customers from './components/Customers';
import Transactions from './components/Transactions';

function App() {

  let customers;
  
  const fetchCustomers = () => {
    fetch(process.env.REACT_APP_API_URL + '/customers').then((response) => {
      return response.json();
    }).then((response) => {
      customers = response;
    })
  }

  fetchCustomers();

  return (
    <div className="App container-fluid">
      <Router>
        <div className='Sidebar'>
          <Sidebar />
        </div>
        <div className='mainContent'>
          <Switch>
            <Route path='/' exact component={() => <Home customers={customers} />} />
            <Route path='/customers/:name' component={DefineParamsForCustomer} />
            <Route path='/customers' component={Customers} />
            <Route path='/transactions' component={Transactions} />
            <Route path='*' component={NotFound} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
