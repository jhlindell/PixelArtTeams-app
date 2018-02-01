import React, {Component} from 'react';

class SelectProject extends Component{
  render(){
    return (
      <div>
        <h4 className="projectCardText mt-4">Select a project</h4>
        {
        this.props.projects.map(project => <Project
          key={project.project_id}
          project={project} />)
        }
      </div>
    )
  }

}

export default SelectProject;
