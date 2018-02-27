import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomePage extends Component {
  render(){
    return (
      
    )
  }
}

function mapStateToProps(state){
  return { user: userName, auth: authReducer }
}

export default connect(mapStateToProps)(HomePage);
