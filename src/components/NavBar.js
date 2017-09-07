import React from "react";
import { Navbar, Nav, NavItem, Media} from 'reactstrap';
import pixelpalette from '../pixelpalette.png';
import { Link } from 'react-router-dom';

const imgStyle = {
  width: "72px",
  marginRight: "20px",
}

class NavBar extends React.Component {

  render(){
    return (
      <div>
        <Navbar color="inverse" light className="navText">
          <Media left>
            <Media style={imgStyle} object src={pixelpalette} alt="" />
            Pixel Art Teams
          </Media>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/art">Paint </Link>
              <Link to="/gallery"> Gallery</Link>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
