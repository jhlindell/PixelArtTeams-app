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
import pixelpalette from '../pixelpalette.png';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

const imgStyle = {
  width: "72px",
  marginRight: "20px",
};

function changeShowMenuState() {
  return {
    type: 'CHANGE_MENU_SHOW_STATE'
  };
}

class NavBarArt extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
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
          right
          onClick={this.props.changeShowMenuState}
        />
        <Media
          left
        >
          <Media
            style={imgStyle}
            object
            src={pixelpalette}
            alt=""
          />
        </Media>
        <NavbarBrand
          className="navText"
        >
          Pixel Art Teams
        </NavbarBrand>
        <Collapse
          isOpen={this.state.isOpen}
          navbar
        >
          <Nav
            className="ml-auto"
            navbar
          >
            <Button
              color="secondary"
              onClick={this.props.changeShowMenuState}
            >
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({changeShowMenuState}, dispatch);
}

export default connect(null, mapDispatchToProps)(NavBarArt);
