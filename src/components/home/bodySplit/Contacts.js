import React from 'react'
import {useHistory} from "react-router-dom"
import face from "../../../images/user/face.jpeg";

function Contacts({profile , loading}) {
  const history = useHistory();
  
  const setChat=(id)=>{
    history.push(`/chat/${id}`)
  }      
  let single
  if(profile === null || loading){
    single = <>Loading</>
  }else{
  single = Object.values(profile).map(contact=>{    
      return <div className="row friend" key={contact.chatName} onClick={()=>setChat(contact.chatName)}>
      <div className="imageblock">
        <img src={face} alt="" />
      </div>
      <div className="nameblock">
        <div className="name">{contact.cname}</div>
      </div>
    </div>
    })
  }
    return (
          <div id="contacts">
              {single}
          </div>
    )
}

export default Contacts
