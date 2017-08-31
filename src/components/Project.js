import React, { Component } from 'react';
import { Card,CardText, CardBlock,
  CardTitle, Col, Button } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function selectProject(id){
  return {
    type: 'SELECT_PROJECT',
    payload: { id }
  }
}

class Project extends Component {
  render(){
    return (
      <Card onClick={() => this.props.selectProject(this.props.project.id)}>
        <CardTitle>
          {this.props.project.projectName}
        </CardTitle>
      </Card>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectProject }, dispatch)
}

export default connect(null, mapDispatchToProps)(Project);
