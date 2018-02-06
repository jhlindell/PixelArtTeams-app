import React, { Component } from 'react';
import { signInUser } from '../../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Signin extends Component {
  constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      username: '',
      password: ''
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.authenticated){
      this.props.history.push('/art');
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
    this.props.signInUser({username: this.state.username, password: this.state.password});
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

  cancel(){
    this.props.history.push('/gallery');
  }

  render(){
    return (
      <div className="row">
        <div className="col-sm-12">
          <form className="signinForm"
            onSubmit={this.handleFormSubmit}>
            <h3>Please Sign In</h3>
            <div className="form-group mt-5">
              <input name="username" type="text"
                onChange={(e) => {this.handleInputChange(e)}}
                placeholder="Username" value={this.state.username} />
            </div>
            <div className="form-group">
              <input name="password" type="password"
                onChange={(e) => {this.handleInputChange(e)}}
                placeholder="Password" value={this.state.password} />
            </div>
            {this.renderAlert()}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button type="button" className="btn btn-secondary ml-2"
              onClick={()=> this.cancel()}>
              Cancel
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

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
