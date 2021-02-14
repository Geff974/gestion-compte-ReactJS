import './App.css';
import './styles/Home.css';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './pages/NotFound';
import DefineParamsForCustomer from './components/DefineParamsForCustomer';
import Customers from './components/Customers';

function App() {

  return (
    <div className="App container-fluid">
      <Router>
        <div className='Sidebar'>
          <Sidebar />
        </div>
        <div className='mainContent'>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/customers/:id' component={DefineParamsForCustomer} />
            <Route path='/customers' component={Customers} />
            <Route path='*' component={NotFound} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
