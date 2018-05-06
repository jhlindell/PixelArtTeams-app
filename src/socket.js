import store from './store';
import * as socketActions from './actions/socketActions';
import * as otherActions from './actions/index.js';
const WS = process.env.REACT_APP_WS;
const socket = require('socket.io-client')(WS, {jsonp: false});

socket.on('returnUserName', (userinfo)=> {
  store.dispatch(otherActions.setUserName(userinfo));
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
  (result)?
    store.dispatch(otherActions.userNameCheck(result.bool, "User Exists", result.username)):
    store.dispatch(otherActions.userNameCheck(result, "User Doesn't Exist"));
});

socket.on('resultOfAddingPermission', (result) => {
  switch(result){
    case 'success':
      const { currentProject} = store.getState();
      otherActions.addMessageToContainer('Successfully Added User');
      store.dispatch(otherActions.getCollaborators(currentProject));
      break;
    case 'user already exists':
      otherActions.addMessageToContainer('user already exists');
      break;
    case 'error':
      otherActions.addMessageToContainer('problem adding user permission');
      break;
    default:
      otherActions.addMessageToContainer('problem adding user permission')
  }
});

socket.on('userPermissionRemoved', ()=> {
  const {currentProject} = store.getState();
  store.dispatch(otherActions.getCollaborators(currentProject));
})

socket.on('pixel', (pixel) => {
  store.dispatch(otherActions.pixelClick(pixel.x, pixel.y, pixel.color));
});

socket.on('returnSingleProject', (project) => {
  store.dispatch(otherActions.galleryShow(project));
});

socket.on('galleryTop3', (top3) => {
  store.dispatch(otherActions.galleryTop3(top3));
});

socket.on('returnUserRatingForProject', (obj) => {
  store.dispatch(otherActions.setUserRatingForProject(obj.project_id, obj.rating));
});

socket.on('returnAvgRating', (obj) => {
  store.dispatch(otherActions.setAvgProjectRating(obj.project_id, obj.rating));
});

socket.on('projectClosedOut', (id) => {
  const {currentProject} = store.getState();
  if(id === currentProject){
    store.dispatch(otherActions.addMessageToContainer('That Project Was Closed Out'))
    store.dispatch(otherActions.selectProject(0));
  }
});

socket.on('flagCheckResult', (bool) => {
  store.dispatch(otherActions.setFlagCheck(bool));
});

socket.on('hashCheckResult', message => {
  store.dispatch(otherActions.setVerificationMessage(message));
});

socket.on('addMessageToContainer', message => {
  store.dispatch(otherActions.addMessageToContainer(message));
});

socket.on('chatMessage', (obj) => {
  store.dispatch(otherActions.addChatMessage(obj.username, obj.message));
});

export default socket;
