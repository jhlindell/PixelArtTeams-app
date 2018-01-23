import React from "react";
import ProjectDropdown from './ProjectDropdown';
import NewProject from './NewProject';
import AddNewUser from './AddNewUser';
import Collaborators from './Collaborators';
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
        <div className="projectMenuTextText">
          <Link
            className="navButtonText projectMenuTextText"
            to="/art"
          >
            Canvas
          </Link>
        </div>

        <div className="projectMenuTextText">
          <Link
            className="navButtonText projectMenuTextText"
            to="/gallery"
          >
            Gallery
          </Link>
        </div>

        <NewProject addNewProject={this.props.addNewProject} />
        <AddNewUser
          addNewUser={this.props.addNewUser}
          checkUserForAdd={this.props.checkUserForAdd} />

        <button
          className="projectMenuTextText"
          onClick={() => this.props.saveProject()}
        >
          Save Project
        </button>

        <br/>

        <button
        className="projectMenuTextText"
        onClick={() => this.props.sendFinishedProject()}
        >
          Finish Project
        </button>
        <br/>
        <button
          className="projectMenuTextText mb-3"
          onClick={() => this.props.deleteProject()}
        >
          Delete Project
        </button>
        <br/>
        <p className="menuTitleTextText">
          Projects
        </p>
        {this.props.projects.map(project => <ProjectDropdown key={project.project_id} project={project} />)}
        <br/>
        <p className="menuTitleTextText">
          Collaborators
        </p>

        <Collaborators />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {projects: state.projectsReducer, menuReducer: state.menuReducer};
}

export default connect(mapStateToProps, null)(Menu);
