import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

function changeShowState() {
  return {
    type: 'CHANGE_PALETTE_SHOW_STATE'
  }
}

class CurrentColor extends Component {
  render() {
    let newStyle = Object.assign({}, styles);
    newStyle.backgroundColor = this.props.activeColor;
    return (
      <div className="colorBox"
        onClick={() => this.props.changeShowState()}
        >
        <div style={newStyle}></div>
        <div className="currentText">Current Color</div>
      </div>
    )
  }
}

function mapStateToProps({ activeColor }) {
  return { activeColor };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeShowState }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentColor);
