import React, { Component } from 'react';
import { connect } from 'react-redux';
import Background from '../backgrounds/watercolor-3173964_1920.jpg';

var sectionStyle = {
  backgroundImage: `url(${Background})`,
  backgroundSize: 'stretch',
  width: '100%',
  height: '89.5vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

class HomePage extends Component {
  render(){
    return (
      <div style={sectionStyle}>
      </div>
    )
  }
}

function mapStateToProps(state){
  return { user: state.userName, auth: state.authReducer }
}

export default connect(mapStateToProps)(HomePage);
