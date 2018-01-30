import React, {Component} from 'react';
import Pixel from './Pixel';
import {connect} from 'react-redux';
import Project from './Project';
import {bindActionCreators} from 'redux';
import { mouseDownAction, mouseUpAction } from '../actions/index';
import { getProjects } from '../actions/socketActions';

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
        <div className="row">
          <div className="col col-md-12">
            {
              this.props.currentProject === 0
              ?
              <div>
                <h4 className="projectCardText mt-4">Select a project</h4>
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
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col col-md-12">
            <h4 className="projectCardText mt-4">Please Log In</h4>
          </div>
        </div>
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
  return bindActionCreators({ mouseDownAction, mouseUpAction, getProjects}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
