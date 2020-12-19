import {GET_CHATS, SEND_MESSAGE} from './types'
import axios from 'axios'
const header = {'Authorization' :"Bearer " +localStorage.getItem('jwtToken') }

export const getMessages=(data)=>dispatch=>{
    axios.get(`http://localhost:5000/chat/${data}`,{headers: header}).then(res=>{
        dispatch({
            type : GET_CHATS,
            payload: res.data
        })
        
    }).catch(e=>console.log(e))
}

export const sendMessage =(data)=>dispatch=>{
    axios.post('http://localhost:5000/chat',data,{headers :header}).then(res=>{
        dispatch(
            getMessages(data.chatName)
        )
        dispatch({
            type :SEND_MESSAGE
        })
    })
}