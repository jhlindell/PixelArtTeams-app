import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectProject } from '../actions/index';
import ProjectSelectorCard from './ProjectSelectorCard';

class ProjectSelector extends Component {


  render(){
    const newStyle = {};
    newStyle.padding = '50px';
    newStyle.justifyContent = 'center';
    newStyle.fontSize = '28px';
    newStyle.textAlign = 'center';
    newStyle.margin = 'auto';

    return (
      <div style={newStyle}>
        <p className="mb-3">Your Available Projects:</p>
        <div className="card-deck">
          <div className="col col-sm-3">
            <div className="card mb-3" onClick={()=> this.props.history.push('/newProject')}>
              <div className="card-header">
                <div className="artTitleText" >
                  New
                </div>
              </div>
              <div className="card-body">
                <div className="artTitleText mt-4 mb-4">
                  Start New Project
                </div>
              </div>
            </div>
          </div>
          {this.props.projects.map((art) => <ProjectSelectorCard art={art} key={art.project_name} /> )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { currentProject: state.currentProject, projects: state.projectsReducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectProject }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSelector);
