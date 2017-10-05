import React, {Component} from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { bindActionCreators } from 'redux';
=======
import {bindActionCreators} from 'redux';
>>>>>>> 42fa0341d4b89ed981a348ac3e32310b00af31a3

const styles = {
  display: 'flex',
  alignItems: 'center',
  width: '50px',
  height: '50px',
  // borderRadius: '50%',
  // borderStyle: 'solid',
  borderBottom: '1px solid',
  borderRight: '1px solid',
  margin: 'auto',
  // marginTop: '5px',
  // boxSizing: 'border-box',
  backgroundColor: 'white',
};

function changeShowState() {
  return {
    type: 'CHANGE_PALETTE_SHOW_STATE'
  };
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
<<<<<<< HEAD
      <div className="colorBox"
        onClick={() => this.props.changeShowState()}
        >
        <div style={newStyle}></div>
        <div className="currentText">Current Color</div>
=======
      <div
        className="colorBox"
        style={{
          position: 'absolute',
          zIndex: '1',
          background: 'lightgray',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={()=>this.props.changeShowState()}
      >
        <div
          style={newStyle}
        >
          <span style={{fontSize: 'small',}}>
            {this.props.activeColor.replace(/\#/,'')}
          </span>
        </div>
>>>>>>> 42fa0341d4b89ed981a348ac3e32310b00af31a3
      </div>
    );
  }
}

function mapStateToProps({ activeColor }) {
  return { activeColor };
}

function mapDispatchToProps(dispatch) {
<<<<<<< HEAD
  return bindActionCreators({ changeShowState }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentColor);
=======
  return bindActionCreators({changeShowState}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, null)(CurrentColor);
>>>>>>> 42fa0341d4b89ed981a348ac3e32310b00af31a3
