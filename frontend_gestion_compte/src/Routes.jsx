import React, { useContext } from 'react';
import UserContext from './context/UserContext';
import { Redirect, Route, Switch } from 'react-router-dom';

import MbHome from './pages/MbHome';
import Auth from './pages/Auth';
import Account from './pages/Account';
import DetailCustomer from './components/DetailCustomer';
import Customers from './pages/Customers';
import Transactions from './pages/Transactions';
import CustomerInfo from './components/CustomerInfo';
import NotFound from './pages/NotFound';

export const Routes = () => {
    const userContext = useContext(UserContext);

    return (
        <Switch>
            <ProtectedRoute path='/' auth={userContext.auth} exact component={MbHome} />
            <ProtectedLogin path='/login' auth={userContext.auth} component={Auth} />
            <ProtectedRoute path='/account' auth={userContext.auth} component={Account} />
            <ProtectedRoute path='/customers/:name' auth={userContext.auth} component={DetailCustomer} />
            <ProtectedRoute path='/customers' auth={userContext.auth} component={Customers} />
            <ProtectedRoute path='/transactions' auth={userContext.auth} component={Transactions} />
            <ProtectedRoute path='/mb/home' auth={userContext.auth} component={MbHome} />
            <ProtectedRoute path='/test' auth={userContext.auth} component={CustomerInfo} />
            <ProtectedRoute path='*' auth={userContext.auth} component={NotFound} />
        </Switch>
    )

}

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={() => auth ? (
                <Component />
            ) :
                (
                    <Redirect to="/login" />
                )
            }
        />
    )
}

const ProtectedLogin = ({ auth, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={() => !auth ? (
                <Component />
            ) :
                (
                    <Redirect to="/" />
                )
            }
        />
    )
}