import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const styles = {
  // marginTop: '5px',
  width: '50px',
  // padding: '2%',
  height: '50px',
  // borderRadius: '50%',
  // float: 'left',
  borderBottom: 'solid 1px',
  borderRight: 'solid 1px',
  // borderStyle: 'solid',
  // marginLeft: '1px',
};

function updateColor(nextColor) {
  return {
    type: 'UPDATE_COLOR',
    payload: {nextColor},
  };
}

class PaintSwatch extends Component {
  render(){
    styles.backgroundColor = this.props.color;
    return (
      <div
        style={styles}
        className="paint"
        onClick={() => this.props.updateColor(this.props.color)}
      >
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateColor }, dispatch);
}

export default connect(null, mapDispatchToProps)(PaintSwatch);
