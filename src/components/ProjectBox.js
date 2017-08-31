import React, {Component} from 'react';
import {Card, CardBlock,
  CardTitle, Button} from 'reactstrap';
import Project from './Project';
import {connect} from 'react-redux';

class ProjectBox extends Component {
  componentDidMount(){
    console.log(this.props.projects);
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
          <Button onClick={() => this.props.addNewProject()}>New Project</Button>
          <Button>Save Project</Button>
        </CardBlock>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  return {projects: state.projectsReducer}
}

export default connect(mapStateToProps, null)(ProjectBox);
