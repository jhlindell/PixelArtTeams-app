import React from "react";
import { Navbar, NavbarBrand, Nav} from 'reactstrap';

class NavBar extends React.Component {

  render(){
    return (
      <div>
        <Navbar color="inverse" light toggleable>
          <NavbarBrand href="/" className="navText">Team Pixel Art</NavbarBrand>
          <Nav className="ml-auto navText" navbar>
            
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
