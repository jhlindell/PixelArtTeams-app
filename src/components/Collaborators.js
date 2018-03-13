import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCollaborators } from '../actions/index';

class Collaborators extends Component {
  componentWillMount(){
    this.props.getCollaborators(this.props.project);
  }

  render(){
    return (
      <div>
        {this.props.collaborators.map(collaborator => {
          if(collaborator !== this.props.username){
            return <div key={collaborator}>{collaborator}</div>}
          return null;
        })}
      </div>
    );
  }
}

function mapStateToProps(state){
  return { currentProject: state.currentProject, collaborators: state.collaborators, username: state.userName }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getCollaborators}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Collaborators);
