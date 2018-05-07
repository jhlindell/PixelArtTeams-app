import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSingleProject,
  fetchUserRatingForProject,
  updateUserRatingForProject,
  fetchAvgProjectRating,
  deleteProject,
  promoteProjectToPublic,
  flagProject,
  flagCheck }
  from '../../actions/socketActions';
import { getCollaborators, clearFlagCheck } from '../../actions/index';
import DrawCanvas from './DrawCanvas';
import ReactStars from 'react-stars';
import moment from 'moment';


class ShowProject extends Component {
  constructor(props){
    super(props);
    this.state = {
      pixelSize: 0,
      canvasX: 0,
      canvasY: 0,
      user_rating: null,
    }
  }

  componentWillMount(){
    const id = this.props.match.params.id;
    this.props.getSingleProject(id);
    this.props.getCollaborators(id);
    this.props.fetchAvgProjectRating(id);
    if(this.props.auth.token){
      this.props.fetchUserRatingForProject(id, this.props.auth.token);
      this.props.flagCheck(id, this.props.auth.token);
    }
  }

  componentWillUnmount(){
    this.props.clearFlagCheck();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.userRating){
      this.setState({user_rating: nextProps.userRating.rating});
    }
    if(nextProps.project && nextProps.project.is_finished === false){
      this.props.history.push('/gallery');
    }
    if(nextProps.project){
      this.calculateCanvas(nextProps.project);
    }
    if(this.props.userRating && nextProps.userRating.rating !== this.props.userRating.rating){

      this.props.fetchAvgProjectRating(this.props.match.params.id);
    }
  }

  calculateCanvas(project){
    const x = project.grid[0].length;
    const y = project.grid.length;
    const windowX = (window.innerWidth * 0.6).toFixed(0);
    const windowY = (window.innerHeight * 0.6).toFixed(0);
    const pixelSizeX = (windowX/x).toFixed(0);
    const pixelSizeY = (windowY/y).toFixed(0);
    const pixelSize =(pixelSizeX > pixelSizeY)? pixelSizeY: pixelSizeX;
    const offsetX = ((windowX -(x * pixelSize))/2).toFixed(0);
    const canvasX = ((windowX - (offsetX*2))).toFixed(0);
    const canvasY = windowY;

    this.setState({ pixelSize, canvasX, canvasY });
  }

  userRating(){
    return (!this.props.userRating || this.props.userRating.rating === -1) ?
      'Not Rated Yet' : this.props.userRating.rating;
  }

  averageRating(){
    return (this.props.projectAvg) ? this.props.projectAvg.rating: 'Not Rated Yet';
  }

  ratingChanged = (newRating) => {
    this.setState({ user_rating: newRating }, ()=> this.props.updateUserRatingForProject(this.props.match.params.id, this.props.auth.token, this.state.user_rating));
  }

  startTime(){
    return (this.props.project.started_at) ? 
      moment(this.props.project.started_at).local().format('LLL') : 'N/A';
  }

  endTime(){
    return (this.props.project.finished_at) ? 
      moment(this.props.project.finished_at).local().format('LLL'): 'N/A';
  }

  deleteProject(){
    this.props.deleteProject(this.props.project.project_id);
    this.props.history.push('/gallery');
  }

  promoteToPublic(){
    this.props.promoteProjectToPublic(this.props.project.project_id);
    this.props.getSingleProject(this.props.project.project_id);
    this.props.history.push(`/project/${this.props.project.project_id}`);
  }

  flagInappropriate(){
    this.props.flagProject(this.props.project.project_id);
    this.props.history.push(`/project/${this.props.project.project_id}`);
    this.props.flagCheck(this.props.project.project_id, this.props.auth.token);
  }

  render(){
    const componentStyle = {
      display: 'flex',
      margin: 'auto',
      justifyContent: 'space-between',
    };

    const cardStyle = {
      display: 'flex',
      margin: 'auto',
      textAlign: 'center',
      width: '300px',
      marginLeft: '100px',
    };

    const starStyle = {
      display: 'flex',
      justifyContent: 'center',
    };

    return (
      <div style={componentStyle}>
        <div>
          {this.props.project && <DrawCanvas grid={ this.props.project.grid } pixelSize={this.state.pixelSize} canvasX={this.state.canvasX} canvasY={this.state.canvasY}/> }
        </div>
        <div className="card" style={cardStyle}>
          <div className="card-header">
            <h4 className="showProjectHeading">Project Info</h4>
          </div>
          <div className="card-block">
            <div className="showProjectItem mb-2">Project Originator:{this.props.project && <span className="showProjectItem">  {this.props.project.project_owner}</span>}</div>

            <div className="showProjectItem">Start Time: {this.props.project && <div className="showProjectItem">  {this.startTime()}</div>}</div>
            <div className="showProjectItem">End Time: {this.props.project && <div className="showProjectItem">  {this.endTime()}</div>}</div>
          </div>
          <p className="showProjectItem">Project Collaborators:</p>
          <ul className="list-group list-group-flush">
            {this.props.collaborators.map(collaborator => {
              return <li className="list-group-item selectedUser" key={collaborator}>{collaborator}</li>
            })}
          </ul>
          <div className="card-block">
            <div>
              Avg. Rating: {this.averageRating()}
            </div>
            {this.props.auth.authenticated &&<div style={starStyle}>
              {this.state.user_rating && <ReactStars
                count={3}
                onChange={this.ratingChanged}
                size={20}
                value={this.state.user_rating}
                half={false} />}
            </div>}
            <div>
              {this.props.user && this.props.user.isMod && <button className="btn-primary mt-2" onClick={()=> this.deleteProject()}>Delete</button>}
            </div>
            <div>
              {this.props.user && this.props.project && !this.props.project.is_public && <button className="btn-primary mt-2" onClick={()=> this.promoteToPublic()}>Make Public</button>}
            </div>
            <div>
              {!this.props.projectFlag &&<button className="btn-danger mt-2" onClick={()=> this.flagInappropriate()}>Flag Inappropriate</button>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { project: state.galleryShowReducer, collaborators: state.collaborators, auth: state.auth, userRating: state.userRatingReducer, projectAvg: state.avgProjectRating, user: state.userName, projectFlag: state.flagCheckReducer }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getSingleProject, getCollaborators, fetchUserRatingForProject, updateUserRatingForProject, fetchAvgProjectRating, deleteProject, promoteProjectToPublic, flagProject, flagCheck, clearFlagCheck }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowProject);
