import axios from 'axios'
import {GET_PROFILE,PROFILE_LOADING, CLEAR_CURRENT_PROFILE, ADD_CONTACT,GET_CHATS} from './types'

//get current user

const header = {'Authorization' :"Bearer " +localStorage.getItem('jwtToken') }

export const getCurrentProfile= ()=>dispatch=>{
    dispatch(setProfileLoading())
     axios.get('http://localhost:5000/profile',{headers : header}).then(res=>{
        dispatch({
            type:GET_PROFILE,
            payload : res.data
        })
    }).catch(err=>{
        dispatch({
            type: GET_PROFILE,
            payload: {}
        })
    })
}

export const addContact=(con)=>dispatch=>{
    axios.post('http://localhost:5000/addcontact',con,{headers : header}).then(res=>{
        dispatch({
            type: ADD_CONTACT,
            payload : res.data
        })
    }).catch(e=>console.log(e))
}

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
        dispatch({
            type: GET_CHATS,
            payload : res.data
        })
    })
}

export const setProfileLoading=()=>{
    return{
        type: PROFILE_LOADING
    }
}

export const clearProfile=()=>{
    return{
        type: CLEAR_CURRENT_PROFILE
    }
}