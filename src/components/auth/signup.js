import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signUpUser } from '../../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const renderField = ({ input, label, type, meta: { touched, error }}) => (
<div>
  <label>{label}</label>
  <div>
    <input {...input} placeholder={label} type={type} />
    {touched &&
      (error && <span>{error}</span>)}
  </div>
</div>
);

class Signup extends Component {
  handleFormSubmit(formProps) {
    let modProps = {};
    modProps.username = formProps.username.toLowerCase();
    modProps.email = formProps.email.toLowerCase();
    modProps.password = formProps.password;
    modProps.passwordConfirm = formProps.passwordConfirm;
    this.props.signUpUser(modProps);
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

  render(){
    const { handleSubmit, pristine, reset, submitting} = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <form className="signupForm"
            onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <h3>Sign Up</h3>
            <div className="form-group mt-5">
              <Field name="username"
                type="text"
                component={renderField}
                label="Username"
              />
            </div>
            <div className="form-group">
              <Field name="email"
                type="email"
                component={renderField}
                label="Email"
              />
            </div>
            <div className="form-group">
              <Field name="password"
                type="password"
                component={renderField}
                label="Password"
              />
            </div>
            <div className="form-group">
              <Field name="passwordConfirm"
                type="password"
                component={renderField}
                label="Confirm Password"
              />
            </div>
            {this.renderAlert()}
            <button type="submit" className="btn btn-primary"
              disabled={submitting}>
              Submit
            </button>
            <button type="button" className="btn btn-secondary"
              disabled={pristine || submitting}
              onClick={reset}>
              Clear
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const validate = formProps => {
  const errors = {};

  if(!formProps.username){
    errors.username = 'Please enter a username';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, authenticated: state.auth.authenticated };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ signUpUser }, dispatch);
}

Signup = connect(mapStateToProps, mapDispatchToProps)(Signup);

export default reduxForm({
  form: 'signup',
  validate
})(Signup);
