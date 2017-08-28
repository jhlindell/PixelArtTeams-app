import React from "react";
import { Collapse, Button, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';

class NavBar extends React.Component {

  render(){
    return (
      <div>
        <Navbar color="inverse" light toggleable>
          <NavbarBrand href="/" className="navText">Team Pixel Art</NavbarBrand>
          <Nav className="ml-auto navText" navbar>
            UserInfo
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
