const socketActions = require('./actions/socketActions');
const otherActions = require('./actions/index.js');
const WS = process.env.REACT_APP_WS;
var socket = require('socket.io-client')(WS, {jsonp: false});

socket.on('connect', () => {
  socketActions.socketConnect();
});

socket.on('returnUserName', (username)=> {
  otherActions.setUserName(username);
});

socket.on('sendProjectsToClient', (projects)=> {
  otherActions.sendProjectsToStore(projects);
});

socket.on('gridUpdated', (grid)=> {
  otherActions.updateGrid(grid);
});

socket.on('sendingGallery', (gallery) => {
  otherActions.getGallery(gallery);
});

socket.on('changeCurrentProject', (id)=> {
  socketActions.selectProject(id);
});

socket.on('requestRefresh', () => {
  socketActions.refresh();
});

socket.on('resultOfUserCheck', (result) => {
  if(result){
    otherActions.userNameCheck(result, "User Exists");
  } else {
    otherActions.userNameCheck(result, "User Doesn't Exist");
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
  otherActions.pixelClick(pixel.x, pixel.y, pixel.color);
});

module.exports = socket;
