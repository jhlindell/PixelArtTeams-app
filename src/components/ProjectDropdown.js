import React, { Component } from 'react';
import { Card, CardTitle, DropdownItem } from 'reactstrap';
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
      <DropdownItem
        className="projectBoxButtonText"
        onClick={() => this.props.selectProject(this.props.project.id)}
      >
        {this.props.project.project_name}
      </DropdownItem>
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
