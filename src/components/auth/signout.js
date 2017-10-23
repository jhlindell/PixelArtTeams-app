import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signoutUser } from '../../actions/index';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return <div>Sorry to see you go...</div>;
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ signoutUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(Signout);
