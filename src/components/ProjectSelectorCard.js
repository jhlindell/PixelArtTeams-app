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
    let artCard = {};
    artCard.backgroundColor = 'gray';

    let cardBlock = {};
    cardBlock.display = 'flex';
    cardBlock.flexWrap = 'wrap';
    cardBlock.marginLeft = 'auto';
    cardBlock.marginRight = 'auto';

    return (
      // <div className="col col-sm-3">
        <div className="card mb-3 mr-2 ml-2" style={artCard} onClick={() => this.props.selectProject(this.props.art.project_id)}>
          <div className="card-header">
            <h4>
              {this.props.art.project_name}
            </h4>
          </div>
          <div className="card-block" style={cardBlock} >
            <DrawCanvas grid={this.props.art.grid} canvasX={this.state.canvasX} canvasY={this.state.canvasY} pixelSize={this.state.pixelSize} />
          </div>
        </div>
      // </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectProject }, dispatch);
}

export default connect(null, mapDispatchToProps)(ProjectSelectorCard);
