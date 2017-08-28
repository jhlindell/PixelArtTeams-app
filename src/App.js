import React, { Component } from 'react';
import LandingPage from './components/LandingPage';
import NavBar from './components/NavBar';
import './App.css';
import {Router, Route} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

class App extends Component {
  render() {
    return (
      <Router history={createHistory()}>
        <div>
          <Route path="/" render={() => <NavBar />} />

        </div>
      </Router>
    );
  }
}

export default App;

{/* <Route exact path="/" render={() => <LandingPage />}/> */}
