import React, {Component} from 'react';
import {Card,CardText, CardBlock,
  CardTitle, Col, Button} from 'reactstrap';
import Project from './Project';

class ProjectBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      projects: [
        {id:1, projectName: 'project 1'},
        {id:2, projectName: 'project 2'},
        {id:3, projectName: 'project 3'},
      ]
    }
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
          {this.state.projects.map(project => <Project key={project.id} project={project} />)}
        </CardBlock>
        <CardBlock>
          <Button>New Project</Button>
          <Button>Save Project</Button>
        </CardBlock>
      </Card>
    )  
  }
}

export default ProjectBox;
