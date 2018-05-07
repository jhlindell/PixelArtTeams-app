import { combineReducers } from 'redux';

function gridReducer(state, action) {
  if (state === undefined) {
    const grid = [];
    for (let i = 0; i < 20; i++) {
      const row = [];
      for (let j = 0; j < 20; j++) {
        row.push('#FFF');
      }
      grid.push(row);
    }
    return grid;
  }

  switch (action.type) {
    case 'PIXEL_CLICK':
      const newGrid = state.map((row, y) => 
        row.map((pixel, x) => {
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
  if(code.message) {
    return (code.message.includes('401')) ? 'bad username or password': code.message 
  } else {
    return code
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
      let error = styleErrorCode(action.payload)
      return { ...state, error };
    case 'CLEAR_AUTH_ERROR':
      error = '';
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

function flagCheckReducer(state = false, action){
  switch(action.type){
    case 'SET_FLAG_CHECK':
      return action.payload;
    case 'CLEAR_FLAG_CHECK':
      return false;
    default:
      return state;
  }
}

function verificationMessageReducer(state = null, action){
  switch(action.type){
    case 'SET_VERIFICATION_MESSAGE':
      return action.payload;
    case "CLEAR_VERIFICATION_MESSAGE":
      return null;
    default:
      return state;
  }
}

function messageReducer(state = [], action){
  switch(action.type){
    case 'ADD_MESSAGE':
      const message = action.payload;
      return [ ...state, message ];

    case 'CLEAR_MESSAGE':
      let stateArray = state;
      let filteredArray = stateArray.filter(message => {
        if(message.id && message.id !== action.payload){
          return message;
        }
        return null;
      });
      return filteredArray;

    default:
      return state;
  }
}

function chatReducer(state = [], action){
  switch(action.type){
    case 'ADD_CHAT_MESSAGE':
      const message = action.payload;
      return [...state, message];

    case 'CLEAR_CHAT_MESSAGES':
      return [];

    default:
      return state;
  }
}

function stripeMessageReducer(state=null, action){
  switch(action.type){
    case 'SET_STRIPE_MESSAGE':
      return action.payload;

    case 'CLEAR_STRIPE_MESSAGE':
      return null;

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
  avgProjectRating,
  flagCheckReducer,
  verificationMessageReducer,
  messageReducer,
  chatReducer,
  stripeMessageReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;
