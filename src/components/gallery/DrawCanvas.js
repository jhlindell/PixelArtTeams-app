import React, { Component } from 'react';
import { Stage, Layer} from 'react-konva';
import DrawArt from './DrawArt';

class DrawCanvas extends Component {
  render(){
    let componentStyle = {
      height: this.props.canvasY + 'px',
      display: 'flex',
      margin: 'auto',
    };

    return (
      <Stage width={this.props.canvasX} height={this.props.canvasY} style={componentStyle}>
        <Layer>
          <DrawArt grid={this.props.grid}
            pixelSize={this.props.pixelSize} canvasX={this.props.canvasX} canvasY={this.props.canvasY}/>
        </Layer>
      </Stage>
    )
  }
}

export default DrawCanvas;
