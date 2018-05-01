import React, { Component } from 'react';
import Grid from './Grid';
import Palette from './Palette';
import ProjectSelector from '../projectControls/ProjectSelector';
import ChatContainer from '../ChatContainer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProjects, saveProject, sendFinishedProject } from '../../actions/socketActions';
import moment from 'moment';

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
          const now = new Date();
          const nowString = moment.utc(now).format();
          if(moment(nowString).isSameOrAfter(nextProps.projects[i].finished_at)){
            this.props.sendFinishedProject(nextProps.projects[i].project_id);
          }
        }
      }
    }
  }

  getProjectIndex(id){
    const projects = this.props.projects;
    let index;
    for(let i = 0; i < projects.length; i++){
      if(projects[i].project_id === id){
        index = i;
      }
    }
    return index;
  }

  calculateCanvas(id){
    const index = this.getProjectIndex(id);
    const finishTime = this.props.projects[index].finished_at;
    const x = this.props.projects[index].grid[0].length;
    const y = this.props.projects[index].grid.length;
    console.log("height: ", window.innerHeight);
    console.log("width: ", window.innerWidth);
    const windowX = 800;
    const windowY = 440;
    const pixelSizeX = (windowX/x).toFixed(0);
    const pixelSizeY = (windowY/y).toFixed(0);
    let pixelSize = 0;
    if(pixelSizeX < pixelSizeY){
      pixelSize = pixelSizeX;
    } else {
      pixelSize = pixelSizeY;
    }
    if(pixelSize > 20){
      pixelSize = 20;
    }
    const offsetX = ((windowX -(x * pixelSize))/2).toFixed(0);
    const canvasX = ((windowX -( offsetX * 2 ))).toFixed(0);
    const canvasY = windowY;
    this.setState({ pixelSize, canvasX, canvasY, x, y, finishTime });
  }

  renderComp(){
    if(this.props.currentProject === 0){
      return <ProjectSelector history={this.props.history}/>
    }
    else {
      const canvasYSize = 560;
      const canvasXSize = 800;
      const chatWidth = 400;

      let vertMargins = 0;
      const gridHeight = this.state.y * this.state.pixelSize;
      vertMargins = (490 - gridHeight)/2;

      const canvasStyle = {
        backgroundColor: 'white',
        height: canvasYSize + 'px',
        width: canvasXSize + 'px',
        display: 'flex',
        flexDirection: 'column',
      };

      const ArtAndChat = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
      };

      return (
        <div style={ArtAndChat}>
          <div style={canvasStyle} id="mainCanvas2">
            <Grid grid={this.props.grid} pixelSize={this.state.pixelSize} canvasX={this.state.canvasX} canvasY={this.state.canvasY} x={this.state.x} y={this.state.y} vertMargins={vertMargins} finishTime={this.state.finishTime} />
            <Palette canvasWidth={canvasXSize}
              topMargin={vertMargins}/>
          </div>
          <ChatContainer height={canvasYSize} width={chatWidth}/>
        </div>
      );
    }
  };

  render(){
    const containerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      margin: 'auto'
    };

    return (
      <div style={containerStyle} id="MainCanvas1">
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
