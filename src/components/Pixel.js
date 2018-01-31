import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendPixel, mouseOverAction } from '../actions/socketActions';

const styles = {
  width: '20px',
  height: '20px',
  float: 'left',
  boxSizing: 'borderBox',
  borderStyle: 'solid',
  borderColor: '#d5d5d5',
  borderWidth: '1px',
};

class Pixel extends Component {

  render(){
    const { x, y, color} = this.props;
    let newStyle = Object.assign({}, styles);
    newStyle.backgroundColor = color;

    return (
      <div
        style={newStyle}
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
