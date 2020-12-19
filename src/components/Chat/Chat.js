import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageBody from "./MessageBody";
import Messageinput from "./Messageinput";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMessages } from "../../actions/chatAction";
import { sendMessage } from "../../actions/chatAction";
import { useEffect } from "react";

function Chat(props) {
  const [chatName, setchatName] = useState('')

  useEffect(() => {
    setchatName(props.match.params.chatName)
    props.getMessages(chatName);
  }, []);

  setInterval(props.getMessages(chatName, 100));

  const { messages, contact } = props.chats.chats;
  const { user } = props.auth;
  let chatBody;
  if (messages && contact) {
    chatBody = (
      <>
        <ChatHeader contact={contact} />
        <MessageBody messages={messages} user={user} />
        <Messageinput send={props.sendMessage} chatName={chatName} />
      </>
    );
  } else {
    chatBody = "Loading ...";
  }

  return <div id="msgpage">{chatBody}</div>;
}

Chat.propTypes = {
  getMessages: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  chats: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  chats: state.chats,
  auth: state.auth,
});

export default connect(mapStateToProps, { getMessages, sendMessage })(Chat);
