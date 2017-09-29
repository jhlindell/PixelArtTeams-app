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
import { connect } from 'react-redux';

class NewProject extends React.Component {

  constructor(props) {
    super(props);

    this.toggleNewProject = this.toggleNewProject.bind(this);
    this.state = {
      isOpen: false,
      newProjectToggle: false,
      project_name: '',
      x: 20,
      y: 20,
    };
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

  render(){
    return (
      <div>
        <button
          className="projectBoxButtonText"
          onClick={() => this.toggleNewProject()}
        >
          New Project
        </button>

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

function mapStateToProps(state) {
  return {projects: state.projectsReducer, menuReducer: state.menuReducer};
}

export default connect(mapStateToProps, null)(NewProject);
