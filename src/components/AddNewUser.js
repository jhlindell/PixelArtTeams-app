import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkUserForAdd, addNewUser } from '../actions/socketActions';
import { clearUserNameCheck } from '../actions/index';
import Collaborators from './Collaborators';

class AddNewUser extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      user_name: '',
      email: '',
      user_exists: false
    };
  }

  componentWillMount(){
    if(this.props.currentProject === 0){
      this.props.history.push('/art');
    }
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

  render(){
    const newStyle = {};
    newStyle.display = 'flex';
    newStyle.flexDirection = 'column';
    newStyle.margin = 'auto';
    newStyle.textAlign = 'center';

    return (

        <div style={newStyle}>
          <div>
            <h3>Collaborators:</h3>
            <Collaborators classString={'addNewUserCollaborators'}/>
          </div>
          <form onSubmit={this.handleFormSubmit} className="addNewUserForm">
            <h4 className="mb-4">Please enter username or email of user to add</h4>
            <div className={(this.state.user_exists)?"form-group has-success row":"form-group row"}>
              <div className="col col-sm-12">
                <input type="text" name="user_name"
                  onChange={(e) => {this.handleInputChange(e)}} value={this.state.user_name} placeholder="username"
                  className={(this.state.user_exists)?"form-control form-control-success ":"form-control"}/>
              </div>
            </div>
            <div className={(this.state.user_exists)?"form-group has-success row":"form-group row"}>
              <div className="col col-sm-12">
                <input type="text" name="email"
                  onChange={(e) => {this.handleInputChange(e)}} value={this.state.email} placeholder="email"
                  className={(this.state.user_exists)?"form-control form-control-success ":"form-control"}/>
                <label className="form-control-label mt-2"> {this.props.user.message} </label>
               </div>
            </div>
            <button className="btn btn-primary" type="submit"
              disabled={!this.state.user_exists}>
              Submit
            </button>
            <button className="btn btn-primary ml-2" type="button"
              onClick={()=> this.userCheckClicked()}>
              Check For User
            </button>
            <button className="btn btn-secondary ml-2" type="button"
              onClick={()=> {
                this.props.clearUserNameCheck()
                this.clearForm()
                this.cancel()}}>
              Done
            </button>
          </form>
        </div>

    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, user: state.userCheckReducer, currentProject: state.currentProject };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clearUserNameCheck, checkUserForAdd, addNewUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewUser);
