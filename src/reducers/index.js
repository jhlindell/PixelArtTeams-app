import { combineReducers } from 'redux';

function gridReducer(state, action) {
  if (state === undefined) {
    let grid = [];
    for (var i = 0; i < 20; i++) {
      let row = [];
      for (var j = 0; j < 20; j++) {
        row.push('#FFF');
      }
      grid.push(row);
    }
    return grid;
  }

  switch (action.type) {
    case 'PIXEL_CLICK':
      const newGrid = state.map((row, y) => row.map((pixel, x) => {
        if (x === action.payload.x && y === action.payload.y) {
          return action.payload.color;
        }
        return pixel;
      }));
      return newGrid;

    case 'UPDATE_GRID':
      return action.payload;

    default:
      return state;
  }

}

function activeColor(state = '#000', action) {
  switch (action.type) {
    case 'UPDATE_COLOR':
      return action.payload.nextColor;
    default:
      return state;
  }
}

function currentProject(state = 0, action) {
  switch (action.type) {
    case 'SELECT_PROJECT':
      return action.payload.id;
    default:
      return state;
  }
}

function projectsReducer(state = [], action) {
  switch (action.type) {
    case 'FETCH_PROJECTS':
      return action.payload;
    case 'CLEAR_PROJECTS':
      return [];
    default:
      return state;
  }
}

function mouseReducer(state = false, action) {
  switch (action.type) {
    case 'MOUSE_DOWN':
      return action.payload;
    case 'MOUSE_UP':
      return action.payload;
    default:
      return state;
  }
}

function galleryReducer(state = [], action){
  switch(action.type) {
    case 'GET_GALLERY':
      return action.payload;
    default:
      return state;
  }
}

const styleErrorCode = (code) => {
  if(code.message){
    if (code.message.includes('401')){
      return 'bad username or password';
    }
    else {
      return code.message;
    }
  } else {
    return code;
  }
}

function authReducer(state = {}, action){
  switch(action.type) {
    case 'AUTH_USER':
      localStorage.setItem('token', action.payload);
      return { ...state, error: '', authenticated: true, token: action.payload };
    case 'UNAUTH_USER':
      localStorage.removeItem('token');
      return { ...state, authenticated: false };
    case 'AUTH_ERROR':
      const error = styleErrorCode(action.payload)
      return { ...state, error };
    default:
      return state;
  }
}

function userName(state=null, action){
  switch(action.type){
    case "USERNAME":
      return action.payload;
    case "CLEAR_USERNAME":
      return null;
    default:
      return state;
  }
}

function collaborators(state=[], action){
  switch(action.type){
    case "SET_COLLABORATORS":
      return action.payload;
    case "CLEAR_COLLABORATORS":
      return [];
    default:
      return state;
  }
}

function userCheckReducer(state={}, action){
  switch(action.type){
    case "USERNAME_CHECK":
      return action.payload;
    case "CLEAR_USERNAME_CHECK":
      return {};
    default:
      return state;
  }
}

function galleryShowReducer(state=null, action){
  switch(action.type){
    case "GALLERY_SHOW":
      return action.payload;
    default:
      return state;
  }
}

function top3Reducer(state = null, action){
  switch(action.type){
    case "GALLERY_TOP_3":
      return action.payload;
    default:
      return state;
  }
}

function userRatingReducer(state = null, action){
  switch(action.type){
    case "SET_USER_RATING":
      return action.payload;
    default:
      return state;
  }
}

function avgProjectRating(state = null, action){
  switch(action.type){
    case "SET_AVG_PROJECT_RATING":
      return action.payload;
    default:
      return state;
  }
}

const appReducer = combineReducers({
  activeColor,
  gridReducer,
  currentProject,
  projectsReducer,
  mouseReducer,
  galleryReducer,
  auth: authReducer,
  userName,
  collaborators,
  userCheckReducer,
  galleryShowReducer,
  top3Reducer,
  userRatingReducer,
  avgProjectRating
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;
