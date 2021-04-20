import { createStore, combineReducers } from 'redux';
import userReducer from './User/reducerUser';
import customerReducer from './Customer/reducerCustomer';
import transactionReducer from './Transaction/reducerTransaction';

const rootReducer = combineReducers({
    user: userReducer,
    customers: customerReducer,
    transactions: transactionReducer
});

const store = createStore(rootReducer);

export default store;