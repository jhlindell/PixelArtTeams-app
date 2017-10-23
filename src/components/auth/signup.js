import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Button,
  Form,
  FormGroup,
  Col
} from 'reactstrap';
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
    this.props.signUpUser(formProps);
    this.props.history.push('/art');
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
      <div>
        <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <FormGroup>
            <Field name="username"
              type="text"
              component={renderField}
              label="Username"
            />
          </FormGroup>
          <FormGroup>
            <Field name="email"
              type="email"
              component={renderField}
              label="Email"
            />
          </FormGroup>
          <FormGroup>
            <Field name="password"
              type="password"
              component={renderField}
              label="Password"
            />
          </FormGroup>
          <FormGroup>
            <Field name="passwordConfirm"
              type="password"
              component={renderField}
              label="Confirm Password"
            />
          </FormGroup>
          {this.renderAlert()}
          <Button type="submit"
            disabled={submitting}>
            Submit
          </Button>
          <Button type="button"
            disabled={pristine || submitting}
            onClick={reset}>
            Clear
          </Button>
        </Form>
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
  return { errorMessage: state.auth.error };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ signUpUser }, dispatch);
}

Signup = connect(mapStateToProps, mapDispatchToProps)(Signup);

export default reduxForm({
  form: 'signup',
  validate
})(Signup);
