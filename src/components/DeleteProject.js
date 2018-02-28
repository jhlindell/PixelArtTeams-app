import React, { Component } from "react";
import DrawCanvas from './DrawCanvas';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteProject } from '../actions/socketActions';

class DeleteProject extends Component {
  constructor(props){
    super(props);
    this.state={
      pixelSize: 0,
      canvasX: 0,
      canvasY: 0
    }
  }

  componentWillMount(){
    if(this.props.currentProject === 0){
      this.props.history.push('/art');
    }
    this.calculateCanvas();
  }

  calculateCanvas(){
    let x = this.props.grid[0].length;
    let y = this.props.grid.length;
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

  deleteProject(){
    this.props.deleteProject();
    this.props.history.push('/art');
  }

  cancel(){
    this.props.history.push('/art');
  }

  render(){
    let newStyle = {};
    newStyle.display = 'flex';
    newStyle.margin = 'auto';
    newStyle.justifyContent = 'space-between';

    return (
      <div style={newStyle}>
        <DrawCanvas grid={ this.props.grid } pixelSize={this.state.pixelSize} canvasX={this.state.canvasX} canvasY={this.state.canvasY}/>
        <div className="finishControlsElement">
          <div>Delete Project? </div>
          <div className="mb-2">You will not be able to undo this.</div>
          <div>
            <button type="button" className="btn btn-primary" onClick={()=>this.deleteProject()}> Delete </button>
            <button type="button" className="btn btn-secondary" onClick={()=>this.cancel()}> Cancel </button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return { grid: state.gridReducer, currentProject: state.currentProject};
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ deleteProject }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProject);
