import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';

class About extends Component {
  constructor(props) {
    super(props);
    // this.renderButton = this.renderButton.bind(this);
    this.toggleAbout = this.toggleAbout.bind(this);
    this.state = {
      aboutToggle: false,
    };
  }

  toggleAbout(){
    this.setState({aboutToggle: !this.state.aboutToggle})
  }

  // renderButton(){
  //   return (
  //
  //   )
  // }

  render(){
    return (
      <div>
        <button
          className="newProjectSelector btn btn-primary"
          type="button"
          data-toggle="modal"
          data-target="#aboutModal">
          About
        </button>
        <div className="modal fade" id="aboutModal" tabIndex="-1" role="dialog"
          aria-labelledby="aboutModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="aboutModalLabel">About Pixel Art Teams</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>

              </div>
              <div className="modal-body">
                <div>
                  <p className="aboutText">
                    Pixel Art Teams is a collaborative pixel art maker. It allows users to work together to create art in a simple and fun way.
                  </p>
                  <p className="aboutText">
                    To begin, one must signup to create an account. Usernames are unique, as are email addresses.
                  </p>
                  <p className="aboutText">
                    To start a new project, select New project from the menu. A project name must be entered. The x and y fields are the canvas size. Be warned that large canvases can cause significant slowdown in performance. 20x20 is the default canvas size.
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
                    Save project tells the app to save the current project to the database. It is a good idea to do this at the end of each session. If the server has to restart, you will lose anything that has not been saved.
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
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default About;
