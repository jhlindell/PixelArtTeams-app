import React from "react";
import { Navbar, Media, Button, Nav, NavItem,
  NavbarToggler, Collapse, NavbarBrand} from 'reactstrap';
import pixelpalette from '../pixelpalette.png';
import { Link } from 'react-router-dom';

const imgStyle = {
  width: "72px",
  marginRight: "20px",
}

class NavBar extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render(){
    return (
      <Navbar color="inverse" light toggleable>
        <NavbarToggler right onClick={this.toggle} />
        <Media left>
          <Media
            style={imgStyle} object src={pixelpalette} alt=""/>
          </Media>
        <NavbarBrand className="navText">Pixel Art Teams</NavbarBrand>
        <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Button className="navLinks navbar-right"><Link className="navButtonText" to="/art">Paint</Link></Button>
          </NavItem>
          <NavItem>
            <Button className="navLinks navbar-right"><Link className="navButtonText" to="/gallery">Gallery</Link></Button>
          </NavItem>
        </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
