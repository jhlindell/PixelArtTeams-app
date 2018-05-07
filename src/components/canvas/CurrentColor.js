import React, {Component} from 'react';
import { connect } from 'react-redux';

const styles = {
  display: 'flex',
  alignItems: 'center',
  width: '40px',
  height: '40px',
  margin: 'auto',
  backgroundColor: 'white',
  paddingBottom: '20px'
};

class CurrentColor extends Component {
  render() {
    const colorStyle = {...styles};
    colorStyle.backgroundColor = this.props.activeColor;

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
      >
        <div style={colorStyle} >
          <span style={{fontSize: 'small'}}>
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

export default connect(mapStateToProps,null)(CurrentColor);
