import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectProject } from '../actions/index';
import DrawCanvas from './DrawCanvas';
const canvasSize = 120;

class ProjectSelectorCard extends Component {

  constructor(props){
    super(props);
    this.state = {
      pixelSize: 0,
      canvasX: 0,
      canvasY: 0
    }
  }

  componentWillMount(){
    this.calculateParams(this.props.art.grid);
  }

  calculateParams(grid){
    let x = grid[0].length;
    let y = grid.length;
    let canvasX = 0;
    let canvasY = 0;
    if(x >= y){
      let ratio = x/y;
      canvasX = canvasSize;
      canvasY = canvasSize / ratio;
    }
    if(y > x){
      let ratio = y/x;
      canvasY = canvasSize;
      canvasX = canvasSize / ratio;
    }
    let pixelSizeX = (canvasX/x).toFixed(0);
    let pixelSizeY = (canvasY/y).toFixed(0);
    let pixelSize;
    if(pixelSizeX > pixelSizeY){
      pixelSize = pixelSizeY;
    } else {
      pixelSize = pixelSizeX;
    }
    this.setState({pixelSize: pixelSize, canvasX: canvasX, canvasY: canvasY});
  }

  render(){
    let newStyle = {};
    newStyle.display = 'flex';
    newStyle.flexWrap = 'wrap';
    newStyle.marginLeft = 'auto';
    newStyle.marginRight = 'auto';
    return (
      <div className="col col-sm-3">
        <div className="card artCard" onClick={() => this.props.selectProject(this.props.art.project_id)}>
          <div className="card-header">
            <div className="artTitleText cardtitle" >
              {this.props.art.project_name}
            </div>
          </div>
          <div className="card-block" style={newStyle} >
            <DrawCanvas grid={this.props.art.grid} canvasX={this.state.canvasX} canvasY={this.state.canvasY} pixelSize={this.state.pixelSize} />
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectProject }, dispatch);
}

export default connect(null, mapDispatchToProps)(ProjectSelectorCard);
