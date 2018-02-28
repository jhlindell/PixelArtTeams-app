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
      this.props.addNewProject(this.state.project_name, this.state.x, this.state.y);
      this.props.history.push('/art');
    } else {
      console.log("errors: ", this.state.errors);
    }
  }

  cancel(){
    this.props.history.push('/art');
  }

  render(){
    const newStyle = {};
    newStyle.display = 'flex';
    newStyle.margin = 'auto';

    return (

        <div style={newStyle}>
          <form onSubmit={this.handleFormSubmit}>
            <h3 className="mb-5">New Project</h3>
            <div className="form-group row">
              <div className='col col-sm-12'>
                <input name="project_name" type="text"
                  onChange={(e) => {this.handleInputChange(e)}}
                  label="Project Name" placeholder="Project Name"
                  value={this.state.project_name}/>
                {this.state.errors.name && <div>{this.state.errors.name}</div>}
              </div>
            </div>
            <div className="form-group row">
              <div className='col col-sm-12'>
                <input name="x" type="text"
                  onChange={(e) => {this.handleInputChange(e)}}
                  label="Canvas Width" placeholder="X"
                  value={this.state.x}/>
                  {this.state.errors.x && <div>{this.state.errors.x}</div>}
              </div>
            </div>
            <div className="form-group row">
              <div className='col col-sm-12'>
                <input name="y" type="text"
                  onChange={(e) => {this.handleInputChange(e)}}
                  label="Canvas Height" placeholder="Y"
                  value={this.state.y}/>
                  {this.state.errors.y && <div>{this.state.errors.y}</div>}
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
            <button className="btn btn-secondary ml-2" type="button" onClick={()=>this.cancel()}>
              Cancel
            </button>
          </form>
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
