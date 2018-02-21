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
            <div className="col col-sm-3">
              <div className="card" onClick={()=> this.props.history.push('/newProject')}>
                <div className="card-header">
                  <div className="artTitleText cardtitle" >
                    New
                  </div>
                </div>
                <div className="card-body">
                  <div className="artTitleText cardtitle mt-4 mb-4">
                    Start New Project
                  </div>
                </div>
              </div>
            </div>
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
