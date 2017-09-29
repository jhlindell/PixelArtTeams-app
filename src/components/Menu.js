import React from "react";
import {
  Button,
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
import ProjectDropdown from './ProjectDropdown';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Menu extends React.Component {

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
      <div
        style={{
          height: '90vh',
          left: 0,
          bottom: 0,
          position: 'fixed',
          zIndex: 2,
          background: 'blue',
          display: this.props.menuReducer?'inline':'none',
        }}
      >
        <div className="projectBoxButtonText">
          <Link
            className="navButtonText projectBoxButtonText"
            to="/art"
          >
            Canvas
          </Link>
        </div>

        <div className="projectBoxButtonText">
          <Link
            className="navButtonText projectBoxButtonText"
            to="/gallery"
          >
            Gallery
          </Link>
        </div>

        <button
          className="projectBoxButtonText"
          onClick={() => this.toggleNewProject()}
        >
          New Project
        </button>

        <br/>

        <button
          className="projectBoxButtonText"
          onClick={() => this.saveProject()}
        >
          Save Project
        </button>

        <br/>

        <button
        className="projectBoxButtonText"
        onClick={() => this.finishProject()}
        >
          Finish Project
        </button>
        <br/>
        <button
          className="projectBoxButtonText"
          onClick={() => this.deleteProject()}
        >
          Delete Project
        </button>
        <br/>
        <p
          className="projectBoxTitleText"
        >
          Projects
        </p>
        {this.props.projects.map(project => <ProjectDropdown key={project.id} project={project} />)}

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
      </div>
    );
  }
}

function mapStateToProps(state,) {
  return {projects: state.projectsReducer, menuReducer: state.menuReducer};
}

export default connect(mapStateToProps, null)(Menu);
