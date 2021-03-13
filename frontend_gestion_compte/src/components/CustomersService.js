import React, { Component } from 'react'
import '../App.css';
import '../styles/Home.css';
import '../styles/Sidebar.css'
import Home from './Home';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Customers from './Customers';
import Transactions from './Transactions';
import DetailCustomer from './detailCustomer';

export class CustomersService extends Component {

    constructor(props) {
        super(props)

        this.state = {
            customers: []
        }
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + '/customers').then((response) => {
            return response.json();
        }).then((response) => {
            this.setState({ customers: response });
        })
    }


    render() {
        return (
            <div className="App container-fluid">
                <Router>
                    <div className='Sidebar'>
                        <Sidebar />
                    </div>
                    <div className='mainContent'>
                        <Switch>
                            <Route path='/' exact component={() => <Home customers={this.state.customers} />} />
                            <Route path='/customers/:name' component={DetailCustomer} />
                            <Route path='/customers' component={() => <Customers setCustomers={this.setState.bind(this)} />} />
                            <Route path='/transactions' component={Transactions} />
                            <Route path='*' component={NotFound} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default CustomersService

