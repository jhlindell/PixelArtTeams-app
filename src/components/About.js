import React, { Component } from "react";

const newStyle = {
  width: '70%',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  margin: 'auto',
};

class About extends Component {
  render(){
    return (
      <div className="card" style={newStyle}>
        <p className="aboutText mt-4">
          Getting started is easy!
        </p>
        <p className="aboutText">
          1. Click on the “Make Art” link.
        </p>
        <p className="aboutText">
          2. If you are a new user, you’ll need to register and create an account. Usernames and email addresses are unique. If you are a returning user, you’ll need to login.
        </p>
        <p className="aboutText">
          3. Select the Canvas properties for your new project. Include a Project name. Enter the x and y dimensions of your canvas. If you want to invite other users to join in the fun, you may do so. When ready, click on the “Done” link.
        </p>
        <p className="aboutText">
          4. Click on any pixel to paint it with the selected color. Click on any color in the color palette to change your selected color. Note: You can click and drag to color several pixels in one stroke.
        </p>
        <p className="aboutText">
          5. When you are happy with your work, click on the “Finish” link. This happens automatically when the timer runs out. If you are a member of a group project, only the project moderator can choose to finish the project before the timer runs out.
        </p>
        <p className="aboutText">
          That’s it. Have fun, and make beautiful art!
        </p>
        <p className="aboutText">
          When you’re not making art, you can explore the Gallery or visit our Store. Enjoy!
        </p>

      </div>
    )
  }
}

















export default About;
