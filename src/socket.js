import store from './store';
import * as socketActions from './actions/socketActions';
import * as otherActions from './actions/index.js';
const WS = process.env.REACT_APP_WS;
const socket = require('socket.io-client')(WS, {jsonp: false});

socket.on('connect', () => {
  store.dispatch(socketActions.socketConnect());
});

socket.on('returnUserName', (username)=> {
  store.dispatch(otherActions.setUserName(username));
});

socket.on('sendProjectsToClient', (projects)=> {
  store.dispatch(otherActions.sendProjectsToStore(projects));
});

socket.on('gridUpdated', (grid)=> {
  store.dispatch(otherActions.updateGrid(grid));
});

socket.on('sendingGallery', (gallery) => {
  store.dispatch(otherActions.getGallery(gallery));
});

socket.on('changeCurrentProject', (id)=> {
  store.dispatch(socketActions.selectProject(id));
});

socket.on('requestRefresh', () => {
  store.dispatch(socketActions.refresh());
});

socket.on('resultOfUserCheck', (result) => {
  if(result){
    store.dispatch(otherActions.userNameCheck(result, "User Exists"));
  } else {
    store.dispatch(otherActions.userNameCheck(result, "User Doesn't Exist"));
  }
});

socket.on('resultOfAddingPermission', (result) => {
  switch(result){
    case 'success':
      alert('user permission added successfully');
      break;
    case 'user already exists':
      alert('user already exists');
      break;
    case 'error':
      alert('problem adding user permission');
      break;
    default:
      alert('problem adding user permission')
  }
});

socket.on('pixel', (pixel) => {
  store.dispatch(otherActions.pixelClick(pixel.x, pixel.y, pixel.color));
});

export default socket;
