import React from "react";
import ProjectDropdown from './ProjectDropdown';
import NewProject from './NewProject';
import AddNewUser from './AddNewUser';
import Collaborators from './Collaborators';
import About from './About';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOwner: false
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.currentProject){
      this.isProjectOwner(nextProps.currentProject);
    }
  }

  isProjectOwner(id){
    let project;
    let array = this.props.projects;
    for(let i = 0; i < array.length; i++){
      if(array[i].project_id === id){
        project = array[i];
        break;
      }
    }
    if(project){
      if(project.project_owner === this.props.username){
        this.setState({isOwner: true});
      } else {
        this.setState({isOwner: false});
      }
    }
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

        <About />

        <NewProject addNewProject={this.props.addNewProject} />

        {this.state.isOwner && <div>
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
            className="projectMenuTextText"
            onClick={() => this.props.deleteProject()}
          >
            Delete Project
          </button>
        </div>}
        <br/>
        <div className="menuTitleTextText">
          Projects
        </div>
        {this.props.projects.map(project => <ProjectDropdown key={project.project_id} project={project} />)}
        <br/>
        <div className="menuTitleTextText">
          Collaborators
        </div>

        <Collaborators />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { projects: state.projectsReducer, menuReducer: state.menuReducer, username: state.userName, currentProject: state.currentProject };
}

export default connect(mapStateToProps, null)(Menu);
