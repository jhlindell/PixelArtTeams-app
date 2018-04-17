import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectProject } from '../../actions/index';
import { getProjects } from '../../actions/socketActions';
import ProjectSelectorCard from './ProjectSelectorCard';
import Easel from '../../easel.png'

class ProjectSelector extends Component {
  componentWillMount(){
    this.props.getProjects();
  }

  render(){
    const newStyle = {};
    newStyle.padding = '50px';
    newStyle.justifyContent = 'center';
    newStyle.fontSize = '28px';
    newStyle.textAlign = 'center';
    newStyle.margin = 'auto';

    const picStyle = {};
    picStyle.height = '160px';
    picStyle.margin = 'auto';
    picStyle.padding = '20px';

    const cardDeck = {};
    cardDeck.display = 'flex';
    cardDeck.justifyContent = 'space-around';
    cardDeck.flexWrap = 'wrap';

    return (
      <div style={newStyle}>
        <p className="mb-3" style={{color: 'white'}}>Your Available Projects:</p>
        <div style={cardDeck}>
            <div className="card mb-3 mr-2" onClick={()=> this.props.history.push('/newProject')}>
              <div className="card-header">
                <h4>
                  New Project
                </h4>
              </div>
              <div className="card-body">
                <img src={Easel} style={picStyle} alt="easel"/>
              </div>
            </div>
          {this.props.projects.map((art) => <ProjectSelectorCard art={art} key={art.project_name} /> )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { currentProject: state.currentProject, projects: state.projectsReducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectProject, getProjects }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSelector);
