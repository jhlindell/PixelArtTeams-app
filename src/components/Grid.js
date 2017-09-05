import React from 'react';
import Pixel from './Pixel';
import {connect} from 'react-redux';

const Grid = (props) =>  {

  return (
    <div>
      <div id="canvas"
        onMouseDown={() => props.onMouseDown()}
        onMouseUp={() => props.onMouseUp()}>
        {props.grid.map((row, y) => {
          return row.map((pixel, x) => <Pixel
            x={x} y={y}
            color={pixel}
            sendPixel={props.sendPixel}
            onMouseOver={props.onMouseOver}
          />)
        })}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {grid: state.gridReducer}
}

export default connect(mapStateToProps, null)(Grid);
