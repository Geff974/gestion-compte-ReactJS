import { createStore } from 'redux';
import userReducer from './User/reducerUser';

const store = createStore(userReducer);

export default store;