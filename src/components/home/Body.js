import React, { useState } from "react";
import Chats from './bodySplit/Chats'
import Contacts from './bodySplit/Contacts'
import chatImage from '../../images/message-square.svg'
import contactImage from '../../images/user.svg'

function Body({profile , loading}) {
  const [chat, setChat] = useState(true)
  const [contact, setContact] = useState(false)

  const showChat = () => {
    setChat(true)
    setContact(false)
  };

  const showContact = () => {
    setChat(false)
    setContact(true)
  };
 
  let bodyContent;
  if(profile){
    bodyContent = <div className="container">
    <div className="options">
      <div className={chat ? 'chats active' : 'chats'} onClick={showChat}>
        <div className="title">
          <img src={chatImage} alt="" />
          Chats
        </div>
      </div>
      <div className={contact ? 'contacts active' : 'contacts'} onClick={showContact}>
        <div className="title">
          <img src={contactImage} alt="" />
          Contacts
        </div>
      </div>
    </div>
    {chat && <Chats profile={profile} loading = {loading} />}
    {contact && <Contacts profile={profile} loading = {loading}/> }        
  </div>
  }else{
    bodyContent = 'loading'
  }
  return (
    <div className="body">
      {bodyContent}
    </div>
  );
}

export default Body;
