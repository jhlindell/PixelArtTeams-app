import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectProject } from '../actions/index';

class ProjectsList extends Component {
  render(){
    return (
      <div
        className={"projectCard " + ((this.props.project.project_id === this.props.currentProject)
        ?
        "projectCardHighlighted"
        :
        "")}
        onClick={() => this.props.selectProject(this.props.project.project_id)}
      >
        {this.props.project.project_name}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {currentProject: state.currentProject};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectProject }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
