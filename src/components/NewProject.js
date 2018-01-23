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
      (error && <span>{error}</span>)}
  </div>
</div>
);

class NewProject extends Component {

  constructor(props) {
    super(props);
    this.renderButton = this.renderButton.bind(this);
    this.toggleNewProject = this.toggleNewProject.bind(this);
    this.state = {
      newProjectToggle: false,
    };
  }

  componentWillReceiveProps(nextProps){
    this.renderButton();
  }

  toggleNewProject() {
    this.setState({
      newProjectToggle: !this.state.newProjectToggle
    });
  }

  handleFormSubmit(formProps) {
    this.setState({newProjectToggle: false});
    this.props.addNewProject(formProps.project_name, formProps.x, formProps.y);
  }

  renderButton(){
    return (
      <button
        className="newProjectSelector"
        disabled={!this.props.authenticated}
        onClick={() => this.toggleNewProject()}>
        New Project
      </button>
    )
  }

  render(){
    const { handleSubmit, submitting} = this.props;

    return (
      <div>
        {this.renderButton()}
        <Modal
          isOpen={this.state.newProjectToggle}
          toggle={()=>this.toggleNewProject()}>
          <ModalHeader toggle={()=>this.toggleNewProject()}>
            New Project
          </ModalHeader>

          <ModalBody>
            <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <FormGroup row>
                <Col sm={12}>
                  <Field name="project_name"
                    type="text"
                    component={renderField}
                    label="Project Name" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={4}>
                  <Field name="x" component={renderField}
                    type="text" label="X"/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={4}>
                  <Field name="y" component={renderField}
                    type="text" label="Y"/>
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
                onClick={()=>this.toggleNewProject()}>
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

  if(!formProps.project_name) {
    errors.project_name = 'Please enter a project name';
  }

  if(formProps.x < 10 || formProps.x > 30){
    errors.x = 'X needs to be between 10 and 30';
  }

  if(formProps.y < 10 || formProps.y > 30){
    errors.y = 'Y needs to be between 10 and 30';
  }

  return errors;
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

NewProject = connect(mapStateToProps, null)(NewProject);

export default reduxForm({
  form: 'newProject',
  validate
})(NewProject);
