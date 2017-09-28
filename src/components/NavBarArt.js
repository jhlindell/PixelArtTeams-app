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
  Input
} from 'reactstrap';
import pixelpalette from '../pixelpalette.png';
import ProjectDropdown from './ProjectDropdown';
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
                <DropdownToggle
                  caret
                  className="projectBoxButtonText"
                >
                  Menu
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link
                      className="navButtonText"
                      to="/art"
                    >
                      Canvas
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

                  <DropdownItem
                    className="projectBoxButtonText"
                    onClick={() => this.toggleNewProject()}
                  >
                    New Project
                  </DropdownItem>

                  <DropdownItem
                    className="projectBoxButtonText"
                    onClick={() => this.saveProject()}
                  >
                    Save Project
                  </DropdownItem>

                  <DropdownItem
                  className="projectBoxButtonText"
                  onClick={() => this.finishProject()}
                  >
                    Finish Project
                  </DropdownItem>

                  <DropdownItem
                    className="projectBoxButtonText"
                    onClick={() => this.deleteProject()}
                  >
                    Delete Project
                  </DropdownItem>

                  <DropdownItem
                    header
                    className="projectBoxButtonText"
                  >
                    Projects
                  </DropdownItem>

                  <DropdownItem divider />

                  {this.props.projects.map(project => <ProjectDropdown key={project.id} project={project} />)}
                </DropdownMenu>
              </Dropdown>
            </NavItem>
          </Nav>
        </Collapse>

        <Modal
          isOpen={this.state.newProjectToggle}
          toggle={()=>this.toggleNewProject()}
        >
          <ModalHeader
            toggle={()=>this.toggleNewProject()}
          >
            New Project
          </ModalHeader>

          <ModalBody>
            <Form
              onSubmit={this.onFormSubmit}
            >
              <FormGroup
                row>
                <Label
                  className="projectLabelText"
                  for="project_name"
                  sm={12}
                >
                  Project Name
                </Label>
                <Col
                  sm={12}
                >
                  <Input
                    type="text"
                    name="project_name"
                    onChange={(e) => {
                      this.handleInputChange(e);
                    }}
                    value={this.state.project_name}
                    placeholder=""
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label
                  for="x"
                  sm={8}
                >
                  X Size
                </Label>
                <Col
                  md={4}
                >
                  <Input
                    type="number"
                    name="x"
                    onChange={(e) => {
                      this.handleInputChange(e);
                    }}
                    value={this.state.x}
                    placeholder=""
                  />
                </Col>
              </FormGroup>

              <FormGroup
                row
              >
                <Label
                  for="x"
                  sm={8}
                >
                  Y Size
                </Label>
                <Col
                  md={4}
                >
                  <Input
                    type="number"
                    name="y"
                    onChange={(e) => {
                      this.handleInputChange(e);
                    }}
                    value={this.state.y}
                    placeholder=""/>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={()=>this.onFormSubmit()}
            >
              Submit
            </Button>
            {' '}
            <Button
              color="secondary"
              onClick={()=>this.toggleNewProject()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {projects: state.projectsReducer};
}

export default connect(mapStateToProps, null)(NavBar);
