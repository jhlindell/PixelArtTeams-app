import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearVerificationMessage } from '../../actions/index';
import { checkUserHash, sendPasswordReset } from '../../actions/socketActions';

class PasswordReset extends Component {
  constructor(props){
    super(props);
    this.state = {
      password: '',
      passwordConfirm: '',
      errors: {
        password: '',
        passwordConfirm: ''
      }
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleFormSubmit = (event) =>{
    event.preventDefault();
    let valid = this.validate();
    if(valid){
      this.props.sendPasswordReset(this.state.password, this.props.match.params.hash);
      this.props.history.push('/signin');
    }
  }

  componentWillMount(){
    this.props.checkUserHash(this.props.match.params.hash);
  }

  componentWillUnmount(){
    this.props.clearVerificationMessage();
  }

  render(){
    const newStyle = {
      display: 'flex',
      margin: 'auto',
      textAlign: 'center',
    };

    const cardStyle = {
      padding: '20px',
      display: 'flex',
      textAlign: 'center',
    };

    return (
      <div style={newStyle}>
        {(!this.props.verificationMessage) && <div className="card">
          <h3>Checking Password Reset Hash</h3>
        </div>}
        {(this.props.verificationMessage && this.props.verificationMessage === 'User Verified') && <div >
          <form className="card" style={cardStyle} onSubmit={this.handleFormSubmit}>
            <h3>Password Reset:</h3>
            <div className="form-group mt-3">
              <input name="password" type="password"
                onChange={(e) => {this.handleInputChange(e)}}
                value={this.state.password} placeholder="Password" />
                {this.state.errors.password && <div style={{color: 'red'}}>{this.state.errors.password}</div>}
            </div>
            <div className="form-group mb-4">
              <input name="passwordConfirm" type="password"
                onChange={(e) => {this.handleInputChange(e)}}
                value={this.state.passwordConfirm} placeholder="Confirm Password"/>
                {this.state.errors.passwordConfirm && <div>{this.state.errors.passwordConfirm}</div>}
            </div>
            <button className="btn-primary" type="submit">Reset Password</button>
            <button type="button" className="btn btn-secondary"
              onClick={()=> this.props.history.push('/gallery')}>
              Cancel
            </button>
          </form>
        </div>}
        {(this.props.verificationMessage && this.props.verificationMessage === 'User Verification Failed') && <div className="card">
          <h3>There was a problem with the Password Link. Please click below and try again.</h3>
          <p><Link to='/signInTrouble'>Sign In Issues</Link></p>
        </div>}
      </div>
    )
  }

  validate() {
    this.clearErrors();
    const errors = {
      password: '',
      passwordConfirm: '',
    };
    let isValid = true;

    if(!this.state.password) {
      errors.password = 'Please enter a password';
      isValid = false;
    }

    if(!this.state.passwordConfirm) {
      errors.passwordConfirm = 'Please enter a password confirmation';
      isValid = false;
    }

    if(this.state.password !== this.state.passwordConfirm) {
      errors.password = 'Passwords must match';
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  }

  clearErrors(){
    const errors = {
      password: '',
      passwordConfirm: '',
    };
    this.setState({ errors });
  }
}


function mapStateToProps(state){
  return { verificationMessage: state.verificationMessageReducer };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({ checkUserHash, clearVerificationMessage, sendPasswordReset }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
