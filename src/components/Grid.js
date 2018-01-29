import React, {Component} from 'react';
import Pixel from './Pixel';
import {connect} from 'react-redux';
import {Row, Col} from 'reactstrap';
import Project from './Project';
import {bindActionCreators} from 'redux';
import { mouseDownAction, mouseUpAction } from '../actions/index';

class Grid extends Component {
  componentWillMount(){
    this.props.getProjects();
  }
  render(){
    let xCoord = this.props.grid[0].length;
    let gridWidth = xCoord * 20;
    let newStyle = {};
    newStyle.paddingTop = '20px';
    newStyle.display = 'flex';
    newStyle.flexWrap = 'wrap';
    newStyle.width = gridWidth + 'px';
    newStyle.margin = 'auto';

    if(this.props.auth){
      return (
        <Row style={{height: '90vh'}}>
          <Col
            md={{
              size: 10,
              offset: 1
            }}
          >
            {
              this.props.currentProject === 0
              ?
              <div style={{padding: '5%'}}>
                <h4 className="projectCardText">Select a project</h4>
                {
                this.props.projects.map(project => <Project
                  key={project.project_id}
                  project={project} />)
                }
              </div>
              :
              <div
                style={newStyle}
                onMouseDown={() => this.props.mouseDownAction()}
                onMouseUp={() => this.props.mouseUpAction()}
              >
                {this.props.grid.map((row, y) => {
                  return row.map((pixel, x) => <Pixel
                    x={x} y={y}
                    color={pixel} />);
                })}
              </div>
            }
          </Col>
        </Row>
      );
    } else {
      return (
        <Row>
          <Col
            md={{
              size: 12,
            }}>
            <h4 className="projectCardText mt-4">Please Log In</h4>
          </Col>
        </Row>
      );
    }
  }
};


function mapStateToProps(state) {
  return {
    grid: state.gridReducer,
    projects: state.projectsReducer,
    currentProject: state.currentProject,
    auth: state.auth.authenticated,
    token: state.auth.token
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ mouseDownAction, mouseUpAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
