import store from '../store';
var socket = require('../socket');

export function socketConnect(){
  return (dispatch, getState) => {
    const { currentProject } = getState();
    socket.emit('joinRoom', currentProject);
    socket.emit('grid', currentProject);
  }
}

export function selectProject(id){
  store.dispatch({ type: 'SELECT_PROJECT', payload: { id } });
}

export function refresh(){
  return (dispatch, getState) => {
    const { auth } = store.getState();
    socket.emit('refreshProjects', auth.token);
  }
}

export function sendPixel(x, y){
  return (dispatch, getState) => {
    const { activeColor, currentProject } = store.getState();
    socket.emit('pixel', {x, y, color: activeColor, project: currentProject})
  }
}

export function mouseOverAction(x, y){
  return (dispatch, getState) => {
    const { mouseReducer, activeColor, currentProject } = store.getState();
    if( mouseReducer ){
      socket.emit('pixel', {x, y, color: activeColor, project: currentProject})
    }
  }
}

export function stockGallery(){
  return (dispatch) => {
    socket.emit('getArtForGallery');
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
    socket.emit('checkUser', { username: username, email: email});
  }
}

export function deleteProject(){
  return (dispatch, getState) => {
    const { currentProject, auth} = getState();
    socket.emit('deleteProject', { projectid: currentProject, token: auth.token});
  }
}

export function saveProject(){
  return (dispatch, getState) => {
    const { currentProject, auth} = getState();
    socket.emit('saveProject', { projectid: currentProject, token: auth.token});
  }
}

export function addNewUser(username, email){
  return (dispatch, getState) => {
    const { currentProject } = getState();
    socket.emit('addUserToProject', { username: username, email: email, projectid: currentProject});
  }
}

export function sendFinishedProject(){
  return (dispatch, getState) => {
    const { currentProject, auth} = getState();
    socket.emit('sendFinishedProject', { projectid: currentProject, token: auth.token});
  }
}

export function addNewProject(name, x, y){
  return (dispatch, getState) => {
    const { auth } = getState();
    let token;
    if(!auth.token){
      token = localStorage.getItem('token');
    } else
    token = auth.token;
    socket.emit('addNewProject', {name, x, y, token});
  }
}

export function initialize(){
  return (dispatch, getState) => {
    const { auth } = getState();
    socket.emit('initialize', auth.token);
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
