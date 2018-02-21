import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSingleProject } from '../actions/socketActions';
import DrawCanvas from './DrawCanvas';
import Collaborators from './Collaborators';

class ShowProject extends Component {
  constructor(props){
    super(props);
    this.state={
      pixelSize: 0,
      canvasX: 0,
      canvasY: 0,
    }
  }

  componentWillMount(){
    let id = this.props.match.params.id;
    this.props.getSingleProject(id);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.project.is_finished === false){
      this.props.history.push('/gallery');
    }
    if(nextProps.project){
      this.calculateCanvas(nextProps.project);
    }
  }

  calculateCanvas(project){
    let x = project.grid[0].length;
    let y = project.grid.length;
    let windowX = (window.innerWidth * 0.6).toFixed(0);
    let windowY = (window.innerHeight * 0.6).toFixed(0);
    let pixelSizeX = (windowX/x).toFixed(0);
    let pixelSizeY = (windowY/y).toFixed(0);
    let pixelSize;
    if(pixelSizeX > pixelSizeY){
      pixelSize = pixelSizeY;
    } else {
      pixelSize = pixelSizeX;
    }
    let offsetX = ((windowX -(x * pixelSize))/2).toFixed(0);
    let canvasX = ((windowX - (offsetX*2))).toFixed(0);
    let canvasY = windowY;

    this.setState({pixelSize: pixelSize, canvasX: canvasX, canvasY: canvasY});
  }

  render(){
    let newStyle = {};
    // newStyle.display = 'flex';
    newStyle.height = window.innerHeight + 'px';
    // newStyle.flexWrap = 'wrap';
    newStyle.backgroundColor = 'lightgray';

    let newStyle2 = {};
    newStyle2.display = 'flex';
    newStyle2.flexWrap = 'wrap';

    return (
      <div className="row" style={newStyle}>
        <div className="col col-md-8" style={newStyle2}>
          {this.props.project && <DrawCanvas grid={ this.props.project.grid } pixelSize={this.state.pixelSize} canvasX={this.state.canvasX} canvasY={this.state.canvasY}/> }
        </div>
        <div className="col col-md-4" style={newStyle2}>
          <div className="showProjectInfo">
            <p className="showProjectHeading">Project Info</p>
            <p className="showProjectItem">Project Originator:</p>
            {this.props.project && <p   className="showProjectItem">  {this.props.project.project_owner}</p>}
            <p className="showProjectItem">Project Collaborators:</p>
            <Collaborators classString={"showProjectItem"} project={this.props.match.params.id}/>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { project: state.galleryShowReducer }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({getSingleProject}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowProject);
