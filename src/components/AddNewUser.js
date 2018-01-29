import React, { Component } from "react";
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Col,
  Form,
  Label,
  FormGroup,
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import { checkUserForAdd } from '../actions/socketActions';
import { clearUserNameCheck } from '../actions/index';

class AddNewUser extends Component {
  constructor(props) {
    super(props);
    this.renderButton = this.renderButton.bind(this);
    this.toggleNewUser = this.toggleNewUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      newUserToggle: false,
      user_name: '',
      email: '',
      user_exists: false
    };
  }

  toggleNewUser() {
    this.setState({
      newUserToggle: !this.state.newUserToggle
    });
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user !== this.props.user){
      if(nextProps.user.result === true){
        this.setState({ user_exists: true })
      }
      if(nextProps.user.result === false){
        this.setState({ user_exists: false })
      }
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleFormSubmit(event) {
    this.props.addNewUser(this.state.user_name, this.state.email);
    this.props.clearUserNameCheck();
    this.setState({newUserToggle: false});
  }

  userCheckClicked(){
    this.props.checkUserForAdd(this.state.user_name, this.state.email);
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

  renderInputButton(){
    if(this.state.user_exists){
      return
    }
  }

  clearForm(){
    this.setState({user_name: '', email: '', user_exists: false});
  }

  render(){
    return (
      <div>
        {this.renderButton()}
        <Modal
          isOpen={this.state.newUserToggle}
          toggle={()=> {
            this.toggleNewUser();
            this.clearForm();
          }}>
          <ModalHeader toggle={()=> {
            this.toggleNewUser();
            this.clearForm();
          }}>
            New Project
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleFormSubmit}>
              <FormGroup row className={(this.state.user_exists)?"has-success ":""}>
                <Col sm={12}>
                  <Input type="text" name="user_name"
                    onChange={(e) => {this.handleInputChange(e)}} value={this.state.user_name} placeholder="username"
                    className={(this.state.user_exists)?"form-control-success ":""}/>
                </Col>
              </FormGroup>
              <FormGroup row className={(this.state.user_exists)?"has-success ":""}>
                <Col sm={12}>
                  <Input type="text" name="email"
                    onChange={(e) => {this.handleInputChange(e)}} value={this.state.email} placeholder="email"
                    className={(this.state.user_exists)?"form-control-success ":""}/>
                  <Label className="mt-2">{this.props.user.message}</Label>
                </Col>
              </FormGroup>
              <Button
                color="primary"
                type="submit"
                disabled={!this.state.user_exists}>
                Submit
              </Button>
              <Button
                className="ml-2"
                color="primary"
                onClick={()=> this.userCheckClicked()}>
                Check For User
              </Button>
              <Button
                className="ml-2"
                color="secondary"
                onClick={()=> {
                  this.toggleNewUser()
                  this.props.clearUserNameCheck()
                  this.clearForm()
                }}>
                Cancel
              </Button>

            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, user: state.userCheckReducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clearUserNameCheck, checkUserForAdd }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewUser);
