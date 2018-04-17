import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectProject } from '../../actions/index';
import { getUserName } from '../../actions/socketActions';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOwner: false
    };
  }

  // componentWillMount(){
  //   if(this.props.authenticated){
  //     this.props.getUserName();
  //   }
  // }

  componentWillReceiveProps(nextProps){
    if(nextProps.currentProject === 0){
      this.setState({isOwner: false});
    }
    if(nextProps.currentProject){
      this.isProjectOwner(nextProps.currentProject);
    }
    // if(nextProps.authenticated && nextProps.authenticated !== this.props.authenticated){
    //   this.props.getUserName();
    // }
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
      if(project.project_owner === this.props.user.username){
        this.setState({isOwner: true});
      } else {
        this.setState({isOwner: false});
      }
    }
  }

  render(){
    const newStyle={};
    newStyle.display = 'flex';
    newStyle.justifyContent = 'space-around';
    newStyle.backgroundColor = 'black';
    newStyle.alignItems = 'center';

    return (
      <footer style={newStyle}>
        <Link onClick={() => this.props.selectProject(0)}
          to="/art">Projects</Link>
        {this.state.isOwner && <Link to="/newUser">Collaborators</Link>}
        {this.state.isOwner && <Link to="/finishArt">Finish Project</Link>}
        {this.state.isOwner && <Link to="/deleteProject">Delete Project</Link>}
        <Link to="/about">About</Link>
        <Link to="/customerSupport">Contact Us</Link>
      </footer>
    );
  }
}

function mapStateToProps(state){
  return { user: state.userName, currentProject: state.currentProject, authenticated: state.auth.authenticated, projects: state.projectsReducer };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ selectProject, getUserName }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
