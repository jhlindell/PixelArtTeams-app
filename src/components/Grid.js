import React, {Component} from 'react';
import Pixel from './Pixel';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { mouseDownAction, mouseUpAction } from '../actions/index';

class Grid extends Component {
  render(){
    let xCoord = this.props.x;
    let gridWidth = xCoord * this.props.pixelSize;
    let newStyle = {};
    newStyle.paddingTop = '20px';
    newStyle.flexWrap = 'wrap';
    newStyle.width = gridWidth + 'px';
    newStyle.margin = 'auto';
    // newStyle.alignItems = 'center';

    return (
      <div className="row grid">
        <div className="col col-md-12">
          <div style={ newStyle } onMouseDown={() => this.props.mouseDownAction()} onMouseUp={() => this.props.mouseUpAction()} >
              {this.props.grid.map((row, y) => {
                return row.map((pixel, x) => <Pixel
                  x={x} y={y} key={x.toString() + y.toString()}
                  color={pixel} pixelSize={this.props.pixelSize} />);
              })}
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state){
  return {grid: state.gridReducer, currentProject: state.currentProject};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ mouseDownAction, mouseUpAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
