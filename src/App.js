import React, { Component } from 'react';
import Gallery from './components/Gallery';
import MainCanvas from './components/MainCanvas';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import About from './components/About';
import AddNewUser from './components/AddNewUser';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import NewProject from './components/NewProject';
import FinishArt from './components/FinishArt';
import DeleteProject from './components/DeleteProject';
import ProtectedRoute from './components/ProtectedRoute';
import ShowProject from './components/ShowProject';
import Store from './components/Store';
import Footer from './components/Footer';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import {bindActionCreators} from 'redux';
import { initialize, joinRoom, leaveRoom, grid } from './actions/socketActions';
import socket from './socket';
import Background from './watercolor-3173964_1920.jpg';

class App extends Component {

  componentWillMount() {
    socket.open();
    this.props.initialize();
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  componentDidUpdate(prevProps){
    if(this.props.currentProject !== prevProps.currentProject){
      this.props.leaveRoom(prevProps.currentProject);
      this.props.joinRoom(this.props.currentProject);
      this.props.grid(this.props.currentProject);
    }
  }

  render() {
    const flexCol = {};
    flexCol.display = 'flex';
    flexCol.flexDirection = 'column';
    flexCol.backgroundImage = `url(${Background})`;
    flexCol.backgroundSize = 'auto';

    const flex0 = {};
    flex0.flex = 0;
    const flex1 = {};
    flex1.display = 'flex';
    flex1.flex = '1 1 100%';
    //flex1.alignItems = 'center';

    return (
      <Router>
        <div className="App-body" style={flexCol}>
          <div style={flex0}>
            <NavBar />
          </div>
          <div style={flex1} id="mainBlock">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/signup" component={Signup} />
              <Route path="/signin" component={Signin} />
              <Route path="/signout" component={Signout} />
              <Route path="/about" component={About} />
              <Route path="/store" component={Store} />

              <Route path="/gallery" component={Gallery} />
              <Route path="/project/:id" component={ShowProject} />

              <ProtectedRoute>
                <Route path="/newProject" component={NewProject} />
                <Route path="/art" component={MainCanvas} />
                <Route path="/newUser" component={AddNewUser} />
                <Route path="/finishart" component={FinishArt} />
                <Route path="/deleteProject" component={DeleteProject} />
              </ProtectedRoute>
            </Switch>
          </div>
          <div style={flex0}>
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state){
  return {currentProject: state.currentProject, token: state.auth.token };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ initialize, joinRoom, leaveRoom, grid }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
