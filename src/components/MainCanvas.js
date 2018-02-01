import React, { Component } from 'react';
import Menu from './Menu';
import NavBar from './NavBar';
import Grid from './Grid';
import Palette from './Palette';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { getProjects } from '../actions/socketActions';

class MainCanvas extends Component {
  componentWillMount(){
    this.props.getProjects();
  }

  render(){
    return (
      <div>
        <NavBar />
        <Menu />
        <Palette />
        {this.props.currentProject !== 0 && <Grid grid={this.props.grid}/>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    grid: state.gridReducer,
    projects: state.projectsReducer,
    currentProject: state.currentProject,
    auth: state.auth.authenticated,
    token: state.auth.token
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getProjects}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainCanvas);
