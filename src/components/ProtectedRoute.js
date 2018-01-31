import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class ProtectedRoute extends Component{
  render() {
    if(this.isAuthed()){
      return (
        <div>
          {this.props.children}
        </div>
      );
    } else {
      return <Redirect to='/signin' />;
    }
  }
  isAuthed() {
    return this.props.authenticated;
  };
}


function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
};

export default connect(mapStateToProps, null)(ProtectedRoute)
