import React, { Component } from 'react';
import { signInUser } from '../../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
    const container = {};
    container.display = 'flex';
    container.margin = 'auto';

    const cardStyle = {};
    cardStyle.padding = '20px';
    cardStyle.display = 'flex';
    cardStyle.textAlign = 'center';

    return (
      <div style={container}>
        <form className="card" style={cardStyle} onSubmit={this.handleFormSubmit}>
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
          <Link to="/signInTrouble">Trouble Signing In?</Link>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button type="button" className="btn btn-secondary"
            onClick={()=> this.cancel()}>
            Cancel
          </button>
        </form>
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
