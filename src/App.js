import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Grid from './components/Grid';
import Palette from './components/Palette';
import './App.css';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

class App extends Component {
  render() {
    return (
      <Router history={createHistory()}>
        <div>
          <Route path="/" render={() => <NavBar />} />
          <Route path="/" render={() => <Grid />} />
          <Route path="/" render={() => <Palette />} />
        </div>
      </Router>
    );
  }
}

export default App;
