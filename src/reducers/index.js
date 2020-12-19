import {combineReducers} from 'redux'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
import errorReducer from './errorReducer'
import chatReducer from './chatReducer'

export default combineReducers({
    auth: authReducer,
    errors : errorReducer,
    profile : profileReducer,
    chats : chatReducer
})