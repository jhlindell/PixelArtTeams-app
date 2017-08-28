import React, {Component} from 'react';

class Grid extends Component {

  render(){
    return (
      <div id="canvas">
        {this.props.grid.map(pixel => <Pixel />)}
      </div>
    )
  }
}

export default Grid;
