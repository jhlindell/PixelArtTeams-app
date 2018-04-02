import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submitChatMessage } from '../actions/socketActions';
import { clearChat } from '../actions/index';

class ChatContainer extends Component {
  constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      chatMessage: ''
    }
  }

  componentWillUnmount(){
    this.props.clearChat();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleFormSubmit(event){
    event.preventDefault();
    this.props.submitChatMessage(this.props.user.username, this.state.chatMessage);
    this.setState({chatMessage: ''});
  }

  render(){
    const cardStyle = {};
    cardStyle.display = 'flex';
    cardStyle.justifyContent = 'center';
    cardStyle.width= '400px';
    cardStyle.height = '560px';
    cardStyle.textAlign = 'center';

    return (
      <div className="card ml-4" style={cardStyle}>
        <div className="card-header">
          <h3>Project Chat</h3>
        </div>
        <div className="card-block">
          <ul className="list-group list-group-flush">
            {this.props.chatMessages.map(message => {
              return <li className="list-group-item" key={message.username+message.message}>{message.username}: {message.message}</li>
            })}
          </ul>
        </div>
        <div className="card-footer">
          <form onSubmit={this.handleFormSubmit}>
            <input name="chatMessage" type="text" onChange={(e) => {this.handleInputChange(e)}} value={this.state.chatMessage} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return { user: state.userName, chatMessages: state.chatReducer };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ submitChatMessage, clearChat }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
