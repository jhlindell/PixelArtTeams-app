import React, { Component } from 'react';
import Grid from './Grid';
import Palette from './Palette';
import ProjectSelector from './ProjectSelector';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProjects, saveProject, sendFinishedProject } from '../actions/socketActions';
import moment from 'moment';
// import Background from '../watercolor-3173964_1920.jpg';

class MainCanvas extends Component {
  constructor(props){
    super(props);
    this.state = {
      pixelSize: 0,
      canvasX: 0,
      canvasY: 0,
      x: 0,
      y: 0,
      finishTime: ''
    }
  }

  componentWillMount(){
    this.props.getProjects();
    if(this.props.currentProject !== 0){
      this.calculateCanvas(this.props.currentProject);
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.currentProject === 0 && this.props.currentProject !== nextProps.currentProject){
      this.props.saveProject();
      this.props.getProjects();
    }
    if((nextProps.currentProject !== 0) && (nextProps.currentProject !== this.props.currentProject)){
      this.calculateCanvas(nextProps.currentProject);
    }

    if(nextProps.projects !== this.props.projects){
      for(let i = 0; i < nextProps.projects.length; i++){
        if(nextProps.projects[i].finished_at){
          let now = new Date();
          let nowString = moment.utc(now).format();
          if(moment(nowString).isSameOrAfter(nextProps.projects[i].finished_at)){
            this.props.sendFinishedProject(nextProps.projects[i].project_id);
          }
        }
      }
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
    let finishTime = this.props.projects[index].finished_at;
    let x = this.props.projects[index].grid[0].length;
    let y = this.props.projects[index].grid.length;
    let windowX = 800;
    let windowY = 560;
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
    this.setState({ pixelSize: pixelSize, canvasX: canvasX, canvasY: canvasY, x: x, y: y, finishTime: finishTime });
  }

  renderComp(){
    if(this.props.currentProject === 0){
      return <ProjectSelector history={this.props.history}/>
    }
    else {
      const canvasYSize = 560;
      const canvasXSize = 800;
      const canvasStyle = {};
      let vertMargins = 0;
      let gridHeight = this.state.y * this.state.pixelSize;
      vertMargins = (520 - gridHeight)/2;

      canvasStyle.backgroundColor = 'white';
      canvasStyle.height = canvasYSize + 'px';
      canvasStyle.width = canvasXSize + 'px';
      canvasStyle.display = 'flex';
      canvasStyle.flexDirection = 'column';

      return (
        <div style={canvasStyle} id="mainCanvas2">
          <Grid grid={this.props.grid} pixelSize={this.state.pixelSize} canvasX={this.state.canvasX} canvasY={this.state.canvasY} x={this.state.x} y={this.state.y} vertMargins={vertMargins} finishTime={this.state.finishTime} />
          <Palette canvasWidth={canvasXSize}
            topMargin={vertMargins}/>
        </div>
      );
    }
  };

  render(){
    const newStyle = {};
    newStyle.display = 'flex';
    newStyle.justifyContent = 'center';
    newStyle.alignItems = 'center';
    // newStyle.backgroundImage = `url(${Background})`;
    newStyle.height = '100%';
    newStyle.margin = 'auto';

    return (
      <div style={newStyle} id="MainCanvas1">
        {this.renderComp()}
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
  return bindActionCreators({ getProjects, saveProject, sendFinishedProject }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainCanvas);
