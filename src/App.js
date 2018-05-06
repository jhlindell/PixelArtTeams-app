import React, { Component } from 'react';
import Gallery from './components/gallery/Gallery';
import MessageContainer from './components/MessageContainer';
import MainCanvas from './components/canvas/MainCanvas';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import VerifyEmail from './components/auth/verifyEmail';
import SignInTrouble from './components/auth/signInTrouble';
import PasswordReset from './components/auth/passwordReset';
import About from './components/help/About';
import AddNewUser from './components/projectControls/AddNewUser';
import HomePage from './components/HomePage';
import NavBar from './components/nav/NavBar';
import NewProject from './components/projectControls/NewProject';
import FinishArt from './components/projectControls/FinishArt';
import DeleteProject from './components/projectControls/DeleteProject';
import ProtectedRoute from './components/ProtectedRoute';
import ShowProject from './components/gallery/ShowProject';
import Store from './components/store/Store';
import Footer from './components/nav/Footer';
import CustomerSupport from './components/help/CustomerSupport';
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
    const flexCol = {
      display: 'flex',
      flexDirection: 'column',
      backgroundSize: 'auto',
      backgroundImage: `url(${Background})`,
    };

    const flex0 = {
      flex: 0
    };

    const flex1 = {
      display: 'flex',
      flex: '1 1 100%',
    };

    return (
      <Router>
        <div className="App-body" style={flexCol}>
          <div style={flex0}>
            <NavBar />
          </div>
          <div style={flex0}>
            <MessageContainer />
          </div>
          <div style={flex1} id="mainBlock">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/signup" component={Signup} />
              <Route path="/signin" component={Signin} />
              <Route path="/signout" component={Signout} />
              <Route path="/verifyEmail/:hash" component={VerifyEmail} />
              <Route path="/signInTrouble" component={SignInTrouble} />
              <Route path="/passwordReset/:hash" component={PasswordReset} />
              <Route path="/about" component={About} />
              <Route path="/store" component={Store} />
              <Route path="/customerSupport" component={CustomerSupport} />

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
