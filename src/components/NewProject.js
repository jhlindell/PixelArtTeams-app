import React, { Component } from "react";
import { connect } from 'react-redux';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { addNewProject } from '../actions/socketActions';
import { bindActionCreators } from 'redux';

const renderField = ({ input, label, type, placeholder, meta: { touched, error}}) => (
<div>
  <label>{label}</label>
  <div>
    <input {...input} placeholder={placeholder} type={type} />
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
          toggle={()=>this.toggleNewProject()}
        >
          <div className="modal-header">
            <h4 className="modal-title"> New Project </h4>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <div className="form-group row">
                <div className='col col-sm-12'>
                  <Field name="project_name" type="text" component={renderField}
                    label="Project Name" placeholder="Project Name"/>
                </div>
              </div>
              <div className="form-group row">
                <div className='col col-md-4'>
                  <Field name="x" component={renderField} type="text" label="Canvas Width" placeholder="X"/>
                </div>
              </div>
              <div className="form-group row">
                <div className='col col-md-4'>
                  <Field name="y" component={renderField} type="text" label="Canvas Height" placeholder="Y"/>
                </div>
              </div>
              <button className="btn btn-primary" type="submit"
                disabled={submitting}> Submit
              </button>
              <button className="btn btn-secondary ml-" type="button" onClick={()=>this.toggleNewProject()}> Cancel
              </button>
            </form>
          </div>
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

  if(formProps.x < 10 || formProps.x > 40){
    errors.x = 'X needs to be between 10 and 40';
  }

  if(formProps.y < 10 || formProps.y > 30){
    errors.y = 'Y needs to be between 10 and 30';
  }

  return errors;
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ addNewProject }, dispatch);
}

NewProject = connect(mapStateToProps, mapDispatchToProps)(NewProject);

export default reduxForm({
  form: 'newProject',
  validate
})(NewProject);
