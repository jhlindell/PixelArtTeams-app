import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const styles = {
  width: '20px',
  height: '20px',
  float: 'left',
  boxSizing: 'borderBox',
  borderStyle: 'solid',
  borderColor: 'black',
  borderWidth: '1px',
};

function pixelClick(x, y, color) {
  return {
    type: 'PIXEL_CLICK',
    payload: { x, y, color },
  }
}

class Pixel extends Component {

  render(){
    const { x, y, color, activeColor } = this.props;

    let newStyle = Object.assign({}, styles)
    newStyle.backgroundColor = color;

    return (
      <div style={newStyle} onClick={() => this.props.pixelClick(x, y, activeColor)}>

      </div>
    )
  }
}

function mapStateToProps({ activeColor }) {
  return { activeColor };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ pixelClick }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Pixel);
