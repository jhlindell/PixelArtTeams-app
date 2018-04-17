import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendSupportEmail } from '../../actions/socketActions';

class CustomerSupport extends Component {
  constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      name: '',
      email: '',
      message: '',
      emailSent: false,
      errors: {
        name: '',
        email: '',
        message: ''
      }
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let valid = this.validate();
    if(valid){
      let name = this.state.name;
      let email = this.state.email.toLowerCase();
      let message = this.state.message;
      this.props.sendSupportEmail(name, email, message);
      this.props.history.push('/');
    }
  }

  clearForm(){
    this.setState({name: '', email: '', message: '', emailSent: true});
  }

  render(){
    const container = {};
    container.display = 'flex';
    container.margin = 'auto';

    const cardStyle = {};
    cardStyle.width = '400px';
    cardStyle.display = 'flex';
    cardStyle.textAlign = 'center';

    const formStyle = {};
    formStyle.display = 'flex';
    formStyle.flexDirection = 'column';
    formStyle.justifyContent = 'center';

    const errorStyle = {};
    errorStyle.color = 'red';

    return (
      <div style={container}>
        {!this.state.emailSent && <div className="card" style={cardStyle}>
          <form onSubmit={this.handleFormSubmit}>
            <div className="card-header">
              <h3>Contact Us</h3>
            </div>
            <div className="card-block" style={formStyle}>
              <label className="mt-2">Your Name</label>
              <input name="name" type="text" placeholder="Name" onChange={(e)=> this.handleInputChange(e)} value={this.state.name} />
              {this.state.errors.name && <div style={errorStyle}>{this.state.errors.name}</div>}
              <label className="mt-2">Your Email Address</label>
              <input name="email" type="text" placeholder="Email" onChange={(e)=> this.handleInputChange(e)} value={this.state.email} />
              {this.state.errors.email && <div style={errorStyle}>{this.state.errors.email}</div>}
              <label className="mt-2">Your Message</label>
              <textarea name="message" rows='5' placeholder="Type your message here" onChange={(e)=> this.handleInputChange(e)} value={this.state.message} />
              {this.state.errors.message && <div style={errorStyle}>{this.state.errors.message}</div>}
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">Send Email</button>
            </div>
          </form>
        </div>}
        {this.state.emailSent && <div className="card" style={{padding: '10px'}}>
          <h2>Email Sent</h2>
        </div>}
      </div>
    );
  }

  validate() {
    this.clearErrors();
    const errors = {};
    let isValid = true;

    if(!this.state.name){
      errors.name = 'Please enter your name';
      isValid = false;
    }

    if(!this.state.email) {
      errors.email = 'Please enter your email';
      isValid = false;
    }

    if(!this.state.message) {
      errors.message = 'You must enter a message';
      isValid = false;
    }

    this.setState({errors: errors});
    return isValid;
  }

  clearErrors(){
    let errors = {};
    errors.name = '';
    errors.email = '';
    errors.message = '';
    this.setState({errors: errors });
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ sendSupportEmail }, dispatch);
}

export default connect(null, mapDispatchToProps)(CustomerSupport);
