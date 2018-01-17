import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Gallery from './components/Gallery';
import Grid from './components/Grid';
import Menu from './components/Menu';
import LandingPage from './components/LandingPage';
import Palette from './components/Palette';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Route }
  from 'react-router-dom';
import './App.css';
import { pixelClick, updateGrid, selectProject, sendProjectsToStore, mouseDownAction,
  mouseUpAction, getGallery } from './actions/index';

// const WS = 'pixelart-server.herokuapp.com:';
const WS = 'localhost:8000';

class App extends Component {

  componentWillMount() {
    this.socket = require('socket.io-client')(WS, {jsonp: false});
    this.socket.on('connect', () => {
      if(this.props.currentProject !== 0){
        this.socket.emit('joinRoom', this.props.currentProject);
        this.socket.emit('grid', this.props.currentProject);
      }
    });

    this.socket.on('pixel', (pixel) => {
      this.props.pixelClick(pixel.x, pixel.y, pixel.color);
    });

    this.socket.on('gridUpdated', (grid)=> {
      this.props.updateGrid(grid);
    });

    this.socket.on('sendProjectsToClient', (projects)=> {
      this.props.sendProjectsToStore(projects);
    });

    this.socket.on('sendingGallery', (gallery) => {
      this.props.getGallery(gallery);
    });

    this.socket.on('requestRefresh', () => {
      this.socket.emit('refreshProjects', this.props.token);
    })

    this.socket.on('changeCurrentProject', (id)=> {
      this.props.selectProject(id);
    });

    this.socket.emit('initialize', this.props.token);
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
    let token;
    if(!this.props.token){
      token = localStorage.getItem('token');
    } else
    token = this.props.token;
    this.socket.emit('addNewProject', {name, x, y, token});
  }

  sendFinishedProject = () => {
    this.socket.emit('sendFinishedProject', { projectid: this.props.currentProject, token: this.props.token});
  }

  saveProject = () => {
    this.socket.emit('saveProject', { projectid: this.props.currentProject, token: this.props.token});
  }

  deleteProject = () => {
    this.socket.emit('deleteProject', { projectid: this.props.currentProject, token: this.props.token});
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
      <Router>
        <div
          className="App-body"
        >
          <Route
            exact
            path="/"
            render={() => <LandingPage />}
          />

          <Route
            path="/art"
            render={() => <NavBar />}
          />
          <Route
          path="/art"
          render={() => <Menu
            addNewProject={this.addNewProject}
            saveProject={this.saveProject}
            deleteProject={this.deleteProject}
            sendFinishedProject={this.sendFinishedProject}/>}
          />
          <Route
            path="/art"
            render={() => <Palette />}
          />
          <Route
            path="/art"
            render={() => <Grid
              onMouseDown={this.mouseDown}
              onMouseUp={this.mouseUp}
              onMouseOver={this.mouseOver}
              sendPixel={this.sendPixelToSocket}
              addNewProject={this.addNewProject} />}
          />

          <Route
            path="/gallery"
            render={() => <NavBar />}
          />
          <Route
            path="/gallery"
            render={() => <Menu
            addNewProject={this.addNewProject}
            saveProject={this.saveProject}
            deleteProject={this.deleteProject}
            sendFinishedProject={this.sendFinishedProject}/>}
          />
          <Route
            path="/gallery"
            render={() => <Gallery
              stockGallery={this.stockGallery} />}
          />
          <Route
            path="/signup"
            component={Signup}
          />
          <Route path="/signin" component={Signin} />
          <Route path="/signout" component={Signout} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state){
  return {currentProject: state.currentProject, mouseDown: state.mouseReducer,
    token: state.auth.token };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ pixelClick, updateGrid, sendProjectsToStore, mouseDownAction, mouseUpAction, selectProject, getGallery }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
