import React, {Component} from 'react';
import Pixel from './Pixel';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { mouseDownAction, mouseUpAction } from '../actions/index';

class Grid extends Component {
  render(){
    let xCoord = this.props.grid[0].length;
    let gridWidth = xCoord * 20;
    let newStyle = {};
    newStyle.paddingTop = '20px';
    newStyle.display = 'flex';
    newStyle.flexWrap = 'wrap';
    newStyle.width = gridWidth + 'px';
    newStyle.margin = 'auto';

    return (
      <div className="row">
        <div className="col col-md-12">
          <div style={newStyle}
              onMouseDown={() => this.props.mouseDownAction()}
              onMouseUp={() => this.props.mouseUpAction()} >
              {this.props.grid.map((row, y) => {
                return row.map((pixel, x) => <Pixel
                  x={x} y={y}
                  color={pixel} />);
              })}
            </div>
        </div>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ mouseDownAction, mouseUpAction }, dispatch);
}

export default connect(null, mapDispatchToProps)(Grid);
