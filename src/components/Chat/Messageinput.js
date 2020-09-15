import React, { useState } from "react";

function Messageinput({ chatName, send ,get}) {
  const [message, setMessage] = useState();
  const sendMessage = (e) => {
    e.preventDefault()
    if (chatName || message!== '') {
      let data = {
        message,
        chatName,
      };
      send(data)
      get(chatName)
    }
    setMessage('')
  };

  return (
    <div className="Messageinput type">
      <form>
        <input
          type="text"
          name="message"
          id="message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder={`Message`}
          autoFocus
        />
        <button type="submit" onClick={sendMessage}>
          SEND
        </button>
      </form>
    </div>
  );
}

export default Messageinput;
