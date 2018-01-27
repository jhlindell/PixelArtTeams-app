import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import DrawCanvas from './DrawCanvas';

class FinishModal extends Component {
  constructor(props) {
    super(props);
    this.renderButton = this.renderButton.bind(this);
    this.toggleAbout = this.toggleAbout.bind(this);
    this.state = {
      finishToggle: false,
    };
  }

  toggleFinishModal(){
    this.setState({finishToggle: !this.state.finishToggle})
  }

  renderButton(){
    return (
      <button
        className="newProjectSelector"
        onClick={ () => this.toggleFinishModal() }>
        Draw Modal
      </button>
    )
  }

  render(){
    return (
      <div>
        { this.renderButton() }
        <Modal
          isOpen={ this.state.finishToggle }
          toggle={ () => this.toggleFinishModal() }
        >
          <ModalHeader toggle={ ()=> this.toggleFinishModal() }>
            Finish Modal
          </ModalHeader>
          <ModalBody>
            <div>
              <DrawCanvas />
            </div>
          </ModalBody>
        </Modal>
      </div>
    )
  }

}

export default FinishModal;
