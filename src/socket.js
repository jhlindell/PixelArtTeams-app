import store from './store';
import * as socketActions from './actions/socketActions';
import * as otherActions from './actions/index.js';
const WS = process.env.REACT_APP_WS;
const socket = require('socket.io-client')(WS, {jsonp: false});

socket.on('returnUserName', (userinfo)=> {
  store.dispatch(otherActions.setUserName(userinfo));
});

socket.on('sendProjectsToClient', (projects)=> {
  // console.log("socket actions SPTC projects: ", projects);
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
    store.dispatch(otherActions.userNameCheck(result.bool, "User Exists", result.username));
  } else {
    store.dispatch(otherActions.userNameCheck(result, "User Doesn't Exist"));
  }
});

socket.on('resultOfAddingPermission', (result) => {
  switch(result){
    case 'success':
      const { currentProject} = store.getState();
      store.dispatch(otherActions.getCollaborators(currentProject));
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
})

socket.on('projectClosedOut', (projectid) => {
  store.dispatch(otherActions.selectProject(0));
})

export default socket;
