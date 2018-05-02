import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateColor } from '../../actions/index'

const styles = {
  width: '40px',
  height: '40px'
};

class PaintSwatch extends Component {
  render(){
    const newStyle = { ...styles, backgroundColor: this.props.color };
    return (
      <div style={newStyle}
        onClick={() => this.props.updateColor(this.props.color)} >
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateColor }, dispatch);
}

export default connect(null, mapDispatchToProps)(PaintSwatch);
