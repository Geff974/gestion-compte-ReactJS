import React, { Component } from 'react'
import '../App.css';
import '../styles/Home.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Customers from './Customers';
import Transactions from './Transactions';
import DetailCustomer from './detailCustomer';
import BottomMenu from './BottomMenu';

export class CustomersService extends Component {

    constructor(props) {
        let _isMounted = false;
        super(props)

        this.state = {
            customers: []
        }
        this.updateCustomers = this.updateCustomers.bind(this);
    }

    updateCustomers = () => {
        fetch(process.env.REACT_APP_API_URL + '/customers').then((response) => {
            return response.json();
        }).then((response) => {
            this.setState({ customers: response });
        })
    }

    changeCustomers = () => {
        console.log('entrer dans changeCustomer')
        const customers2 = [
            {
                credit: 100,
                debit: 100,
                email: 'new@email.com',
                id: 100,
                name: 'Premier Client'
            },
            {
                credit: 100,
                debit: 100,
                email: 'new2@email.com',
                id: 100,
                name: 'Deuxieme Client'
            }
        ]
        this.setState({
            customers: customers2
        })
    }


    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + '/customers').then((response) => {
            return response.json();
        }).then((response) => {
            this.setState({ customers: response })
        })
        this._isMounted=true;
    }

    componentWillUnmount() {
        this._isMounted=false;
    }


    render() {
        return (
            <div className="App container-fluid">
                <Router>
                    <div className='bottomMenu'>
                        {/* <Sidebar /> */}
                        <BottomMenu />
                    </div>
                    <div className='mainContent'>
                        <Switch>
                            <Route path='/' exact component={() => <Home customers={this.state.customers} />} />
                            <Route path='/customers/:name' component={DetailCustomer} />
                            <Route path='/customers' component={() => <Customers customers={this.state.customers} updateCustomers={this.updateCustomers} />} />
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

