import React, {Component} from 'react';
import Pixel from './Pixel';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { mouseDownAction, mouseUpAction } from '../actions/index';
import { saveProject } from '../actions/socketActions';

class Grid extends Component {
  componentWillUnmount(){
    this.props.saveProject();
  }
  render(){
    let xCoord = this.props.x;
    let gridWidth = xCoord * this.props.pixelSize;
    let leftMargin = (800 - gridWidth)/2;
    let newStyle = {};
    newStyle.marginTop = this.props.vertMargins + 'px';
    newStyle.marginBottom = this.props.vertMargins + 'px';
    newStyle.marginLeft = leftMargin + 'px';
    newStyle.flexWrap = 'wrap';
    newStyle.width = gridWidth + 'px';
    newStyle.flex = '1';

    return (
      <div id="canvas">
        <div style={ newStyle } onMouseDown={() => this.props.mouseDownAction()} onMouseUp={() => this.props.mouseUpAction()} >
            {this.props.grid.map((row, y) => {
              return row.map((pixel, x) => <Pixel
                x={x} y={y} key={x.toString() + y.toString()}
                color={pixel} pixelSize={this.props.pixelSize} />);
            })}
        </div>
      </div>
    );
  }
};

function mapStateToProps(state){
  return {grid: state.gridReducer, currentProject: state.currentProject};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ mouseDownAction, mouseUpAction, saveProject }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
