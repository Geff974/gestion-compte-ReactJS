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
import MbHome from './MbHome';


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
                            <Route path='/transactions' component={() => <Transactions updateCustomers={this.updateCustomers} />} />
                            <Route path='/mb/home' component={() => <MbHome customers={this.state.customers} />} />
                            <Route path='*' component={NotFound} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default CustomersService

