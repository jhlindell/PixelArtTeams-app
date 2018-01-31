import React from "react";
import ProjectsList from './ProjectsList';
import NewProject from './NewProject';
import AddNewUser from './AddNewUser';
import Collaborators from './Collaborators';
import About from './About';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteProject, saveProject, sendFinishedProject} from '../actions/socketActions';

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
          position: 'absolute',
          zIndex: 2,
          background: 'lightgray',
          paddingRight: '2px',
          paddingLeft: '2px',
          display: this.props.menuReducer?'inline':'none',
        }}
      >
        
        <Route path='/gallery' render={ ()=>(
          <div className="projectMenuText">
            <Link className="navButtonText projectMenuText"
              to="/art" >
              Canvas
            </Link>
          </div>
        )}/>
        <Route path='/art' render={ ()=>(
          <div>
            {/* <About /> */}
            <div className="projectMenuText">
              <Link className="navButtonText projectMenuText"
                to="/gallery" >
                Gallery
              </Link>
            </div>
            <NewProject />
            {this.state.isOwner && <div>
              <AddNewUser />

              <button
                className="projectMenuText"
                onClick={() => this.props.saveProject()}
              >
                Save Project
              </button>

              <br/>

              <button
              className="projectMenuText"
              onClick={() => this.props.sendFinishedProject()}
              >
                Finish Project
              </button>
              <br/>
              <button
                className="projectMenuText"
                onClick={() => this.props.deleteProject()}
              >
                Delete Project
              </button>
            </div>}
            <br/>
            <div className="menuTitleText">
              Projects
            </div>
            {this.props.projects.map(project => <ProjectsList key={project.project_id} project={project} />)}
            <br/>
            <div className="menuTitleText">
              Collaborators
            </div>
            <Collaborators />
          </div>
        )}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { projects: state.projectsReducer, menuReducer: state.menuReducer, username: state.userName, currentProject: state.currentProject, username: state.userName };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ deleteProject, saveProject, sendFinishedProject}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
