import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  forgotUsername,
  resendVerificationEmail,
  passwordResetEmail
} from '../../actions/socketActions';

class SignInTrouble extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: ''
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  cancel(){
    this.props.history.push('/signin');
  }

  resendEmail(){
    this.props.resendVerificationEmail(this.state.email);
  }

  forgotUsername(){
    this.props.forgotUsername(this.state.email);
  }

  resetPassword(){
    this.props.passwordResetEmail(this.state.email);
  }

  render(){
    const componentStyle = {
      display: 'flex',
      margin: 'auto',
    };

    const cardStyle = {
      display: 'flex',
      padding: '20px',
      textAlign: 'center',
    };

    return (
      <div style={componentStyle}>
        <div className="card" style={cardStyle} onSubmit={this.handleFormSubmit}>
          <h3>Signin Issues</h3>
          <div className="form-group mt-4">
            <input name="email" type="text"
              onChange={(e) => {this.handleInputChange(e)}}
              placeholder="Email" value={this.state.email} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={()=> this.resendEmail()}>
            Resend Verification Email
          </button>
          <button type="submit" className="btn btn-primary mt-2" onClick={()=> this.forgotUsername()}>
            Forgot Username
          </button>
          <button type="submit" className="btn btn-primary mt-2" onClick={()=> this.resetPassword()}>
            Reset Password
          </button>
          <button type="button" className="btn btn-secondary mt-2"
            onClick={()=> this.cancel()}>
            Cancel
          </button>
        </div>
      </div>
    )
  }

}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ forgotUsername, resendVerificationEmail, passwordResetEmail }, dispatch);
}

export default connect(null, mapDispatchToProps)(SignInTrouble);
