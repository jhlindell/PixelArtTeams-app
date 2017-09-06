import React, {Component} from 'react';
import { connect } from 'react-redux';

const styles = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  borderStyle: 'solid',
  borderWidth: '1px',
  margin: '5px auto',
  boxSizing: 'border-box',
  backgroundColor: 'white'
}

class CurrentColor extends Component {
  render() {
    let newStyle = Object.assign({}, styles);
    newStyle.backgroundColor = this.props.activeColor;
    return (
      <div className="colorBox">
        <div style={newStyle}></div>
        <div className="currentText">Current Color</div>
      </div>
    )
  }
}

function mapStateToProps({ activeColor }) {
  return { activeColor };
}

export default connect(mapStateToProps, null)(CurrentColor);
