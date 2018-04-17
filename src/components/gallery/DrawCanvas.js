import React, { Component } from 'react';
import { Stage, Layer} from 'react-konva';
import DrawArt from './DrawArt';

class DrawCanvas extends Component {
  render(){
    let newStyle = {};
    newStyle.height = this.props.canvasY + 'px';
    newStyle.display = 'flex';
    newStyle.margin = 'auto';

    return (
      <Stage width={this.props.canvasX} height={this.props.canvasY} style={newStyle}>
        <Layer>
          <DrawArt grid={this.props.grid}
            pixelSize={this.props.pixelSize} canvasX={this.props.canvasX} canvasY={this.props.canvasY}/>
        </Layer>
      </Stage>
    )
  }
}

export default DrawCanvas;
