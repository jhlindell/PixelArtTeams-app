import React from "react";
import { Link } from 'react-router-dom';
import pixelpalette from '../pixelpalette.png';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeShowMenuState } from '../actions/index';
import { getUserName } from '../actions/socketActions';

const imgStyle = {
  width: "50px",
  marginRight: "20px",
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
      return <li className="nav-item">
        <Link type="button" className="nav-link btn btn-secondary menuButton" to="/signout">Sign Out</Link>
      </li>
    } else {
      // show a link to sign in or sign up
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link btn btn-secondary menuButton" to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link btn btn-secondary menuButton" to="/signup">Sign Up</Link>
        </li>
      ];
    }
  }

  render(){
    return (
      <nav className="navbar navbar-toggleable navbar-light bg-inverse"
        style={{ height: '50px' }} >
        <a className="navText navbar-brand">
          <img style={ imgStyle } src={ pixelpalette }
            className="d-inline" alt="palette"/>
          Pixel Art Teams
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="ml-auto navbar-nav">
            <li>
              <button className="btn btn-secondary" type="button"
                onClick={ this.props.changeShowMenuState }>
                <span className="glyphicon glyphicon-search menuButton"
                  aria-hidden="true">Menu </span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
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
