import axios from 'axios';
import store from '../store';
const URL = process.env.REACT_APP_API_URL;

export function changePaletteShowState() {
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

export function getCollaborators(id){
  return function(dispatch){
    axios.get(`${URL}/api/users/collaborators/${id}`)
      .then(response => {
        dispatch({ type: 'SET_COLLABORATORS', payload: response.data });
      })
      .catch(response => {
        console.log("error getting collaborators");
      })
  }
}

export function pixelClick(x, y, color) {
  store.dispatch({type: 'PIXEL_CLICK', payload: { x, y, color }});
}

export function updateGrid(grid){
  store.dispatch({ type: 'UPDATE_GRID', payload: grid });
}

export function sendProjectsToStore(projects){
  store.dispatch({type: 'FETCH_PROJECTS', payload: projects});
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
  store.dispatch({type: 'GET_GALLERY', payload: art});
}

export function signUpUser({username, email, password}){
  return function(dispatch){
    axios.post(`${URL}/signup`, {username, email, password})
      .then(response => {
        if(response.data.token){
          dispatch({type: 'AUTH_USER', payload: response.data.token });
        } else {
          dispatch(authError(response.data.error));
        }
      })
      .catch((response) => {
        dispatch(authError(response));
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
    axios.post(`${URL}/signin`, {username, password})
      .then(response => {
        dispatch({type: 'AUTH_USER', payload: response.data.token });
      })
      .catch((response) => {
        dispatch(authError(response));
      });
  }
}

export function signoutUser(){
  return function(dispatch){
    // dispatch({type: 'CLEAR_PROJECTS'});
    // dispatch({type: 'CLEAR_USERNAME'});
    // dispatch({type: 'CLEAR_COLLABORATORS'});
    // dispatch({type: 'UNAUTH_USER'});
    dispatch({type: 'USER_LOGOUT'});
  }
}

export function setUserName(username){
  store.dispatch({type: 'USERNAME', payload: username})
}

export function userNameCheck(result, message){
  store.dispatch({type: 'USERNAME_CHECK', payload: {result: result, message: message}});
}

export function clearUserNameCheck(){
  return {type: 'CLEAR_USERNAME_CHECK'};
}

export function connectSocket(){

}
