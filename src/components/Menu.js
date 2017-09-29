import React from "react";
import ProjectDropdown from './ProjectDropdown';
import NewProject from './NewProject';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Menu extends React.Component {

  constructor(props) {
    super(props);
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
          height: 'fit-content',
          right: 0,
          // bottom: 0,
          position: 'absolute',
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

        <NewProject addNewProject={this.props.addNewProject} />

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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {projects: state.projectsReducer, menuReducer: state.menuReducer};
}

export default connect(mapStateToProps, null)(Menu);