import React from "react";
import {
  Navbar,
  Media,
  Nav,
  NavItem,
  NavbarToggler,
  Collapse,
  NavbarBrand,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import pixelpalette from '../pixelpalette.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const imgStyle = {
  width: "72px",
  marginRight: "20px",
};

class NavBar extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  finishProject = () => {
    this.props.sendFinishedProject();
  }

  deleteProject = () => {
    this.props.deleteProject();
  }

  saveProject = () => {
    this.props.saveProject();
  }

  // <NavItem>
  //   <Button
  //     className="navLinks navbar-right"
  //   >
  //     <Link
  //       className="navButtonText"
  //       to="/art"
  //     >
  //       Paint
  //     </Link>
  //   </Button>
  // </NavItem>
  // <NavItem>
  //   <Button
  //     className="navLinks navbar-right"
  //   >
  //     <Link
  //       className="navButtonText"
  //       to="/gallery"
  //     >
  //       Gallery
  //     </Link>
  //   </Button>
  // </NavItem>

  render(){
    return (
      <Navbar
        color="inverse"
        light
        toggleable
      >
        <NavbarToggler
          right
          onClick={this.toggle}
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
            <NavItem>
              <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                  Menu
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link
                      className="navButtonText"
                      to="/art"
                    >
                      Paint
                    </Link>
                  </DropdownItem>

                  <DropdownItem>
                    <Link
                      className="navButtonText"
                      to="/gallery"
                    >
                      Gallery
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {projects: state.projectsReducer};
}

export default connect(mapStateToProps, null)(NavBar);
