import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
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
  componentWillReceiveProps(nextProps){
    if(nextProps.authenticated){
      this.props.history.push('/art');
    }
  }

  handleFormSubmit(formProps) {
    this.props.signInUser(formProps);
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
        <div className="col-sm-12">
          <form className="signinForm"
            onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <h3>Please Sign In</h3>
            <div className="form-group mt-5">
              <Field name="username"
                type="text"
                component={renderField}
                label="Username"
              />
            </div>
            <div className="form-group">
              <Field name="password"
                type="password"
                component={renderField}
                label="Password"
              />
            </div>
            {this.renderAlert()}
            <button type="submit"
              disabled={submitting}>
              Submit
            </button>
            <button type="button"
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


function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, errorMessage: state.auth.error };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({signInUser}, dispatch);
}

Signin = connect(mapStateToProps, mapDispatchToProps)(Signin);

export default reduxForm({
  form: 'signin'
})(Signin);
