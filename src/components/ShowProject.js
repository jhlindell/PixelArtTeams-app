import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSingleProject,
  fetchUserRatingForProject,
  updateUserRatingForProject,
  fetchAvgProjectRating,
  deleteProject,
  promoteProjectToPublic }
  from '../actions/socketActions';
import { getCollaborators } from '../actions/index';
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

  async componentWillMount(){
    let id = this.props.match.params.id;
    this.props.getSingleProject(id);
    this.props.getCollaborators(id);
    this.props.fetchAvgProjectRating(id);
    this.props.fetchUserRatingForProject(id, this.props.auth.token);
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
    let x = project.grid[0].length;
    let y = project.grid.length;
    let windowX = (window.innerWidth * 0.6).toFixed(0);
    let windowY = (window.innerHeight * 0.6).toFixed(0);
    let pixelSizeX = (windowX/x).toFixed(0);
    let pixelSizeY = (windowY/y).toFixed(0);
    let pixelSize;
    if(pixelSizeX > pixelSizeY){
      pixelSize = pixelSizeY;
    } else {
      pixelSize = pixelSizeX;
    }
    let offsetX = ((windowX -(x * pixelSize))/2).toFixed(0);
    let canvasX = ((windowX - (offsetX*2))).toFixed(0);
    let canvasY = windowY;

    this.setState({pixelSize: pixelSize, canvasX: canvasX, canvasY: canvasY});
  }

  userRating(){
    if(!this.props.userRating || this.props.userRating.rating === -1){
      return 'Not Rated Yet';
    } else {
      return this.props.userRating.rating;
    }
  }

  averageRating(){
    if(!this.props.projectAvg){
      return 'Not Rated Yet';
    } else {
      return this.props.projectAvg.rating;
    }
  }

  ratingChanged = (newRating) => {
    this.setState({ user_rating: newRating }, ()=> this.props.updateUserRatingForProject(this.props.match.params.id, this.props.auth.token, this.state.user_rating));
  }

  startTime(){
    if(this.props.project.started_at){
      return moment(this.props.project.started_at).local().format('LLL');
    } else {
      return 'N/A'
    }
  }

  endTime(){
    if(this.props.project.finished_at){
      return moment(this.props.project.finished_at).local().format('LLL');
    } else {
      return 'N/A'
    }
  }

  deleteProject(){
    this.props.deleteProject(this.props.project.project_id);
    this.props.history.push('/gallery');
  }

  promoteToPublic(){
    this.props.promoteProjectToPublic(this.props.project.project_id);
    this.props.getSingleProject(this.props.project.project_id);
    this.props.history.push(`/project/${this.props.project.project_id}`)
  }

  render(){
    let containerStyle = {};
    containerStyle.display = 'flex';
    containerStyle.margin = 'auto';
    containerStyle.justifyContent = 'space-between';

    let cardStyle = {};
    cardStyle.display = 'flex';
    cardStyle.margin = 'auto';
    cardStyle.textAlign = 'center';
    cardStyle.width = '300px';
    cardStyle.marginLeft = '100px';

    let starStyle = {};
    starStyle.display = 'flex';
    starStyle.justifyContent = 'center';

    return (
      <div style={containerStyle}>
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
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { project: state.galleryShowReducer, collaborators: state.collaborators, auth: state.auth, userRating: state.userRatingReducer, projectAvg: state.avgProjectRating, user: state.userName }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getSingleProject, getCollaborators, fetchUserRatingForProject, updateUserRatingForProject, fetchAvgProjectRating, deleteProject, promoteProjectToPublic }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowProject);
