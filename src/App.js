import React, { Component } from 'react';
import {Row, Col} from 'reactstrap';
import NavBar from './components/NavBar';
import Grid from './components/Grid';
import Palette from './components/Palette';
import ProjectBox from './components/ProjectBox';
import './App.css';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

class App extends Component {
  render() {
    return (
      <Router history={createHistory()}>
        <div>
          <div><Route path="/" render={() => <NavBar />} /></div>
          <Row>
            <Col md="8">
              <Route path="/" render={() => <Grid />} />
              <Route path="/" render={() => <Palette />} />
            </Col>
            <Col md="4">
              <Route path="/" render={() => <ProjectBox />} />
            </Col>
          </Row>
        </div>
      </Router>
    );
  }
}

export default App;
