import React, { Component } from "react";
import ScrollableFeed from 'react-scrollable-feed'
import Moment from 'react-moment';

class MessageBody extends Component {
  state={
    count : 0
  }
 
  componentDidUpdate() {
    this.props.get(this.props.chatName)
    if(this.state.count===0){
    this.scroll()
    this.setState({count:1})
    }
  }
  
   scroll=()=>{
    this.messagesEnd.scrollIntoView();
   }
  render() {
    const {chats , user} = this.props
    let chatBody;
    if (chats) {      
      chatBody = Object.values(chats).map((chat) => {
        if (chat.sender === user) {
          return (
            <div className="receiver" key={chat.date}>
              {chat.message}
              <div className="timehai"><Moment format='HH:mm A'>{chat.date}</Moment></div>
            </div>
          );
        } else {
          return (
            <div className="sender" key={chat.date}>
              {chat.message}
          <div className="timehai"><Moment format='hh:mm a'>{chat.date}</Moment></div>
            </div>
          );
        }
      });
      
    }
  return <div id="message-window"><ScrollableFeed>{chatBody}<div style={{ float:"left", clear: "both" }}
  ref={(el) => { this.messagesEnd = el; }}>
</div></ScrollableFeed></div>;
    }
  
}

export default MessageBody;
