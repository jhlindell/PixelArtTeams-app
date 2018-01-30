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
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Route }
  from 'react-router-dom';
import './App.css';
import {bindActionCreators} from 'redux';
import { initialize, joinRoom, leaveRoom, grid } from './actions/socketActions';
const socket = require('./socket');

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
        <div className="App-body" >
          <Route exact path="/" component={LandingPage} />

          <Route path="/art" component={NavBar} />
          <Route path="/art" component={Menu} />
          <Route path="/art" component={Palette} />
          <Route path="/art" component={Grid} />

          <Route path="/gallery" component={NavBar} />
          <Route path="/gallery" component={Menu} />
          <Route path="/gallery" component={Gallery} />

          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/signout" component={Signout} />
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
