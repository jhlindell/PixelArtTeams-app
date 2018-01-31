import React from "react";

import { Rect } from 'react-konva';

const DrawArt = (props) => {
  let grid = this.props.art.grid;
  let xoffset = 400/this.props.art.x;
  let yoffset = 400/this.props.art.y;

  return (
    grid.map((row, y) => {
      return row.map((color, x) => <Rect
        x={x*xoffset}
        y={y*yoffset}
        width={20}
        height={20}
        fill={color}
        />
      );
    }
  ))
}

export default DrawArt;
