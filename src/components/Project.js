import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectProject } from '../actions/index';

class Project extends Component {
  render(){
    return (
      <div className={"card projectCard " + (this.props.project.project_id)}
        onClick={() => this.props.selectProject(this.props.project.project_id)} >
        <h4 className="projectButtonText cardtitle" >
          {this.props.project.project_name}
        </h4>
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
