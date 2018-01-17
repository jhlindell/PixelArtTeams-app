import React, {Component} from 'react';
import Pixel from './Pixel';
import {connect} from 'react-redux';
import {Row, Col} from 'reactstrap';
import Project from './Project';
import NewProject from './NewProject';

class Grid extends Component {
  render(){
    console.log("grid auth: ", this.props.auth)
    console.log("grid token: ", this.props.token)
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

              <NewProject addNewProject={this.props.addNewProject} />
              </div>
              :
              <div
                style={newStyle}
                onMouseDown={() => this.props.onMouseDown()}
                onMouseUp={() => this.props.onMouseUp()}
              >
                {this.props.grid.map((row, y) => {
                  return row.map((pixel, x) => <Pixel
                    x={x} y={y}
                    color={pixel}
                    sendPixel={this.props.sendPixel}
                    onMouseOver={this.props.onMouseOver} />);
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

export default connect(mapStateToProps, null)(Grid);
