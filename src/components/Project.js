import React, { Component } from 'react';
import { Card, CardTitle } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectProject } from '../actions/index';

class Project extends Component {
  render(){
    return (
      <Card
        className={"projectCard " + (this.props.project.project_id)}
        onClick={() => this.props.selectProject(this.props.project.project_id)}
      >
        <CardTitle
          className="projectButtonText"
        >
          {this.props.project.project_name}
        </CardTitle>
      </Card>
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
