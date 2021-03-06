import socket from '../socket';
import * as otherActions from './index';

export function selectProject(id){
  return { type: 'SELECT_PROJECT', payload: { id } };
}

export function refresh(){
  return (dispatch, getState) => {
    const { auth } = getState();
    socket.emit('refreshProjects', auth.token);
  }
}

export function sendPixel(x, y){
  return (dispatch, getState) => {
    const { activeColor, currentProject } = getState();
    socket.emit('pixel', {x, y, color: activeColor, project: currentProject})
    dispatch(otherActions.pixelClick(x, y, activeColor));
  }
}

export function mouseOverAction(x, y){
  return (dispatch, getState) => {
    const { mouseReducer, activeColor, currentProject } = getState();
    if( mouseReducer ){
      socket.emit('pixel', {x, y, color: activeColor, project: currentProject})
    }
  }
}

export function stockGallery(sortStyle){
  return (dispatch, getState) => {
    const { auth } = getState();
    socket.emit('getArtForGallery', { sortStyle, token: auth.token });
  }
}

export function getGalleryTop3(){
  return (dispatch) => {
    socket.emit('getGalleryTop3');
  }
}

export function getProjects(){
  return (dispatch, getState) => {
    const { auth } = getState();
    socket.emit('refreshProjects', auth.token);
  }
}

export function getUserName(){
  return (dispatch, getState) => {
    const { auth } = getState();
    socket.emit('getUserName', auth.token);
  }
}

export function checkUserForAdd(username, email){
  return (dispatch) => {
    socket.emit('checkUser', { username, email });
  }
}

export function deleteProject(id = null){
  return (dispatch, getState) => {
    if(id){
      const { auth } = getState();
      socket.emit('deleteProject', { projectid: id, token: auth.token});
    } else {
      const { currentProject, auth} = getState();
      socket.emit('deleteProject', { projectid: currentProject, token: auth.token});
    }
  }
}

export function saveProject(){
  return (dispatch, getState) => {
    const { currentProject, auth} = getState();
    if(currentProject){
      socket.emit('saveProject', { projectid: currentProject, token: auth.token});
    }
  }
}

export function addNewUser(username, email){
  return (dispatch, getState) => {
    const { currentProject } = getState();
    socket.emit('addUserToProject', { username, email, projectid: currentProject});
  }
}

export function removeUser(username){
  return (dispatch, getState) => {
    const { currentProject } = getState();
    socket.emit('removeUserFromProject', { username, projectid: currentProject});
  }
}

export function sendFinishedProject(id = null){
  return (dispatch, getState) => {
    if(id){
      const {auth} = getState();
      socket.emit('sendFinishedProject', { projectid: id, token: auth.token });
    } else {
      const { currentProject, auth} = getState();
      socket.emit('sendFinishedProject', { projectid: currentProject, token: auth.token});
    }
  }
}

export function addNewProject(name, x, y, timer, collaborators){
  return (dispatch, getState) => {
    const { auth } = getState();
    const token = (auth.token) ? auth.token : localStorage.getItem('token');
    socket.emit('addNewProject', { name, x, y, token, timer, collaborators });
  }
}

export function initialize(){
  return (dispatch, getState) => {
    const { auth } = getState();
    if(auth.authenticated){
      socket.emit('initialize', auth.token);
    }
  }
}

export function joinRoom(id){
  return (dispatch) => {
    socket.emit('joinRoom', id);
  }
}

export function leaveRoom(id){
  return (dispatch) => {
    socket.emit('leaveRoom', id);
  }
}

export function grid(id){
  return (dispatch) => {
    socket.emit('grid', id);
  }
}

export function getSingleProject(id){
  return (dispatch) => {
    socket.emit('getSingleProject', id);
  }
}

export function fetchUserRatingForProject(projectid, token){
  return (dispatch) => {
    socket.emit('getUserRatingForProject', {project_id: projectid, token });
  }
}

export function updateUserRatingForProject(projectid, token, rating){
  return (dispatch) => {
    socket.emit('changeUserRatingForProject', { project_id: projectid, token, rating });
  }
}

export function fetchAvgProjectRating(projectid){
  return (dispatch) => {
    socket.emit('getAvgRatingForProject', projectid);
  }
}

export function promoteProjectToPublic(projectid){
  return (dispatch) => {
    socket.emit('makeProjectPublic', projectid);
  }
}

export function flagProject(projectId){
  return (dispatch, getState) => {
    const { auth } = getState();
    socket.emit('flaggingProject', { projectId, token: auth.token });
  }
}

export function flagCheck(id, token){
  return (dispatch) => {
    socket.emit('didUserFlag', { project_id: id, token });
  }
}

export function sendVerificationEmail(username, email, token){
  return (dispatch) => {
    socket.emit('sendVerificationEmail', { username, email, token })
  }
}

export function checkUserHash(hash){
  return (dispatch) => {
    socket.emit('checkForHash', hash);
  }
}

export function forgotUsername(email){
  return (dispatch) => {
    socket.emit('forgotUsername', email);
  }
}

export function resendVerificationEmail(email){
  return (dispatch) => {
    socket.emit('resendVerificationEmail', email);
  }
}

export function passwordResetEmail(email){
  return (dispatch) => {
    socket.emit('passwordResetEmail', email);
  }
}

export function sendPasswordReset(password, hash){
  return (dispatch) => {
    socket.emit('sendPasswordReset', { password, hash });
  }
}

export function submitChatMessage(username, message){
  return (dispatch, getState) => {
    const { currentProject } = getState();
    socket.emit('submitChatMessage', { username, message, currentProject });
  }
}

export function sendSupportEmail(name, email, message){
  return (dispatch) => {
    socket.emit('sendSupportEmail', { name, email, message });
  }
}
