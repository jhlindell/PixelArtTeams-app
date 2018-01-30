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
          <div className="modal-header">
            <h4 className="modal-title"> Finish Project </h4>
          </div>
          <div className="modal-body">
            <div>
              <DrawCanvas />
            </div>
          </div>
        </Modal>
      </div>
    )
  }

}

export default FinishModal;
