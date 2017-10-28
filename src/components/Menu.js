import React from "react";
import ProjectDropdown from './ProjectDropdown';
import NewProject from './NewProject';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Menu extends React.Component {

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
          onClick={() => this.props.saveProject()}
        >
          Save Project
        </button>

        <br/>

        <button
        className="projectBoxButtonText"
        onClick={() => this.props.sendFinishedProject()}
        >
          Finish Project
        </button>
        <br/>
        <button
          className="projectBoxButtonText"
          onClick={() => this.props.deleteProject()}
        >
          Delete Project
        </button>
        <br/>
        <p
          className="projectBoxTitleText"
        >
          Projects
        </p>
        {this.props.projects.map(project => <ProjectDropdown key={project.project_id} project={project} />)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {projects: state.projectsReducer, menuReducer: state.menuReducer};
}

export default connect(mapStateToProps, null)(Menu);
