import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stage, Layer, Text } from 'react-konva';
import DrawArt from './DrawArt';

class DrawCanvas extends Component {
  render(){
    return (
      <Stage width={400} height={400}>
        <Layer>
          <DrawArt art={this.props.projects[0]}/>
        </Layer>
      </Stage>
    )
  }
}

function mapStateToProps(state){
  return { projects: state.projectsReducer }
}

export default connect(mapStateToProps,null)(DrawCanvas);
