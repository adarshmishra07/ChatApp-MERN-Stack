import React, { Component } from 'react'
import ChatHeader from './ChatHeader'
import MessageBody from './MessageBody'
import Messageinput from './Messageinput'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getMessages} from '../../actions/profileAction'
import {sendMessage} from '../../actions/profileAction'

class Chat extends Component {
    
    componentWillReceiveProps(nextprops){
        this.props = {nextprops}
    }

    render(){
        const {user} = this.props.auth  
        const {chats,loading} = this.props.chats
        const  chatName = this.props.match.params.chatName
        this.props.getMessages(chatName) 
        let chatBody ;
        if(loading){
            chatBody =  'loading'
        }else{
            chatBody = <>
                <ChatHeader contactInfo={chats.contact} loading={loading}/>
            <MessageBody chats={chats.messages} loading={loading} user={user.id} get={this.props.getMessages} chatName={chatName} />
            <Messageinput chatName={chatName} send={this.props.sendMessage} get={this.props.getMessages}/>
            </>
        }

    return (
        <div id="msgpage">
            {chatBody}
        </div>
    )
    }
}

Chat.propTypes = {
  getMessages: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  chats : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  chats: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps,{getMessages,sendMessage})(Chat)
