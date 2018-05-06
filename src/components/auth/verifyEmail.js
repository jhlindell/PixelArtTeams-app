import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearVerificationMessage } from '../../actions/index';
import { checkUserHash } from '../../actions/socketActions';

class VerifyEmail extends Component {
  componentWillMount(){
    this.props.checkUserHash(this.props.match.params.hash);
  }

  componentWillUnmount(){
    this.props.clearVerificationMessage();
  }

  render(){
    const componentStyle = {
      display: 'flex',
      margin: 'auto',
      textAlign: 'center',
    };

    const linkStyle = {
      fontSize: '22px',
    };

    return (
      <div style={componentStyle}>
        {(!this.props.verificationMessage) && <div className="card">
          <h3>Checking Verification</h3>
        </div>}
        {(this.props.verificationMessage && this.props.verificationMessage === 'User Verified') && <div className="card">
          <div className="card-header">
            <h3>Congrats! You've been verified.</h3>
          </div>
          <div className="card-block">
            <Link style={linkStyle} to='/signin'>Sign In</Link>
          </div>
        </div>}
        {(this.props.verificationMessage && this.props.verificationMessage === 'User Verification Failed') && <div className="card">
          <h3>There was a problem with verification please click below to try again</h3>
          <p><Link to='/signin'>Sign In</Link></p>
        </div>}
      </div>
    )
  }
}

function mapStateToProps(state){
  return { verificationMessage: state.verificationMessageReducer }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ checkUserHash, clearVerificationMessage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
