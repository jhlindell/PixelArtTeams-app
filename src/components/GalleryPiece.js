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
    let cardStyle = {};
    cardStyle.backgroundColor = 'gray';
    cardStyle.marginBottom = '10px';

    let cardBlockStyle = {};
    cardBlockStyle.display = 'flex';
    cardBlockStyle.margin = 'auto';

    let footerStyle = {};
    footerStyle.textAlign = 'center';

    return (
      <div className="card" style={cardStyle} onClick={()=> this.props.history.push(`project/${this.props.art.project_id}`)}>
        <div className="card-header">
          <div className="artTitleText" >
            {this.props.art.project_name}
          </div>
        </div>
        <div className="card-block" style={cardBlockStyle} >
          <DrawCanvas grid={this.props.art.grid} canvasX={this.state.canvasX} canvasY={this.state.canvasY} pixelSize={this.state.pixelSize} />
        </div>
        <div className="card-footer" style={footerStyle}>
          Avg. Rating: {this.props.art.rating}
        </div>
      </div>
    );
  }
};

export default GalleryPiece;
