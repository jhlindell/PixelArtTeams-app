import React from "react";
import { Navbar, Media, Button} from 'reactstrap';
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
            <Media left className="navMedia">
              <Media
                style={imgStyle} object
                src={pixelpalette} alt=""/>
              Pixel Art Teams
                <Button className="navLinks"><Link className="navButtonText" to="/gallery">Gallery</Link></Button>
                <Button className="navLinks"><Link className="navButtonText" to="/art">Paint</Link></Button>
            </Media>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
