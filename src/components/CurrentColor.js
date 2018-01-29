import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePaletteShowState } from '../actions/index';

const styles = {
  display: 'flex',
  alignItems: 'center',
  width: '50px',
  height: '50px',
  borderBottom: '1px solid',
  borderRight: '1px solid',
  margin: 'auto',
  backgroundColor: 'white',
};

class CurrentColor extends Component {
  render() {
    let newStyle = Object.assign({}, styles);
    newStyle.backgroundColor = this.props.activeColor;

    return (
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
        onClick={()=>this.props.changePaletteShowState()}
      >
        <div
          style={newStyle}
        >
          <span style={{fontSize: 'small',}}>
            {this.props.activeColor.replace('#','')}
          </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ activeColor }) {
  return { activeColor };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({changePaletteShowState}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, null)(CurrentColor);
