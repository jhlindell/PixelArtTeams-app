import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function selectProject(id){
  return {
    type: 'SELECT_PROJECT',
    payload: { id }
  };
}

class Project extends Component {
  render(){
    return (
      <div
        className={"projectCard " + ((this.props.project.id === this.props.currentProject)
        ?
        "projectCardHighlighted"
        :
        "")}
        onClick={() => this.props.selectProject(this.props.project.id)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Project);
