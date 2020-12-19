import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { useEffect } from "react";

function MessageBody({messages,user}) {
  useEffect(() => {
  }, [messages])

  let chatBody;
  if (messages) {
    chatBody = Object.values(messages).map((chat) => {
      if (chat.sender === user.id) {
        return (
          <div className="receiver" key={chat.date}>
            {chat.message}
            <div className="timehai">
             {chat.date}
            </div>
          </div>
        );
      } else {
        return (
          <div className="sender" key={chat.date}>
            {chat.message}
            <div className="timehai">
             {chat.date}
            </div>
          </div>
        );
      }
    });
  }
  return (
    <div id="message-window">
      <ScrollableFeed >
        {chatBody}
      </ScrollableFeed>
    </div>
  );
}
export default MessageBody;
