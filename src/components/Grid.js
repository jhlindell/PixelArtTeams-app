import React, {Component} from 'react';
import Pixel from './Pixel';
import {connect} from 'react-redux';
import openSocket from 'socket.io-client';
import { bindActionCreators } from 'redux';

function pixelClick(x, y, color) {
  return {
    type: 'PIXEL_CLICK',
    payload: { x, y, color },
  }
}

class Grid extends Component {
  constructor(props) {
    super(props)

    this.sendPixelToSocket = this.sendPixelToSocket.bind(this);
  }

  componentDidMount() {
    this.socket = openSocket('http://localhost:7000');
    this.socket.on('connect', () => {
      this.socket.emit('pixel', 'user connected');
    });
    this.socket.on('pixel', (pixel) => {
      this.props.pixelClick(pixel.x, pixel.y, pixel.color);
    })
  }

  sendPixelToSocket(x, y, color){
    this.socket.emit('pixel', {x: x, y: y, color: color});
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    return (
      <div>
        <div id="canvas">
          {this.props.grid.map((row, y) => {
            return row.map((pixel, x) => <Pixel x={x} y={y} color={pixel} sendPixel={this.sendPixelToSocket}/>)
          })}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {grid: state.gridReducer}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ pixelClick }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
