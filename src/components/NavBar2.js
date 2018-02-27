import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeShowMenuState } from '../actions/index';
import { getUserName } from '../actions/socketActions';

class NavBar extends React.Component {
  componentWillMount(){
    if(this.props.authenticated){
      this.props.getUserName();
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.authenticated){
      this.props.getUserName();
    }
  }

  renderLinks() {
    if (this.props.authenticated) {
      // show a link to sign out
      return <li>
        <Link className="navLink" to="/signout">Sign Out</Link>
      </li>
    } else {
      // show a link to sign in or sign up
      return [
        <li>
          <Link className="navLink" to="/signin">Sign In</Link>
        </li>,
        <li>
          <Link className="navLink" to="/signup">Sign Up</Link>
        </li>
      ];
    }
  }

  render(){
    return (
      <ul className="navBarStyle">
        <li>
          <Link to="/art" className="navLink">Make Art</Link>
        </li>
        <li>
          <Link to="/gallery" className="navLink">Gallery</Link>
        </li>
        <li>
          <span className="navText">Pixel Art Teams</span>
        </li>
        <li>
          <Link to="/store" className="navLink">Store</Link>
        </li>
        {this.renderLinks()}
      </ul>
    );
  }
}

function mapStateToProps(state){
  return { authenticated: state.auth.authenticated,
    token: state.auth.token, username: state.userName };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeShowMenuState, getUserName }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
