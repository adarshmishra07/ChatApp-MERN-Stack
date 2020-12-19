import  {GET_CHATS,SEND_MESSAGE} from '../actions/types'

const initialState ={
    chats  : {}
}

export default function(state=initialState,action){
    switch(action.type){
        case GET_CHATS: 
            return {
                ...state ,  
                chats : action.payload
            }
        case SEND_MESSAGE:
            return{
                ...state
            }
        default:
            return state;
    }
}