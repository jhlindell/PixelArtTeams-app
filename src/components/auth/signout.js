import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signoutUser } from '../../actions/index';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.authenticated){
      this.props.history.push('/')
    }
  }

  render() {
    return <div>Sorry to see you go...</div>;
  }
}

function mapStateToProps(state){
  return { authenticated: state.auth.authenticated }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ signoutUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signout);
