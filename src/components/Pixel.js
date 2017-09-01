import React, {Component} from 'react';
import { connect } from 'react-redux';


const styles = {
  width: '20px',
  height: '20px',
  float: 'left',
  boxSizing: 'borderBox',
  borderStyle: 'solid',
  borderColor: 'black',
  borderWidth: '1px',
};

class Pixel extends Component {

  render(){
    const { x, y, color, activeColor } = this.props;
    let newStyle = Object.assign({}, styles)
    newStyle.backgroundColor = color;

    return (
      <div style={newStyle}
        onClick={() => this.props.sendPixel(x, y, activeColor)}
        onMouseOver={() => this.props.onMouseOver(x, y, activeColor)}>
      </div>
    )
  }
}

function mapStateToProps({ activeColor }) {
  return { activeColor };
}

export default connect(mapStateToProps, null)(Pixel);
