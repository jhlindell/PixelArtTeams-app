import React, { Component } from "react";

const newStyle = {
  width: '70%',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  margin: 'auto'
};

class About extends Component {
  render(){
    return (
      <div style={newStyle}>
        <p className="aboutText mt-4">
          Pixel Art Teams is a collaborative pixel art maker. It allows users to work together to create art in a simple and fun way.
        </p>
        <p className="aboutText">
          To begin, one must signup to create an account. Usernames are unique, as are email addresses.
        </p>
        <p className="aboutText">
          To start a new project, select New project from the project selector. A project name must be entered. The x and y fields are the canvas size. Be warned that large canvases can cause significant slowdown in performance. 20x20 is the default canvas size.
        </p>
        <p className="aboutText">
          When the grid is displayed, you are ready to draw. On the left is the color palette. The currently selected color is shown in the box. Clicking on this box opens the palette.
        </p>
        <p className="aboutText">
          If you are the originator of a project, several menu options will be available to you.
        </p>
        <p className="aboutText">
          Add new user allows you to give permission to a friend to collaborate on your project with you. You must know either their name or email address to add them.
        </p>
        <p className="aboutText">
          Finish project removes the project from your active projects list and sends it to the gallery. This action can't be undone. Use this when you know that your art is complete.
        </p>
        <p className="aboutText">
          Lastly, delete removes the project permanently.
        </p>
        <p className="aboutText">
          Have fun, and make some beautiful art!
        </p>
      </div>
    )
  }
}

export default About;
