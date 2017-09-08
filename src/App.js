import React, { Component } from 'react';
import {Row, Col} from 'reactstrap';
import NavBar from './components/NavBar';
import Grid from './components/Grid';
import Palette from './components/Palette';
import ProjectBox from './components/ProjectBox';
import Gallery from './components/Gallery';
import LandingPage from './components/LandingPage';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.css';

// const WS = 'pixelart-server.herokuapp.com/';
const WS = 'localhost:7000';

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

function selectProject(id){
  return {
    type: 'SELECT_PROJECT',
    payload: { id }
  }
}

function fetchProjects(projects){
  return {
    type: 'FETCH_PROJECTS',
    payload: projects
  }
}

function mouseDownAction(){
  return {
    type: 'MOUSE_DOWN',
    payload: true
  }
}

function mouseUpAction(){
  return {
    type: 'MOUSE_UP',
    payload: false
  }
}

function getGallery(art){
  return {
    type: 'GET_GALLERY',
    payload: art
  }
}

class App extends Component {

  componentWillMount() {
    this.socket = require('socket.io-client')(WS, {jsonp: false});
    this.socket.on('connect', () => {
      this.socket.emit('joinRoom', this.props.currentProject);
      this.socket.emit('grid', this.props.currentProject);
    });

    this.socket.on('pixel', (pixel) => {
      this.props.pixelClick(pixel.x, pixel.y, pixel.color);
    });

    this.socket.on('gridUpdated', (grid)=> {
      this.props.updateGrid(grid);
    });

    this.socket.on('sendProjectsToClient', (projects)=> {
      this.props.fetchProjects(projects);
    });

    this.socket.on('sendingGallery', (gallery) => {
      this.props.getGallery(gallery);
    });

    this.socket.on('changeCurrentProject', (id)=> {
      this.props.selectProject(id);
    });

    this.socket.emit('initialize');
    this.stockGallery();
  }

  componentDidUpdate(prevProps){
    if(this.props.currentProject !== prevProps.currentProject){
      this.socket.emit('leaveRoom', prevProps.currentProject);
      this.socket.emit('joinRoom', this.props.currentProject);
      this.socket.emit('grid', this.props.currentProject);
    }
  }

  sendPixelToSocket = (x, y, color) => {
    this.socket.emit('pixel', { x, y, color, project: this.props.currentProject});
  }

  addNewProject = (name, x, y) => {
    this.socket.emit('addNewProject', {name, x, y});
  }

  sendFinishedProject = () => {
    this.socket.emit('sendFinishedProject', this.props.currentProject);
  }

  saveProject = () => {
    this.socket.emit('saveProject', this.props.currentProject);
  }

  deleteProject = () => {
    this.socket.emit('deleteProject', this.props.currentProject);
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  mouseDown = () => {
    this.props.mouseDownAction();
  }

  mouseUp = () => {
    this.props.mouseUpAction();
  }

  mouseOver = (x, y, color) => {
    if(this.props.mouseDown){
      this.sendPixelToSocket(x,y,color);
    }
  }

  stockGallery = () => {
    this.socket.emit('getArtForGallery');
  }

  render() {
    return (
      <Router history={createHistory()}>
        <div>
          <Row>
            <Route exact path="/" render={() => <LandingPage />} />
          </Row>
          <div>
            <Route path="/art" render={() => <NavBar />} />

            <Row className="container-fluid">
              <Col md="8">
                <Route path="/art" render={() => <Grid
                  onMouseDown={this.mouseDown}
                  onMouseUp={this.mouseUp}
                  onMouseOver={this.mouseOver}
                  sendPixel={this.sendPixelToSocket} />} />
                <Route path="/art" render={() => <Palette />} />
              </Col>
              <Col md="4">
                <Route path="/art" render={() => <ProjectBox
                  addNewProject={this.addNewProject}
                  saveProject={this.saveProject}
                  deleteProject={this.deleteProject}
                  sendFinishedProject={this.sendFinishedProject} />} />
              </Col>
            </Row>
          </div>
          <div >
            <Route path="/gallery" render={() => <NavBar />} />
            <Row className="container">
              <Route path="/gallery" render={() => <Gallery
                stockGallery={this.stockGallery} />} />
            </Row>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state){
  return {currentProject: state.currentProject, mouseDown: state.mouseReducer}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ pixelClick, updateGrid, fetchProjects, mouseDownAction, mouseUpAction, selectProject, getGallery }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
