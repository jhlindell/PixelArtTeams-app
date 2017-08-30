import React, {Component} from 'react';
import {Card,CardText, CardBlock,
  CardTitle, Col, Button} from 'reactstrap';

class Project extends Component {
  render(){
    return (
      <Card>
        <CardTitle>
          {this.props.project.projectName}
        </CardTitle>
      </Card>
    )
  }
}

export default Project;
