import React, { Component } from 'react';
import Gallery from './components/Gallery';
import MainCanvas from './components/MainCanvas';
import LandingPage from './components/LandingPage';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import ProtectedRoute from './components/ProtectedRoute';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import {bindActionCreators} from 'redux';
import { initialize, joinRoom, leaveRoom, grid } from './actions/socketActions';
import socket from './socket';

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
    return (
      <Router>
        <div className="App-body container-fluid" >
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route path="/signout" component={Signout} />

            <Route path="/gallery" component={Gallery} />

            <ProtectedRoute>
              <Route path="/art" component={MainCanvas} />
            </ProtectedRoute>
          </Switch>
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
