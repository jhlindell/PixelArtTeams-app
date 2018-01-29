const socketActions = require('./actions/socketActions');
const otherActions = require('./actions/index.js');

const WS = process.env.REACT_APP_WS;
var socket = require('socket.io-client')(WS, {jsonp: false});

socket.on("foo", ()=> {
  console.log(socketActions);
})

socket.on('connect', () => {
  socketActions.socketConnect();
});

socket.on('returnUserName', (username)=> {
  console.log("calling returnUserName", username);
  otherActions.setUserName(username);
});

module.exports = socket;
