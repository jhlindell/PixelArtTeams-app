import React from "react";
import {
  Navbar,
  Media,
  Button,
  Nav,
  NavbarToggler,
  Collapse,
  NavbarBrand,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import pixelpalette from '../pixelpalette.png';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeShowMenuState } from '../actions/index';
import { getUserName } from '../actions/socketActions';

const imgStyle = {
  width: "72px",
  marginRight: "20px",
};

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

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

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
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
      <Navbar
        color="inverse"
        light
        toggleable
        style={{
          height: '10vh'
        }}
      >

        <NavbarToggler
          onClick={ this.props.changeShowMenuState }
        />
        <Media
          left
        >
          <Media
            style={ imgStyle }
            object
            src={ pixelpalette }
            alt=""
          />
        </Media>
        <NavbarBrand className="navText">
          Pixel Art Teams
        </NavbarBrand>

        <Collapse
          isOpen={ this.state.isOpen }
          navbar
        >

          <Nav className="ml-auto" navbar>
            {this.props.username && <span className="userNameText mr-2 mt-1">
              Hi,{ this.props.username }
            </span>}
            {this.renderLinks()}
            <Button
              color="secondary"
              onClick={ this.props.changeShowMenuState }>
              <span
                className="glyphicon glyphicon-search menuButton"
                aria-hidden="true">Menu
              </span>
            </Button>
          </Nav>
        </Collapse>
      </Navbar>
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
