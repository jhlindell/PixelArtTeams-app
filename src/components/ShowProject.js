import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSingleProject,
  fetchUserRatingForProject,
  updateUserRatingForProject,
  fetchAvgProjectRating }
  from '../actions/socketActions';
import { getCollaborators } from '../actions/index';
import DrawCanvas from './DrawCanvas';

class ShowProject extends Component {
  constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      pixelSize: 0,
      canvasX: 0,
      canvasY: 0,
      user_rating: 0,
    }
  }

  componentWillMount(){
    let id = this.props.match.params.id;
    this.props.getSingleProject(id);
    this.props.getCollaborators(id);
    this.props.fetchUserRatingForProject(id, this.props.auth.token);
    this.props.fetchAvgProjectRating(id);
  }

  componentWillReceiveProps(nextProps){
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

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
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

  setUserRating(){
    this.props.updateUserRatingForProject(this.props.match.params.id, this.props.auth.token, this.state.user_rating);
  }

  render(){
    let containerStyle = {};
    containerStyle.display = 'flex';
    containerStyle.margin = 'auto';
    containerStyle.justifyContent = 'space-between';
    containerStyle.backgroundColor = 'lightgray';

    let cardStyle = {};
    cardStyle.display = 'flex';
    cardStyle.margin = 'auto';
    cardStyle.textAlign = 'center';
    cardStyle.width = '200px';

    return (
      <div style={containerStyle}>
        <div>
          {this.props.project && <DrawCanvas grid={ this.props.project.grid } pixelSize={this.state.pixelSize} canvasX={this.state.canvasX} canvasY={this.state.canvasY}/> }
        </div>
        <div className="card ml-5" style={cardStyle}>
          <div className="card-header">
            <h4 className="showProjectHeading">Project Info</h4>
          </div>
          <div className="card-body">
            <div className="showProjectItem mb-2">Project Originator:</div>
            {this.props.project && <div className="showProjectItem mb-2">  {this.props.project.project_owner}</div>}
            <p className="showProjectItem">Project Collaborators:</p>
          </div>
          <ul className="list-group list-group-flush">
            {this.props.collaborators.map(collaborator => {
              return <li className="list-group-item" key={collaborator}>{collaborator}</li>
            })}
          </ul>
          <div className="card-body">
            <div>
              Avg. Rating: {this.averageRating()}
            </div>
            {this.props.auth.authenticated &&<div>
              Your rating: {this.userRating()}
            </div>}
            {this.props.auth.authenticated &&<div>
              <input type="number" name="user_rating" style={{width: '50px'}}
                onChange={(e) => {this.handleInputChange(e)}} value={this.state.user_rating} placeholder="rating" />
              <button type="button" className="btn btn-primary" onClick={()=>{this.setUserRating()}} >Rate</button>
            </div>}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { project: state.galleryShowReducer, collaborators: state.collaborators, auth: state.auth, userRating: state.userRatingReducer, projectAvg: state.avgProjectRating }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getSingleProject, getCollaborators, fetchUserRatingForProject, updateUserRatingForProject, fetchAvgProjectRating }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowProject);
