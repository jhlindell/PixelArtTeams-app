import React, { Component } from "react";
import { connect } from 'react-redux';
import { addNewProject } from '../actions/socketActions';
import { bindActionCreators } from 'redux';

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      project_name: '',
      x: '',
      y: '',
      timer: 'unlimited',
      errors: {
        name: '',
        x: '',
        y: ''
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
      this.props.addNewProject(this.state.project_name, this.state.x, this.state.y, this.state.timer);
      this.props.history.push('/art');
    } else {
      console.log("errors: ", this.state.errors);
    }
  }

  cancel(){
    this.props.history.push('/art');
  }

  render(){
    const container = {};
    container.display = 'flex';
    // container.margin = 'auto';
    container.justifyContent = 'space-around';

    const newStyle = {};
    newStyle.display = 'flex';
    newStyle.margin = 'auto';

    const footerStyle = {};
    footerStyle.display = 'flex';
    footerStyle.justifyContent = 'space-around';

    const timerStyle = {};
    timerStyle.display = 'flex';
    timerStyle.flexDirection = 'column';
    timerStyle.width = '200px';

    const radioStyle = {};
    radioStyle.display = 'flex';
    radioStyle.flexDirection = 'row';

    const headerStyle = {};
    headerStyle.textAlign = 'center';
    // headerStyle.margin = 'auto';

    return (
      <div style={newStyle}>
        <div className="card">
          <form onSubmit={this.handleFormSubmit}>
            <div className="card-header">
              <h3>New Project</h3>
            </div>
            <div className="card-block">
              <div>
                <div className="form-group row">
                  <div className="col col-sm-12">
                    <input name="project_name" type="text"
                      onChange={(e) => {this.handleInputChange(e)}}
                      label="Project Name" placeholder="Project Name"
                      value={this.state.project_name}/>
                    {this.state.errors.name && <div>{this.state.errors.name}</div>}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col col-sm-12">
                    <input name="x" type="text"
                      onChange={(e) => {this.handleInputChange(e)}}
                      label="Canvas Width" placeholder="X"
                      value={this.state.x}/>
                      {this.state.errors.x && <div>{this.state.errors.x}</div>}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col col-sm-12">
                    <input name="y" type="text"
                      onChange={(e) => {this.handleInputChange(e)}}
                      label="Canvas Height" placeholder="Y"
                      value={this.state.y}/>
                      {this.state.errors.y && <div>{this.state.errors.y}</div>}
                  </div>
                </div>
              </div>
              <div className="form-group mt-3" style={timerStyle}>
                <h5>Project Length:</h5>
                <div style={radioStyle}>
                  <input type="radio" id="1min"
                    onChange={(e) => {this.handleInputChange(e)}}
                   name="timer" value="1min" className="mr-3"
                   checked={this.state.timer==="1min"}/>
                  <label htmlFor="1min">1 Minute</label>
                </div>

                <div style={radioStyle}>
                  <input type="radio" id="3min"
                    onChange={(e) => {this.handleInputChange(e)}}
                   name="timer" value="3min" className="mr-3"
                   checked={this.state.timer==="3min"}/>
                  <label htmlFor="3min">3 Minutes</label>
                </div>

                <div style={radioStyle}>
                  <input type="radio" id="5min"
                    onChange={(e) => {this.handleInputChange(e)}}
                   name="timer" value="5min" className="mr-3"
                   checked={this.state.timer==="5min"}/>
                  <label htmlFor="5min">5 minutes</label>
                </div>

                <div style={radioStyle}>
                  <input type="radio" id="15min"
                    onChange={(e) => {this.handleInputChange(e)}}
                   name="timer" value="15min" className="mr-3"
                   checked={this.state.timer==="15min"}/>
                  <label htmlFor="15min">15 minutes</label>
                </div>

                <div style={radioStyle}>
                  <input type="radio" id="1hour"
                    onChange={(e) => {this.handleInputChange(e)}}
                   name="timer" value="1hour" className="mr-3"
                   checked={this.state.timer==="1hour"}/>
                  <label htmlFor="1hour">1 hour</label>
                </div>

                <div style={radioStyle}>
                  <input type="radio" id="1day"
                    onChange={(e) => {this.handleInputChange(e)}}
                   name="timer" value="1day" className="mr-3"
                   checked={this.state.timer==="1day"}/>
                  <label htmlFor="1day">1 day</label>
                </div>

                <div style={radioStyle}>
                  <input type="radio" id="unlimited"
                    onChange={(e) => {this.handleInputChange(e)}}
                   name="timer" value="unlimited" className="mr-3" checked={this.state.timer==="unlimited"}/>
                  <label htmlFor="unlimited">Unlimited</label>
                </div>
              </div>
            </div>
            <div className="card-footer" style={footerStyle}>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
              <button className="btn btn-secondary" type="button" onClick={()=>this.cancel()}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  validate(){
    this.clearErrors();
    let errors = {};
    let isValid = true;

    if(this.state.project_name === '') {
      errors.name = 'Please enter a project name';
      isValid = false;
    }

    if(this.state.x < 10 || this.state.x > 40){
      errors.x = 'X needs to be between 10 and 40';
      isValid = false;
    }

    if(this.state.y < 10 || this.state.y > 40){
      errors.y = 'Y needs to be between 10 and 40';
      isValid = false;
    }

    this.setState({errors: errors});
    return isValid;
  }

  clearErrors(){
    let errors = {};
    errors.name = '';
    errors.x = '';
    errors.y = '';
    this.setState({errors: errors });
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ addNewProject }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);
