import React, { Component } from 'react';
import { signUpUser, clearAuthError } from '../../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Signup extends Component {
  constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      errors: {
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
      }
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let valid = this.validate();
    if(valid){
      let modProps = {};
      modProps.username = this.state.username.toLowerCase();
      modProps.email = this.state.email.toLowerCase();
      modProps.password = this.state.password;
      modProps.passwordConfirm = this.state.passwordConfirm;
      this.props.signUpUser(modProps);
      this.props.history.push('/signin');
    }
  }

  componentWillMount(){
    this.props.clearAuthError();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.authenticated){
      this.props.history.push('/art');
    }
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  clear(){
    this.setState({
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      errors: {
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
      }
    });
  }

  render(){
    const newStyle = {};
    newStyle.display = 'flex';
    newStyle.margin = 'auto';
    newStyle.textAlign = 'center';

    const cardStyle = {};
    cardStyle.width = '250px';
    cardStyle.display = 'flex';
    cardStyle.textAlign = 'center';

    const bodyStyle = {};
    bodyStyle.display = 'flex';
    bodyStyle.flexDirection = 'column';
    bodyStyle.justifyContent = 'center';

    return (
      <div style={newStyle}>
        <div className="card" style={cardStyle} >
          <div className="card-header">
            <h3>Sign Up</h3>
          </div>
          <div className='card-block'>
            <form onSubmit={this.handleFormSubmit} style={bodyStyle}>
              <div className="form-group mt-2">
                <input name="username" type="text"
                  onChange={(e) => {this.handleInputChange(e)}}
                  value={this.state.username} placeholder="Username" />
                  {this.state.errors.username && <div>{this.state.errors.username}</div>}
              </div>
              <div className="form-group">
                <input name="email" type="email"
                  onChange={(e) => {this.handleInputChange(e)}}
                  value={this.state.email} placeholder="Email" />
                  {this.state.errors.email && <div>{this.state.errors.email}</div>}
              </div>
              <div className="form-group">
                <input name="password" type="password"
                  onChange={(e) => {this.handleInputChange(e)}}
                  value={this.state.password} placeholder="Password" />
                  {this.state.errors.password && <div>{this.state.errors.password}</div>}
              </div>
              <div className="form-group mb-4">
                <input name="passwordConfirm" type="password"
                  onChange={(e) => {this.handleInputChange(e)}}
                  value={this.state.passwordConfirm} placeholder="Confirm Password"/>
                  {this.state.errors.passwordConfirm && <div>{this.state.errors.passwordConfirm}</div>}
              </div>
              {this.renderAlert()}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button type="button" className="btn btn-secondary"
                onClick={()=> this.props.history.push('/gallery')}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  validate() {
    this.clearErrors();
    const errors = {};
    let isValid = true;

    if(!this.state.username){
      errors.username = 'Please enter a username';
      isValid = false;
    }

    if(!this.state.email) {
      errors.email = 'Please enter an email';
      isValid = false;
    }

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

    this.setState({errors: errors});
    return isValid;
  }

  clearErrors(){
    let errors = {};
    errors.name = '';
    errors.x = '';
    errors.y = '';
    this.setState({errors: errors });
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, authenticated: state.auth.authenticated };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ signUpUser, clearAuthError }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
