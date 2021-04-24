import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
  <Provider store={store} >
   <React.StrictMode>
    <App />
   </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
