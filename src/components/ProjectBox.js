import React, {Component} from 'react';
import {Card, CardBlock, CardHeader, CardFooter, Col, Form, Label, FormGroup,
  CardTitle, Button, Input} from 'reactstrap';
import Project from './Project';
import {connect} from 'react-redux';

class ProjectBox extends Component {

  constructor(props){
    super(props);
    this.state = {
      project_name: '',
      newProjectToggle: false,
      x: 20,
      y: 20
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.setState({newProjectToggle: false});
    this.props.addNewProject(this.state.project_name, this.state.x, this.state.y);
  }

  openNewProjectForm = () => {
    this.setState({newProjectToggle: true});
  }

  cancelNew = () => {
    this.setState({newProjectToggle: false});
  }

  finishProject = () => {
    this.props.sendFinishedProject();
  }

  deleteProject = () => {
    this.props.deleteProject();
  }

  render(){
    return (
      <Card className="projectBox">
        <CardHeader>
          <CardTitle className="projectBoxTitleText">
            Pixel Projects
          </CardTitle>
        </CardHeader>
        <CardBlock className="projectList">
          {this.props.projects.map(project => <Project key={project.id} project={project} />)}
        </CardBlock>
        <CardFooter className="newProjectInfoBox">
          {!this.state.newProjectToggle  && <div>
            <div className="projectButton">
            <Button className="projectBoxButtonText" onClick={() => this.openNewProjectForm()}>
              New Project</Button></div>
            <div className="projectButton">
            <Button className="projectBoxButtonText" onClick={() => this.props.saveProject()}>
              Save Project</Button></div>
            <div className="projectButton">
            <Button className="projectBoxButtonText" onClick={() => this.finishProject()}>Finish Project</Button></div>
            <div className="projectButton">
            <Button className="projectBoxButtonText" onClick={() => this.deleteProject()}>Delete Project</Button></div>
          </div>}
          {this.state.newProjectToggle && <Card className="newProject">
            <Form onSubmit={this.onFormSubmit}>
              <FormGroup row>
              <Label className="projectLabelText" for="project_name" sm={12}>Project Name</Label>
                <Col sm={12}>
                  <Input type="text" name="project_name" onChange={(e) => {
                        this.handleInputChange(e)
                      }} value={this.state.project_name} placeholder=""/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="x" sm={8}>X Size</Label>
                <Col md={4}>
                  <Input type="number" name="x" onChange={(e) => {
                        this.handleInputChange(e)
                      }} value={this.state.x} placeholder=""/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="x" sm={8}>Y Size</Label>
                <Col md={4}>
                  <Input type="number" name="y" onChange={(e) => {
                        this.handleInputChange(e)
                      }} value={this.state.y} placeholder=""/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Button className="newProjectButton">
                  <span>Submit New Project</span>
                </Button>
              </FormGroup>
            </Form>
            <Button className="newProjectButton"
              onClick={()=> this.cancelNew()}>
              <span>Cancel New</span>
            </Button>
          </Card>}
        </CardFooter>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  return {projects: state.projectsReducer}
}

export default connect(mapStateToProps, null)(ProjectBox);
