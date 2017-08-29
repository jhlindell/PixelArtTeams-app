import React, {Component} from 'react';
import Pixel from './Pixel';
import {connect} from 'react-redux';

class Grid extends Component {

  render() {
    return (
      <div>
        <div id="canvas">
          {this.props.grid.map((row, y) => {
            return row.map((pixel, x) => <Pixel x={x} y={y} color={pixel} />)
          })}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {grid: state.gridReducer}
}

export default connect(mapStateToProps,null)(Grid);
