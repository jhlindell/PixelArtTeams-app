import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  checkUserForAdd,
  addNewUser,
  removeUser}
  from '../actions/socketActions';
import {
  clearUserNameCheck,
  getCollaborators,
  setCollaborator }
  from '../actions/index';

class AddNewUser extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.selectUser = this.selectUser.bind(this);

    this.state = {
      user_name: '',
      email: '',
      user_exists: false,
      selectedUser: ''
    };
  }

  componentWillMount(){
    if(this.props.currentProject === 0){
      this.props.history.push('/art');
    }
    this.props.getCollaborators(this.props.currentProject)
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
    event.preventDefault();
    let userName = this.state.user_name.toLowerCase();
    let email = this.state.email.toLowerCase();
    this.props.addNewUser(userName, email);
    this.props.clearUserNameCheck();
  }

  userCheckClicked(){
    let userName = this.state.user_name.toLowerCase();
    let email = this.state.email.toLowerCase();
    this.props.checkUserForAdd(userName, email);
  }

  clearForm(){
    this.setState({user_name: '', email: '', user_exists: false});
  }

  cancel(){
    this.props.history.push("/art");
  }

  removeUser(){
    this.props.removeUser(this.state.selectedUser);
    this.props.getCollaborators(this.props.currentProject);
    this.setState({selectedUser: ''});
  }

  selectUser(username){
    this.setState({selectedUser: username});
  }

  render(){
    const newStyle = {};
    newStyle.display = 'flex';
    newStyle.flexDirection = 'column';
    newStyle.margin = 'auto';
    newStyle.textAlign = 'center';

    const colStyle = {};
    colStyle.width = '60%';
    colStyle.margin = 'auto';

    const formStyle = {};
    formStyle.width = '60%';
    formStyle.margin = 'auto';

    return (
      <div style={newStyle}>
        <div className="card mb-4" style={colStyle}>
          <div className="card-header artTitleText" >
            Collaborators:
          </div>
          <ul className="list-group list-group-flush">
            {this.props.collaborators.map(collaborator => {
              if(collaborator !== this.props.username){
              return <li className={"list-group-item selectedUser " + ((collaborator === this.state.selectedUser) ? "selectedUserHighlighted" : "") }
                key={collaborator} onClick={()=> this.selectUser(collaborator)}>{collaborator}</li>}
              return null;
            })}
          </ul>
          <div className="card-footer">
            <div className="btn-group">
              <button disabled={!this.state.selectedUser} onClick={() => this.removeUser()} className="btn btn-primary">Remove</button>
            </div>
          </div>
        </div>

        <form className="card" onSubmit={this.handleFormSubmit} style={formStyle}>
          <h4 className="mt-3 mb-3">Please enter username or email of user to add</h4>
          <div className={(this.state.user_exists)?"form-group has-success row":"form-group row"}>
            <div className="col col-sm-12">
              <input type="text" name="user_name"
                onChange={(e) => {this.handleInputChange(e)}} value={this.state.user_name} placeholder="username"
                className={(this.state.user_exists)?"form-control form-control-success ":"form-control"}/>
            </div>
          </div>
          <div className={(this.state.user_exists)?"mb-0 form-group has-success row":"mb-0 form-group row"}>
            <div className="col col-sm-12">
              <input type="text" name="email"
                onChange={(e) => {this.handleInputChange(e)}} value={this.state.email} placeholder="email"
                className={(this.state.user_exists)?"form-control form-control-success ":"form-control"}/>
              <label className="form-control-label mt-2"> {this.props.user.message} </label>
             </div>
          </div>
          <div className="btn-group mb-2" style={{padding: '0', margin: 'auto'}}>
            <button className="btn btn-primary" type="submit"
              disabled={!this.state.user_exists}>
              Submit
            </button>
            <button className="btn btn-primary" type="button"
              onClick={()=> this.userCheckClicked()}>
              Check Name
            </button>
            <button className="btn btn-secondary" type="button"
              onClick={()=> {
                this.props.clearUserNameCheck()
                this.clearForm()
                this.cancel()}}>
              Done
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, user: state.userCheckReducer, currentProject: state.currentProject, collaborators: state.collaborators, username: state.userName };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clearUserNameCheck, checkUserForAdd, addNewUser, removeUser, getCollaborators, setCollaborator }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewUser);
