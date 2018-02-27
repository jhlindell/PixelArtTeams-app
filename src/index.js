import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import store from './store';

const token = localStorage.getItem('token');

if(token){
  store.dispatch({ type: 'AUTH_USER', payload: token });
}

registerServiceWorker();

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>
  , document.getElementById('root'));
