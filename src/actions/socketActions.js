var socket = require('../socket');

export function hello(){
  return (dispatch, getState) => {
    const { auth } = getState();
    socket.emit('hello!', auth);
  }
}

export function socketConnect(){
  return (dispatch, getState) => {
    const { currentProject } = getState();
    socket.emit('joinRoom', currentProject);
    socket.emit('grid', currentProject);
  }
}
