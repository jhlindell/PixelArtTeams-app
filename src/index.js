import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if(token){
  store.dispatch({ type: 'AUTH_USER' });
}

registerServiceWorker();

ReactDOM.render(
  <Provider store={store}>

      <App />

  </Provider>
  , document.getElementById('root'));
