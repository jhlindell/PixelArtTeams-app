import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkUserForAdd, addNewUser } from '../actions/socketActions';
import { clearUserNameCheck } from '../actions/index';

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
    this.props.history.push("/art");
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
    return (
      <div className="row">
        <div className="offset-sm-4 col-sm-4">
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
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, user: state.userCheckReducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clearUserNameCheck, checkUserForAdd, addNewUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewUser);
