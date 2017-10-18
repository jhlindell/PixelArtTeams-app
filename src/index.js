import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import ReduxPromise from 'redux-promise';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

registerServiceWorker();

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>

      <App />

  </Provider>
  , document.getElementById('root'));
