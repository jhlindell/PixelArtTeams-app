import React from "react";
import {
  Navbar,
  Media,
  Button,
  Nav,
  NavItem,
  NavbarToggler,
  Collapse,
  NavbarBrand,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Form,
  Label,
  FormGroup,
  Input,
} from 'reactstrap';
import pixelpalette from '../pixelpalette.png';
import ProjectDropdown from './ProjectDropdown';
import { Link } from 'react-router-dom';
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

class NavBar extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      newProjectToggle: false,
      project_name: '',
      x: 20,
      y: 20,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleNewProject() {
    this.setState({
      newProjectToggle: !this.state.newProjectToggle
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  onFormSubmit = (event) => {
    this.setState({newProjectToggle: false});
    this.props.addNewProject(this.state.project_name, this.state.x, this.state.y);
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
                className="glyphicon glyphicon-search"
                aria-hidden="true">
              </span>
            </Button>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {projects: state.projectsReducer};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({changeShowMenuState}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, null)(NavBar);
