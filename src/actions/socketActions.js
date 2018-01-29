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
