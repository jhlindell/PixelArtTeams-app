import React, { Component } from 'react';
import Menu from './Menu';
import NavBar from './NavBar';
import Grid from './Grid';
import Palette from './Palette';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { getProjects } from '../actions/socketActions';

class MainCanvas extends Component {
  constructor(props){
    super(props);
    this.state = {
      pixelSize: 0,
      canvasX: 0,
      canvasY: 0,
      x: 0,
      y: 0
    }
  }

  componentWillMount(){
    this.props.getProjects();
    if(this.props.currentProject !== 0){
      this.calculateCanvas(this.props.currentProject);
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.currentProject !== this.props.currentProject){
      this.calculateCanvas(nextProps.currentProject);
    }
  }

  getProjectIndex(id){
    let projects = this.props.projects;
    let index;
    for(let i = 0; i < projects.length; i++){
      if(projects[i].project_id === id){
        index = i;
      }
    }
    return index;
  }

  calculateCanvas(id){
    let index = this.getProjectIndex(id);
    let x = this.props.projects[index].grid[0].length;
    let y = this.props.projects[index].grid.length;
    let windowX = (window.innerWidth * 0.7).toFixed(0);
    let windowY = (window.innerHeight * 0.7).toFixed(0);
    let pixelSizeX = (windowX/x).toFixed(0);
    let pixelSizeY = (windowY/y).toFixed(0);
    let pixelSize = 0;
    if(pixelSizeX < pixelSizeY){
      pixelSize = pixelSizeX;
    } else {
      pixelSize = pixelSizeY;
    }
    if(pixelSize > 20){
      pixelSize = 20;
    }
    let offsetX = ((windowX -(x * pixelSize))/2).toFixed(0);
    let canvasX = ((windowX -( offsetX * 2 ))).toFixed(0);
    let canvasY = windowY;

    this.setState({pixelSize: pixelSize, canvasX: canvasX, canvasY: canvasY, x: x, y: y});
  }

  render(){
    return (
      <div>
        <NavBar />
        <Menu />
        <Palette />
        {this.props.currentProject !== 0 && <Grid grid={this.props.grid} pixelSize={this.state.pixelSize} canvasX={this.state.canvasX} canvasY={this.state.canvasY} x={this.state.x} y={this.state.y}/>}
      </div>
    )
  }
}

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
  return bindActionCreators({ getProjects}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainCanvas);
