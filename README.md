# L7 Software presents: Pixel Art Teams!

## What is this application?
Pixel Art Teams is a full stack application that allows users to create art together.

## What problem does Pixel Art Teams solve?
Building a single user pixel art maker is a trivial problem. Building a pixel art maker that multiple players can collaboratively build art together in real-time from separate computers is a rather complex problem.

## What technologies does Pixel Art Teams use?
P.A.T. is split into two projects, the app and the server. The server project can be found at: https://github.com/jhlindell/PixelArtTeams-server.

The app uses React for a front-end framework, with Redux and Thunk for state management. For layout and styling, Bootstrap, flexbox, and CSS are used.

On the server side, Node.js and Express.js are used for the server. The database and access layer is provided by PostgreSQL and KNEX.js.

Socket.io is used as a communication layer between the app and the server. This communication layer provides the ability to drive real-time updates of projects and messages.

## Deployed Full-Stack application link (Heroku)
<https://pixelart-app.herokuapp.com>
