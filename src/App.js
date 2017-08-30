import React, { Component } from 'react';
import {Row, Col} from 'reactstrap';
import NavBar from './components/NavBar';
import Grid from './components/Grid';
import Palette from './components/Palette';
import ProjectBox from './components/ProjectBox';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {connect} from 'react-redux';
import openSocket from 'socket.io-client';
import { bindActionCreators } from 'redux';
import './App.css';

function pixelClick(x, y, color) {
  return {
    type: 'PIXEL_CLICK',
    payload: { x, y, color }
  }
}

function updateGrid(grid){
  return {
    type: 'UPDATE_GRID',
    payload: grid
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.sendPixelToSocket = this.sendPixelToSocket.bind(this);
  }

  componentDidMount() {
    this.socket = openSocket('http://localhost:7000');
    this.socket.on('connect', () => {
      this.socket.emit('grid', 'update');
    });
    this.socket.on('pixel', (pixel) => {
      this.props.pixelClick(pixel.x, pixel.y, pixel.color);
    });
    this.socket.on('gridUpdated', (grid)=> {
      this.props.updateGrid(grid);
    });
  }

  sendPixelToSocket(x, y, color){
    this.socket.emit('pixel', {x: x, y: y, color: color});
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    return (
      <Router history={createHistory()}>
        <div>
          <div><Route path="/" render={() => <NavBar />} /></div>
          <Row>
            <Col md="8">
              <Route path="/" render={() => <Grid sendPixel={this.sendPixelToSocket} />} />
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ pixelClick, updateGrid }, dispatch)
}

export default connect(null, mapDispatchToProps)(App);
