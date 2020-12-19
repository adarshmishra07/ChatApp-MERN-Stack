import React from 'react'
import {Link} from 'react-router-dom'
import face from "../../images/user/face.jpeg";
import arrow from "../../images/arrow-left.svg";


const ChatHeader= ({contact})=> {

    if(contact){
    return(        
        <div className="ChatHeader row">
            <div className="left">
                <Link className="back" to='/'><img src={arrow} alt=""/></Link>
                <Link to="">
                    <div className="imageblock"><img src={face} alt=""/></div>
                </Link>
                <div className="nameblock">
                    <div className="name">{contact.cname}</div>
                </div>
            </div>
            <div className="right">
                <div className="dots">...</div>
            </div>
        </div>
    )
    }
    else{
        return <></>
    }
}

export default ChatHeader
