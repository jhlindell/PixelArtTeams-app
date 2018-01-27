const WS = process.env.REACT_APP_WS;

module.exports  = require('socket.io-client')(WS, {jsonp: false});
