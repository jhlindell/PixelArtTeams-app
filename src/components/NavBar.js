import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeShowMenuState } from '../actions/index';
import { getUserName } from '../actions/socketActions';

const navBarStyle = {
  display: 'flex',
  height: '50px',
  width: '100%',
  backgroundColor: 'black',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
  listStyle: 'none',
  padding: 0,
  margin: 0
};

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
      return <li key={'signout'}>
        <Link className="navLink"  to="/signout">Sign Out</Link>
      </li>
    } else {
      // show a link to sign in or sign up
      return [
        <li key={'signin'}>
          <Link className="navLink"  to="/signin">Sign In</Link>
        </li>,
        <li key={'signup'}>
          <Link className="navLink" key={'signup'} to="/signup">Sign Up</Link>
        </li>
      ];
    }
  }

  render(){
    return (
      <ul style={navBarStyle}>
        <li key={'art'} >
          <Link to="/newProject" className="navLink">Make Art</Link>
        </li>
        <li key={'gallery'}>
          <Link to="/gallery" className="navLink">Gallery</Link>
        </li>
        <li key={'home'}>
          <Link to="/" className="navText">Pixel Art Teams</Link>
        </li>
        <li key={'store'}>
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
