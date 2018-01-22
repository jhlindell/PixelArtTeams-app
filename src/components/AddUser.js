import React, { Component } from "react";
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Form,
  FormGroup,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

const renderField = ({ input, label, type, meta: { touched, error}}) => (
<div>
  <label>{label}</label>
  <div>
    <input {...input} placeholder={label} type={type} />
    {touched &&
      (error && <span><br/>{error}</span>)}
  </div>
</div>
);

class AddUser extends Component {

  constructor(props) {
    super(props);
    this.renderButton = this.renderButton.bind(this);
    this.toggleNewUser = this.toggleNewUser.bind(this);
    this.state = {
      newUserToggle: false,
    };
  }

  componentWillReceiveProps(nextProps){
    this.renderButton();
  }

  toggleNewUser() {
    this.setState({
      newUserToggle: !this.state.newUserToggle
    });
  }

  handleFormSubmit(formProps) {
    this.setState({newUserToggle: false});
    this.props.addNewUser(formProps.user_name, formProps.email);
  }

  renderButton(){
    return (
      <button
        className="newProjectSelector"
        disabled={!this.props.authenticated}
        onClick={() => this.toggleNewUser()}>
        Add New User
      </button>
    )
  }

  render(){
    const { handleSubmit, submitting} = this.props;

    return (
      <div>

        {this.renderButton()}
        <Modal
          isOpen={this.state.newUserToggle}
          toggle={()=>this.toggleNewUser()}>
          <ModalHeader toggle={()=>this.toggleNewUser()}>
            New Project
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <FormGroup row>
                <Col sm={12}>
                  <Field name="user_name"
                    type="text"
                    component={renderField}
                    label="User Name" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={12}>
                  <Field name="email"
                    type="text"
                    component={renderField}
                    label="User Email" />
                </Col>
              </FormGroup>
              <Button
                color="primary"
                type="submit"
                disabled={submitting}>
                Submit
              </Button>
              {' '}
              <Button
                color="secondary"
                onClick={()=>this.toggleNewUser()}>
                Cancel
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const validate = formProps => {
  const errors = {};

  if(!formProps.user_name && !formProps.email) {
    errors.user_name = 'Please enter either a username or user email';
  }

  return errors;
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

AddUser = connect(mapStateToProps, null)(AddUser);

export default reduxForm({
  form: 'AddUser',
  validate
})(AddUser);
