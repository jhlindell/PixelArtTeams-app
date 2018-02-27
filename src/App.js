import React, { Component } from 'react';
import Gallery from './components/Gallery';
import MainCanvas from './components/MainCanvas';
import LandingPage from './components/LandingPage';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import About from './components/About';
import AddNewUser from './components/AddNewUser';
import NavBar2 from './components/NavBar2';
import NewProject from './components/NewProject';
import FinishArt from './components/FinishArt';
import ProtectedRoute from './components/ProtectedRoute';
import ShowProject from './components/ShowProject';
import Footer from './components/Footer';
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
    const newStyle = {};
    newStyle.flex = 0;
    const newStyle2 = {};
    newStyle2.display = 'flex';
    newStyle2.flex = '1 1 100%';
    newStyle2.alignItems = 'center';

    return (
      <Router>
        <div className="App-body" >
          <div style={newStyle}>
            <NavBar2 />
          </div>
          <div style={newStyle2} id="mainBlock">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/signup" component={Signup} />
              <Route path="/signin" component={Signin} />
              <Route path="/signout" component={Signout} />
              <Route path="/about" component={About} />

              <Route path="/gallery" component={Gallery} />
              <Route path="/project/:id" component={ShowProject} />

              <ProtectedRoute>
                <Route path="/newProject" component={NewProject} />
                <Route path="/art" component={MainCanvas} />
                <Route path="/newUser" component={AddNewUser} />
                <Route path="/finishart" component={FinishArt} />
              </ProtectedRoute>
            </Switch>
          </div>
          <div style={newStyle}>
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
