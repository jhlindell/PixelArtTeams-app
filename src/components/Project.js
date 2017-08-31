import React, { Component } from 'react';
import { Card, CardTitle } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function selectProject(id){
  return {
    type: 'SELECT_PROJECT',
    payload: { id }
  }
}

// if(this.props.project.id === this.props.currentProject){
  //  apply projectCardHighlighted
//}
//

class Project extends Component {
  render(){
    return (
      <Card className={"projectCard " + ((this.props.project.id === this.props.currentProject) ? "projectCardHighlighted" : "")}
        onClick={() => this.props.selectProject(this.props.project.id)}>
        <CardTitle className="projectCardText">
          {this.props.project.projectName}
        </CardTitle>
      </Card>
    )
  }
}

function mapStateToProps(state){
  return {currentProject: state.currentProject}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectProject }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);
