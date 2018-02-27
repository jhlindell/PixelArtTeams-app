import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePaletteShowState } from '../actions/index';

const styles = {
  display: 'flex',
  alignItems: 'center',
  width: '40px',
  height: '40px',
  borderBottom: '1px solid',
  borderRight: '1px solid',
  margin: 'auto',
  backgroundColor: 'white',
  paddingBottom: '20px'
};

class CurrentColor extends Component {
  render() {
    let newStyle = Object.assign({}, styles);
    newStyle.backgroundColor = this.props.activeColor;

    return (
      <span
        style={{
          width: '40px',
          height: '40px',
          zIndex: '1',
          background: 'white',
          float: 'left',
          boxSizing: 'borderBox'
        }}
        onClick={()=>this.props.changePaletteShowState()}
      >
        <div style={newStyle} >
          <span className="currentColorText" style={{fontSize: 'small',}}>
            {this.props.activeColor.replace('#','')}
          </span>
        </div>
      </span>
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
