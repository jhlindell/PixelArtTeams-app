import React from "react";
import { Rect } from 'react-konva';

const DrawArt = (props) => {
  let grid = props.grid;
  let offset = props.canvasY/props.grid.length;

  return (
    grid.map((row, y) => {
      return row.map((color, x) => <Rect
        x={x*offset}
        y={y*offset}
        key={x.toString() + y.toString()}
        width={props.pixelSize}
        height={props.pixelSize}
        fill={color}
        />
      );
    }
  ))
}

export default DrawArt;
