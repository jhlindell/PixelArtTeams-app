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
import { pixelClick, updateGrid, selectProject, sendProjectsToStore, mouseDownAction, mouseUpAction, getGallery, setUserName, userNameCheck } from './actions/index';
const socket = require('./socket');

class App extends Component {

  componentWillMount() {
    socket.open();
    socket.on('connect', () => {
      if(this.props.currentProject !== 0){
        socket.emit('joinRoom', this.props.currentProject);
        socket.emit('grid', this.props.currentProject);
      }
    });

    socket.on('pixel', (pixel) => {
      this.props.pixelClick(pixel.x, pixel.y, pixel.color);
    });

    socket.on('gridUpdated', (grid)=> {
      this.props.updateGrid(grid);
    });

    socket.on('sendProjectsToClient', (projects)=> {
      this.props.sendProjectsToStore(projects);
    });

    socket.on('sendingGallery', (gallery) => {
      this.props.getGallery(gallery);
    });

    socket.on('requestRefresh', () => {
      socket.emit('refreshProjects', this.props.token);
    })

    socket.on('changeCurrentProject', (id)=> {
      this.props.selectProject(id);
    });

    socket.on('resultOfUserCheck', (result) => {
      if(result){
        console.log("user exists");
        this.props.userNameCheck(result, "User Exists");
      } else {
        console.log("user does not exist");
        this.props.userNameCheck(result, "User Doesn't Exist");
      }
    })

    socket.on('resultOfAddingPermission', (result) => {
      if(result){
        alert('user permission added successfully');
      } else {
        alert('problem adding user permission');
      }
    });

    socket.on('returnUserName', (username)=> {
      this.props.setUserName(username);
    });

    socket.emit('initialize', this.props.token);
  }

  componentDidUpdate(prevProps){
    if(this.props.currentProject !== prevProps.currentProject){
      socket.emit('leaveRoom', prevProps.currentProject);
      socket.emit('joinRoom', this.props.currentProject);
      socket.emit('grid', this.props.currentProject);
    }
  }

  sendPixelToSocket = (x, y, color) => {
    socket.emit('pixel', { x, y, color, project: this.props.currentProject});
  }

  addNewProject = (name, x, y) => {
    let token;
    if(!this.props.token){
      token = localStorage.getItem('token');
    } else
    token = this.props.token;
    socket.emit('addNewProject', {name, x, y, token});
  }

  checkUserForAdd = (username, email) => {
    socket.emit('checkUser', { username: username, email: email});
  }

  addNewUser = (username, email) => {
    socket.emit('addUserToProject', { username: username, email: email, projectid: this.props.currentProject});
  }

  sendFinishedProject = () => {
    socket.emit('sendFinishedProject', { projectid: this.props.currentProject, token: this.props.token});
  }

  saveProject = () => {
    socket.emit('saveProject', { projectid: this.props.currentProject, token: this.props.token});
  }

  getProjects = () => {
    socket.emit('refreshProjects', this.props.token);
  }

  getUserName = () => {
    socket.emit('getUserName', this.props.token);
  }

  deleteProject = () => {
    socket.emit('deleteProject', { projectid: this.props.currentProject, token: this.props.token});
  }

  componentWillUnmount() {
    socket.disconnect();
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
    socket.emit('getArtForGallery');
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
            render={() => <NavBar
              getUserName={this.getUserName}
            />}
          />
          <Route
          path="/art"
          render={() => <Menu
            addNewProject={this.addNewProject}
            checkUserForAdd={this.checkUserForAdd}
            addNewUser={this.addNewUser}
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
              addNewProject={this.addNewProject}
              getProjects={this.getProjects}
            />}
          />

          <Route
            path="/gallery"
            render={() => <NavBar
              getUserName={this.getUserName}
            />}
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
  return bindActionCreators({ pixelClick, updateGrid, sendProjectsToStore, mouseDownAction, mouseUpAction, selectProject, getGallery, setUserName, userNameCheck }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
