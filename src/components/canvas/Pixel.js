import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendPixel, mouseOverAction } from '../../actions/socketActions';

const styles = {
  float: 'left',
  boxSizing: 'borderBox',
  borderStyle: 'solid',
  borderColor: 'gray',
  borderWidth: '1px',
};

class Pixel extends Component {
  render(){
    const { x, y, color} = this.props;
    let pixelStyle = {
      ...styles,
      height: this.props.pixelSize + 'px',
      width: this.props.pixelSize + 'px',
      backgroundColor: color
    };

    return (
      <div
        style={pixelStyle}
        onMouseDown={() => this.props.sendPixel(x, y)}
        onMouseOver={() => this.props.mouseOverAction(x, y)}
      >
      </div>
    );
  }
}

function mapDispatchToProps( dispatch ){
  return bindActionCreators( { sendPixel, mouseOverAction }, dispatch);
}

export default connect(null, mapDispatchToProps)(Pixel);
