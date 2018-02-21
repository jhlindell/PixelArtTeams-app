import React, {Component} from 'react';
import DrawCanvas from './DrawCanvas';

class GalleryPiece extends Component{
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
      canvasX = 240;
      canvasY = 240 / ratio;
    }
    if(y > x){
      let ratio = y/x;
      canvasY = 240;
      canvasX = 240 / ratio;
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
      <div className="col col-md-4">
        <div className="card artCard" onClick={()=> this.props.history.push(`project/${this.props.art.project_id}`)}>
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
};

export default GalleryPiece;
