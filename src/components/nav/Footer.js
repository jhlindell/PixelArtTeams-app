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

  componentWillReceiveProps(nextProps){
    if(nextProps.currentProject === 0){
      this.setState({isOwner: false});
    }
    if(nextProps.currentProject){
      this.isProjectOwner(nextProps.currentProject);
    }
  }

  isProjectOwner(id){
    const array = this.props.projects;
    const project = array.find((element) => element.project_id === id);
    if(project){
    (project.project_owner === this.props.user.username)? 
        this.setState({isOwner: true}) : this.setState({isOwner: false})   
    }
  }

  render(){
    const componentStyle={
      display: 'flex',
      justifyContent: 'space-around',
      backgroundColor: 'black',
      alignItems: 'center',
    };

    return (
      <footer style={componentStyle}>
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
