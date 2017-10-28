import axios from 'axios';
const LOCAL_URL = 'http://localhost:8000';

export function changeShowState() {
  return {
    type: 'CHANGE_PALETTE_SHOW_STATE'
  };
}

export function changeShowMenuState() {
  return {
    type: 'CHANGE_MENU_SHOW_STATE'
  };
}

export function updateColor(nextColor) {
  return {
    type: 'UPDATE_COLOR',
    payload: {nextColor},
  };
}

export function selectProject(id){
  return {
    type: 'SELECT_PROJECT',
    payload: { id }
  };
}

export function pixelClick(x, y, color) {
  return {
    type: 'PIXEL_CLICK',
    payload: { x, y, color }
  };
}

export function updateGrid(grid){
  return {
    type: 'UPDATE_GRID',
    payload: grid
  };
}

export function fetchProjects(projects){
  return {
    type: 'FETCH_PROJECTS',
    payload: projects
  };
}

export function mouseDownAction(){
  return {
    type: 'MOUSE_DOWN',
    payload: true
  };
}

export function mouseUpAction(){
  return {
    type: 'MOUSE_UP',
    payload: false
  };
}

export function getGallery(art){
  return {
    type: 'GET_GALLERY',
    payload: art
  };
}

export function signUpUser({username, email, password}){
  return function(dispatch){
    axios.post(`${LOCAL_URL}/signup`, {username, email, password})
      .then(response => {
        dispatch({type: 'AUTH_USER'});
        localStorage.setItem('token', response.data.token);
      })
      .catch((response) => {
        dispatch(authError(response.data.error));
      });
  }
}

export function authError(error) {
  return {
    type: 'AUTH_ERROR',
    payload: error
  };
}

export function signInUser({username, password}){
  return function(dispatch){
    axios.post(`${LOCAL_URL}/signin`, {username, password})
      .then(response => {
        dispatch({type: 'AUTH_USER', payload: response.data.token });
        localStorage.setItem('token', response.data.token);
      })
      .catch((response) => {
        dispatch(authError(response.data.error));
      });
  }
}

export function signoutUser(){
  localStorage.removeItem('token');
  return {type: 'UNAUTH_USER'};
}
