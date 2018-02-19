import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectProject } from '../actions/index';
import ProjectSelectorCard from './ProjectSelectorCard';

class ProjectSelector extends Component {
  render(){
    return (
      <div className="row">
        <div className="offset-md-2 col-md-8 mt-4">
          <p className="pickAProject mb-3">Pick a project:</p>
          <div className="card-deck galleryCardDeck">
            {this.props.projects.map((art) => <ProjectSelectorCard art={art} key={art.project_name} /> )}
          </div>
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
