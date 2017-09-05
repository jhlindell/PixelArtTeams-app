import React, {Component} from 'react';
import {Card, CardBlock, Form,
  CardTitle, Button, Input} from 'reactstrap';
import Project from './Project';
import {connect} from 'react-redux';

class ProjectBox extends Component {

  constructor(props){
    super(props);
    this.state = {
      project_name: '',
      newProjectToggle: false,
      x: 0,
      y: 0
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

  render(){
    return (
      <Card className="projectBox">
        <CardBlock>
          <CardTitle className="projectBoxTitleText">
            Pixel Projects
          </CardTitle>
        </CardBlock>
        <CardBlock className="projectList">
          {this.props.projects.map(project => <Project key={project.id} project={project} />)}
        </CardBlock>
        <CardBlock>
          <Button onClick={() => this.openNewProjectForm()}>
            New Project</Button>
          <Button onClick={() => this.props.saveProject()}>
            Save Project</Button>
          <Button onClick={() => this.finishProject()}>Finish</Button>
          {this.state.newProjectToggle && <Card>
            <Form onSubmit={this.onFormSubmit}>
              <Input type="text" name="project_name" onChange={(e) => {
                      this.handleInputChange(e)
                    }} value={this.state.project_name} placeholder=""/>
              <Input type="number" name="x" onChange={(e) => {
                      this.handleInputChange(e)
                    }} value={this.state.x} placeholder=""/>
              <Input type="number" name="y" onChange={(e) => {
                      this.handleInputChange(e)
                    }} value={this.state.y} placeholder=""/>
              <Button>
                <span>Submit New Project</span>
              </Button>
            </Form>
            <Button onClick={()=> this.cancelNew()}>
              <span>Cancel New</span>
            </Button>
          </Card>}
        </CardBlock>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  return {projects: state.projectsReducer}
}

export default connect(mapStateToProps, null)(ProjectBox);
