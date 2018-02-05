import React from "react";
import ProjectsList from './ProjectsList';
import Collaborators from './Collaborators';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteProject, saveProject, sendFinishedProject, getUserName } from '../actions/socketActions';

class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOwner: false
    };
  }

  componentWillMount(){
    if(this.props.authenticated){
      this.props.getUserName();
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.currentProject){
      this.isProjectOwner(nextProps.currentProject);
    }
    if(nextProps.authenticated){
      this.props.getUserName();
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
          position: 'absolute',
          zIndex: 2,
          background: 'lightgray',
          paddingRight: '2px',
          paddingLeft: '2px',
          display: this.props.menuReducer?'inline':'none',
        }}
      >
        {this.props.authenticated && <div>
          <div className="userNameMenu">
            {this.props.username}
          </div>
          <div className="menuMainChoice mb-2">
            <Link className="navButtonText projectMenuText" to="/signout" >
              Sign Out
            </Link>
          </div>
        </div>}
        {!this.props.authenticated && <div>
          <div className="menuMainChoice">
            <Link className="navButtonText projectMenuText" to="/signin" >
              Sign In
            </Link>
          </div>
          <div className="menuMainChoice mb-2">
            <Link className="navButtonText projectMenuText" to="/signup" >
              Sign Up
            </Link>
          </div>
        </div>}
        <div className="menuMainChoice mb-2">
          <Link className="navButtonText projectMenuText" to="/about">
            About
          </Link>
        </div>
        <Route path='/gallery' render={ ()=>(
          <div className="menuMainChoice">
            <Link className="navButtonText projectMenuText"
              to="/art" >
              Canvas
            </Link>
          </div>
        )}/>
        <Route path='/art' render={ ()=>(
          <div>
            {/* <About /> */}
            <div className="menuMainChoice mb-3">
              <Link className="navButtonText projectMenuText"
                to="/gallery" >
                Gallery
              </Link>
            </div>
            <div className="menuMainChoice mb-3">
              <Link className="navButtonText projectMenuText"
                to="/newProject" >
                New Project
              </Link>
            </div>
            {this.state.isOwner && <div>
              <div className="projectMenuHeading mt-3">
                Project Controls
              </div>
              <div className="projectMenuText mt-3">
                <Link className="navButtonText projectMenuText"
                  to="/newUser" >
                  Add New User
                </Link>
              </div>
              <div className="projectMenuText mb-1"
                onClick={() => this.props.saveProject()}
                > Save Project
              </div>
              <div className="projectMenuText mb-1"
              onClick={() => this.props.sendFinishedProject()}
              > Finish Project
              </div>
              <div className="projectMenuText mb-1"
                onClick={() => this.props.deleteProject()} >
                Delete Project
              </div>
            </div>}
            {this.props.authenticated && <div>
              <div className="projectMenuHeading mb-1 mt-3">
                Projects
              </div>
              {this.props.projects.map(project => <ProjectsList key={project.project_id} project={project} />)}
              <div className="projectMenuHeading mt-3">
                Collaborators
              </div>
              <Collaborators />
            </div>}
          </div>
        )}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { projects: state.projectsReducer, menuReducer: state.menuReducer, username: state.userName, currentProject: state.currentProject, authenticated: state.auth.authenticated, collaborators: state.collaborators };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ deleteProject, saveProject, sendFinishedProject, getUserName }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
