import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Button,
  Form,
  FormGroup,
  Col
} from 'reactstrap';
import { signInUser } from '../../actions/index';
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

class Signin extends Component {
  handleFormSubmit(formProps) {
    this.props.signInUser(formProps);
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
            <Field name="password"
              type="password"
              component={renderField}
              label="Password"
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


function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({signInUser}, dispatch);
}

Signin = connect(mapStateToProps, mapDispatchToProps)(Signin);

export default reduxForm({
  form: 'signin'
})(Signin);
